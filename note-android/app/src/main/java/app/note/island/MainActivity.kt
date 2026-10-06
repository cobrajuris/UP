package app.note.island

import android.Manifest
import android.app.Activity
import android.app.NotificationManager
import android.content.ComponentName
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.net.Uri
import android.os.Bundle
import android.provider.Settings
import android.text.TextUtils
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView

/** Tela de configuração: cada passo mostra se já está liberado e leva ao ajuste certo. */
class MainActivity : Activity() {

    private class Step(val title: String, val detail: String, val action: String, val done: () -> Boolean, val go: () -> Unit)

    private lateinit var list: LinearLayout
    private lateinit var steps: List<Step>

    private val ink = Color.parseColor("#F5F2FA")
    private val ink2 = Color.parseColor("#A9A4B5")
    private val note = Color.parseColor("#B9A3FF")
    private val ok = Color.parseColor("#30D158")
    private val bg = Color.parseColor("#0B0A0E")
    private val card = Color.parseColor("#17161D")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = bg
        window.navigationBarColor = bg

        steps = listOf(
            Step(
                "1. Ligar a ilha",
                "Em Acessibilidade, abra \"Note — ilha dinâmica\" e ative. É isso que deixa a ilha aparecer em volta da câmera, por cima dos outros apps. O Note não lê o conteúdo da sua tela.",
                "Abrir Acessibilidade",
                ::islandOn,
            ) { startActivity(Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)) },
            Step(
                "2. Notificações e música",
                "Libere o acesso às notificações para a ilha mostrar mensagens, chamadas e a música que está tocando.",
                "Liberar notificações",
                ::notificationsOn,
            ) { startActivity(Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS)) },
            Step(
                "3. Microfone",
                "Para falar com o Note. Segure a ilha ou toque no microfone do painel.",
                "Liberar microfone",
                { checkSelfPermission(Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED },
            ) { requestPermissions(arrayOf(Manifest.permission.RECORD_AUDIO), 1) },
            Step(
                "4. Modo silencioso (opcional)",
                "Deixa o Note colocar o celular no silencioso quando você pedir. Sem isso, ele usa o modo vibrar.",
                "Liberar Não perturbe",
                { getSystemService(NotificationManager::class.java).isNotificationPolicyAccessGranted },
            ) { startActivity(Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS)) },
        )

        val scroll = ScrollView(this).apply { setBackgroundColor(bg); isFillViewport = true }
        val col = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(dp(22), dp(48), dp(22), dp(32))
        }
        scroll.addView(col)

        col.addView(orb())
        col.addView(text("Note", 40f, ink, bold = true).apply { setPadding(0, dp(14), 0, 0) })
        col.addView(text("A ilha dinâmica que nasce em volta da câmera.", 16f, ink2).apply { setPadding(0, dp(4), 0, dp(22)) })

        list = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        col.addView(list)

        col.addView(text("Se o Android bloquear", 15f, ink, bold = true).apply { setPadding(0, dp(18), 0, dp(6)) })
        col.addView(
            text(
                "Em celulares com Android 13 ou mais novo, apps instalados fora da Play Store precisam de uma liberação extra: " +
                    "Configurações › Apps › Note › menu (⋮) › Permitir configurações restritas. Depois volte ao passo 1.\n\n" +
                    "Xiaomi / HyperOS: em Configurações › Apps › Note, ative Início automático e deixe a Economia de bateria em Sem restrições, " +
                    "para a ilha não sumir.",
                14f, ink2,
            )
        )
        col.addView(button("Abrir dados do app Note", outline = true) {
            startActivity(Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:$packageName")))
        }.apply { (layoutParams as LinearLayout.LayoutParams).topMargin = dp(12) })

        col.addView(text("Como usar", 15f, ink, bold = true).apply { setPadding(0, dp(24), 0, dp(6)) })
        col.addView(
            text(
                "Toque na ilha vazia: abre o painel com música, data, ações rápidas (lanterna, timer, captura, Wi-Fi...) e seus apps.\n" +
                    "Segure: conversa com o Note.\nToque numa atividade: abre.\n" +
                    "Deslize para os lados: alterna.\nDeslize para cima ou toque fora: recolhe.\n\n" +
                    "Peça \"timer de 10 minutos\", \"tocar música\", \"ativar modo silencioso\" ou \"resumo de hoje\". " +
                    "Corrida, voo, mapas, tradutor e treino ainda são demonstrações.",
                14f, ink2,
            )
        )
        setContentView(scroll)
    }

    override fun onResume() {
        super.onResume()
        render()
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        render()
    }

    private fun render() {
        list.removeAllViews()
        steps.forEach { s ->
            val done = s.done()
            val box = LinearLayout(this).apply {
                orientation = LinearLayout.VERTICAL
                setPadding(dp(18), dp(16), dp(18), dp(16))
                background = GradientDrawable().apply { cornerRadius = dp(24).toFloat(); setColor(card) }
                layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)
                    .apply { bottomMargin = dp(12) }
            }
            val head = LinearLayout(this).apply { orientation = LinearLayout.HORIZONTAL; gravity = Gravity.CENTER_VERTICAL }
            head.addView(text(s.title, 16f, ink, bold = true), LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f))
            head.addView(text(if (done) "Pronto" else "Pendente", 13f, if (done) ok else ink2, bold = true))
            box.addView(head)
            box.addView(text(s.detail, 14f, ink2).apply { setPadding(0, dp(6), 0, if (done) 0 else dp(12)) })
            if (!done) box.addView(button(s.action) { s.go() })
            list.addView(box)
        }
    }

    private fun islandOn(): Boolean {
        val enabled = Settings.Secure.getString(contentResolver, Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES) ?: return false
        val me = ComponentName(this, IslandService::class.java)
        val split = TextUtils.SimpleStringSplitter(':').apply { setString(enabled) }
        return split.any { ComponentName.unflattenFromString(it) == me }
    }

    private fun notificationsOn(): Boolean {
        val enabled = Settings.Secure.getString(contentResolver, "enabled_notification_listeners") ?: return false
        return enabled.split(':').any { ComponentName.unflattenFromString(it)?.packageName == packageName }
    }

    // ------------------------------------------------------------------ visual

    private fun text(s: String, size: Float, color: Int, bold: Boolean = false) = TextView(this).apply {
        text = s
        textSize = size
        setTextColor(color)
        setLineSpacing(0f, 1.25f)
        if (bold) typeface = Typeface.create("sans-serif-medium", Typeface.NORMAL)
    }

    private fun button(label: String, outline: Boolean = false, onClick: () -> Unit) = Button(this).apply {
        text = label
        isAllCaps = false
        textSize = 15f
        setTextColor(if (outline) ink else Color.parseColor("#17121F"))
        background = GradientDrawable().apply {
            cornerRadius = dp(22).toFloat()
            if (outline) setStroke(dp(1), Color.parseColor("#3A3842")) else setColor(note)
        }
        stateListAnimator = null
        layoutParams = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(46))
        setOnClickListener { onClick() }
    }

    private fun orb(): View = View(this).apply {
        background = GradientDrawable().apply {
            shape = GradientDrawable.OVAL
            gradientType = GradientDrawable.SWEEP_GRADIENT
            colors = intArrayOf(
                Color.parseColor("#FF7AC6"), Color.parseColor("#FFC27A"),
                Color.parseColor("#7EE8FF"), Color.parseColor("#9B8CFF"), Color.parseColor("#FF7AC6"),
            )
        }
        layoutParams = LinearLayout.LayoutParams(dp(56), dp(56))
    }

    private fun dp(v: Int) = (v * resources.displayMetrics.density).toInt()
}
