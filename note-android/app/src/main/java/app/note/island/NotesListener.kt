package app.note.island

import android.app.ActivityOptions
import android.app.Notification
import android.app.NotificationManager
import android.app.PendingIntent
import android.os.Build
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import org.json.JSONArray
import org.json.JSONObject

/**
 * Recebe as notificações do sistema. Mostra as novas na ilha, transforma chamadas em
 * "atender / recusar" e dá ao MediaWatcher acesso à música que está tocando.
 */
class NotesListener : NotificationListenerService() {

    companion object {
        @Volatile
        private var instance: NotesListener? = null

        fun open(key: String) = instance?.openKey(key)
        fun action(key: String, index: Int) = instance?.runAction(key, index)
        fun count(): Int = try {
            instance?.activeNotifications?.count { !it.isOngoing } ?: 0
        } catch (_: Exception) {
            0
        }

        private val SKIP = setOf(
            Notification.CATEGORY_TRANSPORT, Notification.CATEGORY_PROGRESS,
            Notification.CATEGORY_SERVICE, Notification.CATEGORY_SYSTEM,
            Notification.CATEGORY_STATUS, Notification.CATEGORY_NAVIGATION,
        )
    }

    /** Evita repetir o mesmo aviso quando o app só atualiza a notificação. */
    private val seen = HashMap<String, Int>()

    override fun onListenerConnected() {
        instance = this
        IslandService.instance?.let { MediaWatcher.start(it) }
    }

    override fun onListenerDisconnected() {
        instance = null
    }

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        val svc = IslandService.instance ?: return
        if (sbn.packageName == packageName) return
        val n = sbn.notification
        val ex = n.extras
        val title = ex.getCharSequence(Notification.EXTRA_TITLE)?.toString().orEmpty()
        val text = (ex.getCharSequence(Notification.EXTRA_BIG_TEXT) ?: ex.getCharSequence(Notification.EXTRA_TEXT))
            ?.toString().orEmpty()

        if (n.category == Notification.CATEGORY_CALL) {
            val actions = JSONArray()
            n.actions?.forEach { actions.put(it.title?.toString().orEmpty()) }
            val json = JSONObject()
                .put("key", sbn.key).put("category", "call")
                .put("title", title.ifBlank { "Chamada" }).put("text", text)
                .put("ongoing", sbn.isOngoing).put("actions", actions)
            svc.js("NoteBridge.notify($json)")
            return
        }

        if (sbn.isOngoing) return
        if (n.flags and Notification.FLAG_GROUP_SUMMARY != 0) return
        if (n.category in SKIP) return
        if (title.isBlank() && text.isBlank()) return
        if (!isLoud(sbn)) return
        val hash = (title + "\u0000" + text).hashCode()
        if (seen[sbn.key] == hash) return
        if (seen.containsKey(sbn.key) && n.flags and Notification.FLAG_ONLY_ALERT_ONCE != 0) return
        seen[sbn.key] = hash
        if (seen.size > 200) seen.clear()

        val json = JSONObject()
            .put("key", sbn.key).put("category", n.category ?: "")
            .put("app", Images.appLabel(this, sbn.packageName))
            .put("title", title).put("text", text.take(160))
            .put("icon", Images.appIcon(this, sbn.packageName))
            .put("actions", JSONArray())
        svc.js("NoteBridge.notify($json)")
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification) {
        seen.remove(sbn.key)
        IslandService.instance?.js("NoteBridge.removed(${JSONObject.quote(sbn.key)})")
    }

    /** Só mostra o que faria barulho ou apareceria no topo; notificações silenciosas ficam de fora. */
    private fun isLoud(sbn: StatusBarNotification): Boolean {
        val r = Ranking()
        if (!currentRanking.getRanking(sbn.key, r)) return true
        return r.importance >= NotificationManager.IMPORTANCE_DEFAULT && r.matchesInterruptionFilter()
    }

    private fun find(key: String) = try {
        activeNotifications?.firstOrNull { it.key == key }
    } catch (_: Exception) {
        null
    }

    private fun openKey(key: String) {
        val sbn = find(key) ?: return
        send(sbn.notification.contentIntent)
        if (sbn.notification.flags and Notification.FLAG_AUTO_CANCEL != 0) cancelNotification(key)
    }

    private fun runAction(key: String, index: Int) {
        val action = find(key)?.notification?.actions?.getOrNull(index) ?: return
        send(action.actionIntent)
    }

    private fun send(pi: PendingIntent?) {
        if (pi == null) return
        try {
            if (Build.VERSION.SDK_INT >= 34) {
                val opts = ActivityOptions.makeBasic()
                    .setPendingIntentBackgroundActivityStartMode(ActivityOptions.MODE_BACKGROUND_ACTIVITY_START_ALLOWED)
                pi.send(this, 0, null, null, null, null, opts.toBundle())
            } else {
                pi.send()
            }
        } catch (_: PendingIntent.CanceledException) {
        }
    }
}
