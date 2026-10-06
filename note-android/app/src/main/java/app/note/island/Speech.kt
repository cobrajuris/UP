package app.note.island

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer

/** Reconhecimento de voz em português para o assistente da ilha. */
class Speech(
    private val ctx: Context,
    private val emitText: (String, Boolean) -> Unit,
    private val emitError: (String) -> Unit,
    private val emitLevel: (Float) -> Unit,
) {
    private var sr: SpeechRecognizer? = null
    private var lastLevel = 0L

    fun start() {
        if (ctx.checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            emitError("Libere o microfone no app Note.")
            return
        }
        if (!SpeechRecognizer.isRecognitionAvailable(ctx)) {
            emitError("Reconhecimento de voz indisponível.")
            return
        }
        destroy()
        val r = SpeechRecognizer.createSpeechRecognizer(ctx)
        sr = r
        r.setRecognitionListener(object : RecognitionListener {
            override fun onReadyForSpeech(params: Bundle?) = Unit
            override fun onBeginningOfSpeech() = Unit
            override fun onRmsChanged(rmsdB: Float) {
                val now = System.currentTimeMillis()
                if (now - lastLevel < 90) return
                lastLevel = now
                emitLevel(((rmsdB + 2f) / 12f).coerceIn(0f, 1f))
            }
            override fun onBufferReceived(buffer: ByteArray?) = Unit
            override fun onEndOfSpeech() = Unit
            override fun onError(error: Int) {
                emitError(
                    when (error) {
                        SpeechRecognizer.ERROR_NO_MATCH, SpeechRecognizer.ERROR_SPEECH_TIMEOUT -> "Não ouvi nada. Toque no microfone e fale."
                        SpeechRecognizer.ERROR_NETWORK, SpeechRecognizer.ERROR_NETWORK_TIMEOUT -> "Sem internet para entender a voz."
                        SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS -> "Libere o microfone no app Note."
                        else -> "Não consegui ouvir. Digite sua pergunta."
                    }
                )
            }
            override fun onResults(results: Bundle?) = emitText(best(results), true)
            override fun onPartialResults(partialResults: Bundle?) {
                val t = best(partialResults)
                if (t.isNotEmpty()) emitText(t, false)
            }
            override fun onEvent(eventType: Int, params: Bundle?) = Unit
        })
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            .putExtra(RecognizerIntent.EXTRA_LANGUAGE, "pt-BR")
            .putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
        r.startListening(intent)
    }

    fun stop() {
        sr?.stopListening()
    }

    fun destroy() {
        sr?.destroy()
        sr = null
    }

    private fun best(b: Bundle?): String =
        b?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)?.firstOrNull().orEmpty()
}
