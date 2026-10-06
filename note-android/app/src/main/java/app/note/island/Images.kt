package app.note.island

import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.util.Base64
import java.io.ByteArrayOutputStream

/** Nomes e ícones de apps, e imagens convertidas para data: URL para a ilha. */
object Images {
    private val labels = HashMap<String, String>()
    private val icons = HashMap<String, String>()

    fun appLabel(ctx: Context, pkg: String): String = labels.getOrPut(pkg) {
        try {
            val pm = ctx.packageManager
            pm.getApplicationLabel(pm.getApplicationInfo(pkg, 0)).toString()
        } catch (_: Exception) {
            pkg.substringAfterLast('.').replaceFirstChar { it.uppercase() }
        }
    }

    fun appIcon(ctx: Context, pkg: String): String = icons.getOrPut(pkg) {
        try {
            toDataUrl(drawableToBitmap(ctx.packageManager.getApplicationIcon(pkg), 72), 72, jpeg = false)
        } catch (_: Exception) {
            ""
        }
    }

    fun toDataUrl(src: Bitmap, size: Int, jpeg: Boolean): String {
        val bmp = if (src.width > size || src.height > size) {
            val s = size.toFloat() / maxOf(src.width, src.height)
            Bitmap.createScaledBitmap(src, maxOf(1, (src.width * s).toInt()), maxOf(1, (src.height * s).toInt()), true)
        } else src
        val out = ByteArrayOutputStream()
        bmp.compress(if (jpeg) Bitmap.CompressFormat.JPEG else Bitmap.CompressFormat.PNG, 82, out)
        val mime = if (jpeg) "image/jpeg" else "image/png"
        return "data:$mime;base64," + Base64.encodeToString(out.toByteArray(), Base64.NO_WRAP)
    }

    private fun drawableToBitmap(d: Drawable, size: Int): Bitmap {
        if (d is BitmapDrawable && d.bitmap != null) return d.bitmap
        val bmp = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888)
        val c = Canvas(bmp)
        d.setBounds(0, 0, size, size)
        d.draw(c)
        return bmp
    }
}
