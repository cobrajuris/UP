# Roadmap — o que falta depois do núcleo de treino

Este documento é a continuação direta da lista que você mandou. Tudo aqui
depende de decisões e contas que só você pode criar (Firebase, Google Play
Console, dispositivos Bluetooth reais para testar) — por isso não entrou na
Fase 1. Peça para eu implementar qualquer um destes itens quando estiver
pronto para criar as contas necessárias; eu escrevo o código, mas a conta em
si (Firebase, Play Console) tem que ser seu login do Google.

## Fase 1.5 — Identificação de aparelho por IA (câmera)

Hoje: câmera real + catálogo local pesquisável (você tira a foto e escolhe
o aparelho numa lista — sem IA paga, como você pediu).

Para virar reconhecimento automático de verdade, sem custo por chamada, o
caminho é um modelo de visão computacional rodando **no aparelho**:
1. Coletar fotos dos aparelhos da(s) academia(s) que você quer suportar
   (ideal: várias fotos de ângulos diferentes de cada aparelho).
2. Treinar um classificador leve (ex.: MobileNetV2 fine-tuned) com essas
   fotos — dá para fazer isso em poucas horas no Google Colab, gratuito.
3. Exportar para `.tflite` e usar o pacote `tflite_flutter` para rodar o
   modelo direto no celular, offline, sem custo por chamada.

Sem fotos reais dos aparelhos não dá para treinar nada — esse é o passo que
só você consegue fazer (tirar as fotos na academia).

## Fase 2 — Conta, nuvem e social (Firebase)

Você escolheu Firebase. Passo a passo:
1. Criar um projeto em https://console.firebase.google.com com sua conta
   Google (gratuito no plano Spark até um volume alto de uso).
2. Rodar `flutterfire configure` (CLI oficial) para conectar o projeto
   Flutter ao Firebase automaticamente.
3. **Login**: Firebase Authentication (e-mail/senha + "Entrar com Google").
4. **Sincronização + histórico na nuvem**: Cloud Firestore — troca a leitura
   local do SQLite por leitura da nuvem com cache offline automático (o
   Firestore já sincroniza sozinho quando a internet volta).
5. **Chat com personal trainer**: uma coleção Firestore de mensagens por
   conversa (é essencialmente o mesmo padrão de um chat simples) — só faz
   sentido se o UP.PRO tiver personal trainers reais cadastrados do outro
   lado.
6. **Push notifications de servidor** (diferente dos lembretes locais que já
   existem): Firebase Cloud Messaging, para avisos que partem de você (ex.
   "chegou treino novo") em vez de partirem do próprio celular.

## Fase 3 — Sensores e hardware

- **Google Fit / Health Connect** (frequência cardíaca, passos, calorias
  reais do sistema): pacote `health` (Flutter). Precisa declarar as
  permissões de saúde no Android e testar em celular físico — não funciona
  em emulador.
- **Bluetooth para pulseiras/relógios e monitores de frequência cardíaca de
  peito**: pacote `flutter_blue_plus`, lendo o serviço padrão BLE "Heart
  Rate" (0x180D) que praticamente todo monitor de peito e boa parte dos
  relógios expõem. Precisa de um dispositivo Bluetooth real para testar —
  eu não consigo simular isso.

## Fase 4 — Monetização, ícone, splash e loja

1. **Google Play Billing** (assinatura Premium): pacote `in_app_purchase` +
   cadastrar os produtos de assinatura no Google Play Console. Precisa de
   conta de desenvolvedor Google Play (taxa única de US$25).
2. **Ícone real**: usar `flutter_launcher_icons` (já no `pubspec.yaml` como
   dev dependency) apontando para
   `UP.PRO/ICONE DO APLICATIVO UP.PRO`. Depois de configurar o caminho no
   `pubspec.yaml`, rode `dart run flutter_launcher_icons`.
3. **Splash screen**: `flutter_native_splash` (idem, já listado), usando
   `UP.PRO/logo nova UP.PRO`. Rode `dart run flutter_native_splash:create`.
4. **Publicação na Play Store**: criar a ficha do app no Play Console
   (descrição, capturas de tela, política de privacidade — obrigatória),
   gerar um *App Bundle* assinado (`flutter build appbundle --release`,
   depois de configurar uma chave de assinatura) e enviar para revisão.

## Ordem sugerida

Full offline (o que já está pronto) → Fase 2 (login/nuvem, para não perder
o histórico se trocar de celular) → Fase 4 (ícone, splash, Play Store, para
já ter algo instalável por outras pessoas) → Fase 3 (sensores, quando tiver
os dispositivos para testar) → Fase 1.5 (IA de reconhecimento, quando tiver
fotos reais dos aparelhos).
