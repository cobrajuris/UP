# Note para Android

App que coloca a ilha do Note em volta da câmera do seu Android, por cima de qualquer app.
A ilha é a mesma do protótipo em `note/`; o app só a liga ao celular de verdade.

## Baixar e instalar

1. No celular, abra **github.com/cobrajuris/UP › Releases › "Note para Android"** e baixe `Note.apk`.
2. Abra o arquivo. Na primeira vez, o Android pede para **permitir instalar apps desta fonte**
   (o navegador ou o gerenciador de arquivos). Permita e instale.
3. Abra o **Note** e siga os passos da tela:
   - **Ligar a ilha**: Acessibilidade › Note — ilha dinâmica › ativar.
   - **Notificações e música**: liberar acesso às notificações.
   - **Microfone**: para falar com o Note.
   - **Não perturbe** (opcional): para o modo silencioso.

Cada push em `note/` ou `note-android/` gera um APK novo no mesmo link. Ele instala por cima
do anterior, sem perder as permissões.

### Se o Android bloquear

- **Android 13 ou mais novo**: apps instalados fora da Play Store precisam de uma liberação
  extra antes da Acessibilidade. Vá em Configurações › Apps › Note › menu (⋮) ›
  **Permitir configurações restritas** e volte ao passo 1.
- **Xiaomi / HyperOS**: em Configurações › Apps › Note, ative **Início automático** e deixe
  a **Economia de bateria** em **Sem restrições**. Sem isso o sistema pode fechar a ilha.

## O que funciona com dados reais

| Recurso | De onde vem |
|---|---|
| Ilha em volta da câmera | posição real do furo da câmera (DisplayCutout) |
| Música | player que estiver tocando (Spotify, YouTube Music...), com capa e controles |
| Notificações | avisos novos dos apps, no estilo HyperOS; tocar abre a conversa |
| Chamadas | atender e recusar pela ilha; duração durante a chamada |
| Carregando | aviso quando o carregador é conectado, com a porcentagem |
| Silencioso | aviso quando o modo muda; o Note também liga e desliga por voz |
| Timer | pedido por voz ou texto, vibra no fim |
| Hoje | bateria, armazenamento, volume e número de notificações |
| Assistente | voz em português (precisa de internet para entender a fala) |

Corrida, voo, mapas, tradutor e treino continuam como **demonstração**: aparecem quando você
pede ao Note, mas ainda não leem dados de outros apps.

## Por que Acessibilidade

No Android, só um serviço de acessibilidade consegue desenhar por cima da barra de status, onde
fica a câmera. É o mesmo caminho dos apps de ilha dinâmica da Play Store. O Note não lê o
conteúdo da tela (`canRetrieveWindowContent="false"`).

## Como funciona por dentro

```
IslandService      serviço de acessibilidade: cria a janela da ilha, bateria e silencioso
IslandOverlay      janela + WebView com assets/note/overlay.html, recortada em volta da ilha
NotesListener      notificações, chamadas e acesso à sessão de mídia
MediaWatcher       música tocando: título, artista, capa, posição e controles
Speech             reconhecimento de voz em pt-BR
MainActivity       tela de configuração
```

A janela tem só o tamanho da ilha (mais a sombra quando aberta) e fica centralizada na câmera.
O resto da tela continua recebendo toques. A página avisa o tamanho em
`NoteAndroid.setBounds(meiaLargura, base)` a cada mudança.

## Compilar no computador

Precisa do Android SDK (Android Studio instala). Na pasta `note-android/`:

```
./gradlew assembleRelease
```

O APK sai em `app/build/outputs/apk/release/app-release.apk`. A chave `note-sideload.jks` é fixa
para instalar por cima; para publicar na Play Store, crie uma chave própria.
