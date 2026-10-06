package app.note.island

import android.accessibilityservice.AccessibilityService
import android.content.Intent
import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CameraManager
import android.net.Uri
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.provider.MediaStore
import android.provider.Settings
import org.json.JSONArray
import org.json.JSONObject

/** Ações do painel do Note: lanterna, atalhos do sistema e apps instalados. */
class Shortcuts(private val service: AccessibilityService) {

    private val cameras = service.getSystemService(CameraManager::class.java)
    private var torchOn = false
    private val torchCallback = object : CameraManager.TorchCallback() {
        override fun onTorchModeChanged(cameraId: String, enabled: Boolean) {
            if (cameraId == flashId) torchOn = enabled
        }
    }
    private val flashId: String? by lazy {
        try {
            cameras.cameraIdList.firstOrNull {
                cameras.getCameraCharacteristics(it).get(CameraCharacteristics.FLASH_INFO_AVAILABLE) == true
            }
        } catch (_: Exception) {
            null
        }
    }

    init {
        try {
            cameras.registerTorchCallback(torchCallback, Handler(Looper.getMainLooper()))
        } catch (_: Exception) {
        }
    }

    fun release() {
        try {
            cameras.unregisterTorchCallback(torchCallback)
        } catch (_: Exception) {
        }
    }

    /** Liga ou desliga a lanterna. Não precisa da permissão de câmera. */
    fun toggleTorch(): Boolean {
        val id = flashId ?: return false
        return try {
            cameras.setTorchMode(id, !torchOn)
            torchOn = !torchOn
            torchOn
        } catch (_: Exception) {
            false
        }
    }

    fun system(what: String) {
        when (what) {
            "screenshot" -> service.performGlobalAction(AccessibilityService.GLOBAL_ACTION_TAKE_SCREENSHOT)
            "lock" -> service.performGlobalAction(AccessibilityService.GLOBAL_ACTION_LOCK_SCREEN)
            "notifications" -> service.performGlobalAction(AccessibilityService.GLOBAL_ACTION_NOTIFICATIONS)
            "quick" -> service.performGlobalAction(AccessibilityService.GLOBAL_ACTION_QUICK_SETTINGS)
            "camera" -> start(Intent(MediaStore.INTENT_ACTION_STILL_IMAGE_CAMERA))
            "dial" -> start(Intent(Intent.ACTION_DIAL, Uri.parse("tel:")))
            "calculator" -> start(Intent.makeMainSelectorActivity(Intent.ACTION_MAIN, Intent.CATEGORY_APP_CALCULATOR))
            "music" -> start(Intent.makeMainSelectorActivity(Intent.ACTION_MAIN, Intent.CATEGORY_APP_MUSIC))
            "wifi" -> start(if (Build.VERSION.SDK_INT >= 29) Intent(Settings.Panel.ACTION_WIFI) else Intent(Settings.ACTION_WIFI_SETTINGS))
            "bluetooth" -> start(Intent(Settings.ACTION_BLUETOOTH_SETTINGS))
            "settings" -> start(Intent(Settings.ACTION_SETTINGS))
        }
    }

    fun launch(pkg: String) {
        service.packageManager.getLaunchIntentForPackage(pkg)?.let { start(it) }
    }

    private fun start(i: Intent) {
        try {
            service.startActivity(i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK))
        } catch (_: Exception) {
        }
    }

    private var appsJson: String? = null

    /** Apps da gaveta, com os mais comuns primeiro. Ícones pequenos em data: URL. */
    fun apps(): String {
        appsJson?.let { return it }
        val pm = service.packageManager
        val main = Intent(Intent.ACTION_MAIN).addCategory(Intent.CATEGORY_LAUNCHER)
        val found = try {
            pm.queryIntentActivities(main, 0)
        } catch (_: Exception) {
            emptyList()
        }
        val seen = HashSet<String>()
        val list = found.mapNotNull { ri ->
            val pkg = ri.activityInfo?.packageName ?: return@mapNotNull null
            if (pkg == service.packageName || !seen.add(pkg)) return@mapNotNull null
            pkg to ri.loadLabel(pm).toString()
        }.sortedWith(compareBy({ rank(it.first) }, { it.second.lowercase() }))
            .take(MAX_APPS)
        val arr = JSONArray()
        list.forEach { (pkg, label) ->
            arr.put(JSONObject().put("pkg", pkg).put("label", label).put("icon", Images.appIcon(service, pkg)))
        }
        return arr.toString().also { appsJson = it }
    }

    fun forgetApps() {
        appsJson = null
    }

    private fun rank(pkg: String): Int {
        val i = FAVORITES.indexOf(pkg)
        return if (i >= 0) i else FAVORITES.size
    }

    private companion object {
        const val MAX_APPS = 24
        val FAVORITES = listOf(
            "com.whatsapp", "com.instagram.android", "com.google.android.youtube", "com.spotify.music",
            "com.android.chrome", "org.telegram.messenger", "com.google.android.gm", "com.google.android.apps.maps",
            "com.zhiliaoapp.musically", "com.google.android.apps.photos", "com.miui.gallery", "com.netflix.mediaclient",
            "com.facebook.katana", "com.twitter.android", "com.nu.production", "com.mercadolibre", "br.com.intermedium",
            "com.ubercab", "com.google.android.dialer", "com.android.contacts", "com.google.android.apps.messaging",
        )
    }
}
