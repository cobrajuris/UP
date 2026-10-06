package app.note.island

import android.accessibilityservice.AccessibilityService
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.res.Configuration
import android.media.AudioManager
import android.os.BatteryManager
import android.os.Build
import android.view.accessibility.AccessibilityEvent

/**
 * Serviço de acessibilidade do Note. Só existe para poder desenhar a ilha por cima da barra
 * de status (TYPE_ACCESSIBILITY_OVERLAY); ele não lê o conteúdo de outros apps.
 */
class IslandService : AccessibilityService() {

    companion object {
        @Volatile
        var instance: IslandService? = null
            private set
    }

    private var overlay: IslandOverlay? = null
    private var battery = 100
    private var plugged = false

    private val receiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            when (intent.action) {
                Intent.ACTION_BATTERY_CHANGED -> {
                    val level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
                    val scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, 100)
                    val nowPlugged = intent.getIntExtra(BatteryManager.EXTRA_PLUGGED, 0) != 0
                    if (level >= 0) battery = (level * 100f / scale).toInt()
                    val justPlugged = nowPlugged && !plugged
                    plugged = nowPlugged
                    js("NoteBridge.battery($battery,$plugged,$justPlugged)")
                }
                AudioManager.RINGER_MODE_CHANGED_ACTION -> {
                    val mode = when (intent.getIntExtra(AudioManager.EXTRA_RINGER_MODE, AudioManager.RINGER_MODE_NORMAL)) {
                        AudioManager.RINGER_MODE_SILENT -> "silent"
                        AudioManager.RINGER_MODE_VIBRATE -> "vibrate"
                        else -> "normal"
                    }
                    js("NoteBridge.ringer('$mode')")
                }
            }
        }
    }

    val batteryLevel: Int get() = battery

    override fun onServiceConnected() {
        instance = this
        overlay = IslandOverlay(this).also { it.show() }
        val filter = IntentFilter().apply {
            addAction(Intent.ACTION_BATTERY_CHANGED)
            addAction(AudioManager.RINGER_MODE_CHANGED_ACTION)
        }
        // Lê o estado atual sem disparar o aviso de "carregando" na abertura.
        registerReceiverCompat(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))?.let { sticky ->
            val level = sticky.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
            val scale = sticky.getIntExtra(BatteryManager.EXTRA_SCALE, 100)
            if (level >= 0) battery = (level * 100f / scale).toInt()
            plugged = sticky.getIntExtra(BatteryManager.EXTRA_PLUGGED, 0) != 0
        }
        registerReceiverCompat(receiver, filter)
        MediaWatcher.start(this)
    }

    private fun registerReceiverCompat(r: BroadcastReceiver?, f: IntentFilter): Intent? =
        if (Build.VERSION.SDK_INT >= 33) registerReceiver(r, f, Context.RECEIVER_NOT_EXPORTED)
        else registerReceiver(r, f)

    /** Chamado pela ilha quando a página carregou: manda o que já está acontecendo. */
    fun replay() {
        MediaWatcher.push()
    }

    fun js(call: String) {
        overlay?.js(call)
    }

    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        overlay?.onConfigurationChanged(newConfig)
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) = Unit

    override fun onInterrupt() = Unit

    override fun onUnbind(intent: Intent?): Boolean {
        shutdown()
        return super.onUnbind(intent)
    }

    override fun onDestroy() {
        shutdown()
        super.onDestroy()
    }

    private fun shutdown() {
        if (instance == null) return
        instance = null
        try {
            unregisterReceiver(receiver)
        } catch (_: IllegalArgumentException) {
        }
        MediaWatcher.stop()
        overlay?.hide()
        overlay = null
    }
}
