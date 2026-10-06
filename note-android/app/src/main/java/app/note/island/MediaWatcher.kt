package app.note.island

import android.content.ComponentName
import android.content.Context
import android.graphics.Bitmap
import android.media.MediaMetadata
import android.media.session.MediaController
import android.media.session.MediaSessionManager
import android.media.session.PlaybackState
import android.os.Handler
import android.os.Looper
import android.os.SystemClock
import org.json.JSONObject

/** Acompanha o player que está tocando (Spotify, YouTube Music, etc.) e manda para a ilha. */
object MediaWatcher {

    private val main = Handler(Looper.getMainLooper())
    private var ctx: Context? = null
    private var msm: MediaSessionManager? = null
    private var ctrl: MediaController? = null
    private var artKey = ""
    private var art = ""

    private val callback = object : MediaController.Callback() {
        override fun onMetadataChanged(metadata: MediaMetadata?) = push()
        override fun onPlaybackStateChanged(state: PlaybackState?) = push()
        override fun onSessionDestroyed() = pick(null)
    }

    private val sessions = MediaSessionManager.OnActiveSessionsChangedListener { list -> pick(list) }

    fun start(context: Context) {
        val c = context.applicationContext
        stop()
        ctx = c
        val m = c.getSystemService(MediaSessionManager::class.java) ?: return
        msm = m
        val comp = ComponentName(c, NotesListener::class.java)
        try {
            m.addOnActiveSessionsChangedListener(sessions, comp, main)
            pick(m.getActiveSessions(comp))
        } catch (_: SecurityException) {
            // Acesso a notificações ainda não liberado; o NotesListener chama start() de novo.
            msm = null
        }
    }

    fun stop() {
        try {
            msm?.removeOnActiveSessionsChangedListener(sessions)
        } catch (_: Exception) {
        }
        ctrl?.unregisterCallback(callback)
        ctrl = null
        msm = null
    }

    private fun pick(list: List<MediaController>?) {
        val all = list ?: try {
            ctx?.let { msm?.getActiveSessions(ComponentName(it, NotesListener::class.java)) }
        } catch (_: SecurityException) {
            null
        } ?: emptyList()
        val best = all.firstOrNull { it.playbackState?.state == PlaybackState.STATE_PLAYING } ?: all.firstOrNull()
        if (best?.sessionToken != ctrl?.sessionToken) {
            ctrl?.unregisterCallback(callback)
            ctrl = best
            best?.registerCallback(callback, main)
        }
        push()
    }

    fun push() {
        val svc = IslandService.instance ?: return
        val c = ctrl
        val md = c?.metadata
        val st = c?.playbackState
        if (c == null || md == null || st == null || st.state == PlaybackState.STATE_STOPPED || st.state == PlaybackState.STATE_NONE) {
            svc.js("NoteBridge.media(null)")
            return
        }
        val title = md.getString(MediaMetadata.METADATA_KEY_TITLE).orEmpty()
        val artist = (md.getString(MediaMetadata.METADATA_KEY_ARTIST) ?: md.getString(MediaMetadata.METADATA_KEY_ALBUM_ARTIST)).orEmpty()
        val playing = st.state == PlaybackState.STATE_PLAYING
        var pos = st.position
        if (playing && st.lastPositionUpdateTime > 0) {
            pos += ((SystemClock.elapsedRealtime() - st.lastPositionUpdateTime) * st.playbackSpeed).toLong()
        }
        val key = "$title|$artist"
        if (key != artKey) {
            artKey = key
            val bmp: Bitmap? = md.getBitmap(MediaMetadata.METADATA_KEY_ALBUM_ART)
                ?: md.getBitmap(MediaMetadata.METADATA_KEY_ART)
                ?: md.getBitmap(MediaMetadata.METADATA_KEY_DISPLAY_ICON)
            art = bmp?.let { Images.toDataUrl(it, 120, jpeg = true) }.orEmpty()
        }
        val json = JSONObject()
            .put("title", title).put("artist", artist)
            .put("app", Images.appLabel(svc, c.packageName))
            .put("dur", md.getLong(MediaMetadata.METADATA_KEY_DURATION) / 1000.0)
            .put("pos", pos.coerceAtLeast(0) / 1000.0)
            .put("playing", playing)
            .put("art", art)
        svc.js("NoteBridge.media($json)")
    }

    fun command(action: String) {
        val c = ctrl ?: return
        val t = c.transportControls
        when (action) {
            "toggle" -> if (c.playbackState?.state == PlaybackState.STATE_PLAYING) t.pause() else t.play()
            "play" -> t.play()
            "next" -> t.skipToNext()
            "prev" -> t.skipToPrevious()
        }
    }
}
