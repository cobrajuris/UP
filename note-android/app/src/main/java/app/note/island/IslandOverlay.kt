package app.note.island

import android.annotation.SuppressLint
import android.content.Intent
import android.content.res.Configuration
import android.graphics.Color
import android.graphics.PixelFormat
import android.graphics.Rect
import android.media.AudioManager
import android.net.Uri
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.os.StatFs
import android.os.Environment
import android.os.VibrationEffect
import android.os.Vibrator
import android.util.DisplayMetrics
import android.view.Display
import android.view.DisplayCutout
import android.view.Gravity
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import org.json.JSONArray
import org.json.JSONObject
import kotlin.math.abs
import kotlin.math.ceil
import kotlin.math.max
import kotlin.math.roundToInt

/**
 * Janela flutuante da ilha.
 *
 * A página (assets/note/overlay.html) tem a largura da tela e fica centralizada na janela.
 * A janela é recortada em volta da ilha e centralizada no furo da câmera, então só a área
 * da ilha recebe toques; o resto da tela continua funcionando normalmente.
 */
class IslandOverlay(private val service: IslandService) {

    private val wm = service.getSystemService(WindowManager::class.java)
    private val main = Handler(Looper.getMainLooper())
    private val density get() = service.resources.displayMetrics.density

    private lateinit var root: FrameLayout
    private lateinit var web: WebView
    private val lp = WindowManager.LayoutParams()
    private var attached = false
    private var ready = false
    private val pending = mutableListOf<String>()

    /** Centro da ilha na tela, em px. */
    private var centerX = 0f
    private var islandTopDp = 6f
    private var screenW = 0
    private var hidden = false

    private val shortcuts by lazy { Shortcuts(service) }

    private val speech by lazy {
        Speech(service,
            emitText = { text, final -> js("NoteBridge.speech(${JSONObject.quote(text)},$final,'')") },
            emitError = { msg -> js("NoteBridge.speech('',true,${JSONObject.quote(msg)})") },
            emitLevel = { v -> js("NoteBridge.level($v)") })
    }

    @SuppressLint("SetJavaScriptEnabled", "ClickableViewAccessibility")
    fun show() {
        root = object : FrameLayout(service) {
            override fun dispatchTouchEvent(ev: MotionEvent): Boolean {
                if (ev.actionMasked == MotionEvent.ACTION_OUTSIDE) {
                    js("NoteBridge.outside()")
                    return true
                }
                return super.dispatchTouchEvent(ev)
            }
        }
        root.clipChildren = true

        web = WebView(service).apply {
            setBackgroundColor(Color.TRANSPARENT)
            setLayerType(View.LAYER_TYPE_HARDWARE, null)
            isVerticalScrollBarEnabled = false
            isHorizontalScrollBarEnabled = false
            overScrollMode = View.OVER_SCROLL_NEVER
            settings.javaScriptEnabled = true
            settings.allowFileAccess = false
            settings.allowContentAccess = false
            settings.mediaPlaybackRequiresUserGesture = true
            addJavascriptInterface(Bridge(), "NoteAndroid")
            webViewClient = object : WebViewClient() {
                // A ilha nunca navega para fora dos arquivos do app.
                override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest) = true
            }
        }

        measureScreen()
        root.addView(web, FrameLayout.LayoutParams(screenW, dp(PAGE_HEIGHT_DP), Gravity.TOP or Gravity.START))

        lp.type = WindowManager.LayoutParams.TYPE_ACCESSIBILITY_OVERLAY
        lp.format = PixelFormat.TRANSLUCENT
        lp.flags = WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
            WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
            WindowManager.LayoutParams.FLAG_WATCH_OUTSIDE_TOUCH or
            WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
            WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS or
            WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED
        lp.gravity = Gravity.TOP or Gravity.START
        lp.layoutInDisplayCutoutMode = if (Build.VERSION.SDK_INT >= 30)
            WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS
        else WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
        lp.softInputMode = WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING
        lp.title = "Note"
        applyBounds(30f, 60f, false)

        wm.addView(root, lp)
        attached = true
        web.loadUrl("file:///android_asset/note/overlay.html")
    }

    fun hide() {
        speech.destroy()
        shortcuts.release()
        if (attached) {
            try {
                wm.removeView(root)
            } catch (_: IllegalArgumentException) {
            }
            attached = false
        }
        web.destroy()
    }

    fun onConfigurationChanged(c: Configuration) {
        val landscape = c.orientation == Configuration.ORIENTATION_LANDSCAPE
        hidden = landscape
        root.visibility = if (landscape) View.GONE else View.VISIBLE
        if (landscape) return
        measureScreen()
        web.layoutParams = (web.layoutParams as FrameLayout.LayoutParams).apply { width = screenW }
        sendInit()
    }

    /** Executa JavaScript na ilha (guarda na fila até a página avisar que carregou). */
    fun js(call: String) {
        main.post {
            if (!attached) return@post
            if (!ready) pending += call else web.evaluateJavascript(call, null)
        }
    }

    // ------------------------------------------------------------------ geometria

    private fun measureScreen() {
        val bounds: Rect = if (Build.VERSION.SDK_INT >= 30) wm.currentWindowMetrics.bounds
        else DisplayMetrics().let {
            @Suppress("DEPRECATION")
            wm.defaultDisplay.getRealMetrics(it)
            Rect(0, 0, it.widthPixels, it.heightPixels)
        }
        screenW = bounds.width()
        centerX = screenW / 2f

        val hole = topCutout()
        // Uma câmera no meio (até 20% para os lados) recebe a ilha em volta.
        // Câmera no canto: a ilha fica no centro, como na HyperOS.
        if (hole != null && abs(hole.exactCenterX() - screenW / 2f) < screenW * 0.2f) {
            centerX = hole.exactCenterX()
            islandTopDp = max(2f, hole.exactCenterY() / density - ISLAND_HALF_DP)
        } else {
            val sb = statusBarHeight()
            islandTopDp = max(2f, sb / 2f / density - ISLAND_HALF_DP)
        }
    }

    private fun topCutout(): Rect? {
        val cutout: DisplayCutout? = when {
            Build.VERSION.SDK_INT >= 30 -> wm.currentWindowMetrics.windowInsets.displayCutout
            Build.VERSION.SDK_INT >= 29 -> {
                @Suppress("DEPRECATION")
                val d: Display = wm.defaultDisplay
                d.cutout
            }
            else -> null
        }
        return cutout?.boundingRects
            ?.filter { it.top <= dp(8) && it.width() < screenW / 3 }
            ?.minByOrNull { abs(it.exactCenterX() - screenW / 2f) }
    }

    @SuppressLint("InternalInsetResource", "DiscouragedApi")
    private fun statusBarHeight(): Int {
        val id = service.resources.getIdentifier("status_bar_height", "dimen", "android")
        return if (id > 0) service.resources.getDimensionPixelSize(id) else dp(28)
    }

    /**
     * Recorta a janela em volta da ilha. half e bottom chegam em px de CSS (= dp).
     *
     * Parada e fina (full = false): janela do tamanho exato da ilha.
     * Animando ou aberta (full = true): largura da tela inteira, que não muda durante a
     * animação. Nos dois casos a página fica no mesmo pixel da tela, então a troca não treme.
     */
    private fun applyBounds(halfDp: Float, bottomDp: Float, full: Boolean) {
        val cx = centerX.roundToInt()
        val pageLeft = cx - screenW / 2f // onde a borda esquerda da página cai na tela
        if (full) {
            lp.x = 0
            lp.width = screenW
        } else {
            val half = ceil(halfDp * density).toInt()
            lp.x = cx - half
            lp.width = half * 2
        }
        lp.height = ceil(bottomDp * density).toInt()
        lp.y = 0
        web.translationX = pageLeft - lp.x
        if (attached && !hidden) wm.updateViewLayout(root, lp)
    }

    private fun sendInit() {
        val widthDp = screenW / density
        js("NoteBridge.init($widthDp,$islandTopDp,${service.batteryLevel})")
    }

    private fun dp(v: Int) = (v * density).roundToInt()

    // ------------------------------------------------------------------ ponte JS -> Android

    @Suppress("unused")
    inner class Bridge {
        @JavascriptInterface
        fun ready() = main.post {
            ready = true
            sendInit()
            val queued = pending.toList()
            pending.clear()
            queued.forEach { web.evaluateJavascript(it, null) }
            service.replay()
            Thread { shortcuts.apps() }.start() // prepara os ícones antes do primeiro toque
        }

        @JavascriptInterface
        fun setBounds(half: Double, bottom: Double, full: Boolean) = main.post { applyBounds(half.toFloat(), bottom.toFloat(), full) }

        @JavascriptInterface
        fun setKeyboard(on: Boolean) = main.post {
            val f = WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE
            val want = if (on) lp.flags and f.inv() else lp.flags or f
            if (want == lp.flags) return@post
            lp.flags = want
            if (attached) wm.updateViewLayout(root, lp)
            if (on) web.requestFocus()
        }

        @JavascriptInterface
        fun haptic(pattern: String) {
            val arr = try { JSONArray(pattern) } catch (_: Exception) { JSONArray("[8]") }
            val ms = LongArray(arr.length()) { arr.optLong(it, 8L) }
            val vib = service.getSystemService(Vibrator::class.java) ?: return
            if (!vib.hasVibrator()) return
            if (ms.size == 1) vib.vibrate(VibrationEffect.createOneShot(ms[0].coerceIn(1, 400), VibrationEffect.DEFAULT_AMPLITUDE))
            else vib.vibrate(VibrationEffect.createWaveform(longArrayOf(0) + ms, -1))
        }

        @JavascriptInterface
        fun media(action: String) = main.post { MediaWatcher.command(action) }

        @JavascriptInterface
        fun listen() = main.post { speech.start() }

        @JavascriptInterface
        fun stopListening() = main.post { speech.stop() }

        @JavascriptInterface
        fun open(key: String) = main.post { NotesListener.open(key) }

        @JavascriptInterface
        fun action(key: String, index: Int) = main.post { NotesListener.action(key, index) }

        @JavascriptInterface
        fun setSilent(on: Boolean) = main.post {
            val am = service.getSystemService(AudioManager::class.java)
            try {
                am.ringerMode = if (on) AudioManager.RINGER_MODE_SILENT else AudioManager.RINGER_MODE_NORMAL
            } catch (_: SecurityException) {
                // Sem acesso ao Não perturbe: vibrar é o mais perto de silencioso.
                am.ringerMode = if (on) AudioManager.RINGER_MODE_VIBRATE else AudioManager.RINGER_MODE_NORMAL
            }
        }

        @JavascriptInterface
        fun dial() = main.post {
            val i = Intent(Intent.ACTION_DIAL, Uri.parse("tel:")).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            try {
                service.startActivity(i)
            } catch (_: Exception) {
            }
        }

        @JavascriptInterface
        fun torch(): Boolean = shortcuts.toggleTorch()

        @JavascriptInterface
        fun system(what: String) = main.post { shortcuts.system(what) }

        @JavascriptInterface
        fun apps(): String = shortcuts.apps()

        @JavascriptInterface
        fun launch(pkg: String) = main.post { shortcuts.launch(pkg) }

        @JavascriptInterface
        fun stats(): String {
            val am = service.getSystemService(AudioManager::class.java)
            val vol = am.getStreamVolume(AudioManager.STREAM_MUSIC) * 100 / max(1, am.getStreamMaxVolume(AudioManager.STREAM_MUSIC))
            val fs = StatFs(Environment.getDataDirectory().path)
            val used = 100 - (fs.availableBytes * 100 / max(1L, fs.totalBytes)).toInt()
            return JSONObject()
                .put("battery", service.batteryLevel)
                .put("storage", used)
                .put("volume", vol)
                .put("notices", NotesListener.count())
                .toString()
        }
    }

    private companion object {
        const val PAGE_HEIGHT_DP = 360
        const val ISLAND_HALF_DP = 15f
    }
}
