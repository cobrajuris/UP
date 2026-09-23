const {Phone,NavDock,DS}=window;
const {Snackbar}=DS;

function App(){
  const [screen,setScreen]=React.useState('onboarding');
  const [toast,setToast]=React.useState(null);
  const go=(s)=>{if(s==='registrar'){setToast('Copo de 250 ml registrado');setTimeout(()=>setToast(null),2600);return}setScreen(s)};
  const ctx={go,screen,setToast};

  const SCREENS={
    onboarding:window.Onboarding,login:window.Login,cadastro:window.Cadastro,recuperar:window.Recuperar,perfilInicial:window.PerfilInicial,
    inicio:window.Inicio,metas:window.Metas,
    catalogo:window.Catalogo,treino:window.DetalheTreino,execucao:window.Execucao,concluido:window.Concluido,
    estatisticas:window.Estatisticas,historico:window.Historico,medidas:window.Medidas,plano:window.Plano,
    conquistas:window.Conquistas,notificacoes:window.Notificacoes,perfil:window.Perfil,estados:window.Estados
  };
  const Current=SCREENS[screen]||window.Inicio;
  const rootTabs={inicio:'inicio',catalogo:'nutricao',estatisticas:'estatisticas',conquistas:'conquistas'};
  const light=screen==='concluido';

  const chapters=[
    ['Entrada',[['onboarding','Onboarding'],['login','Entrar'],['cadastro','Criar conta'],['recuperar','Recuperar senha'],['perfilInicial','Configuração inicial']]],
    ['Dia a dia',[['inicio','Início'],['metas','Metas'],['plano','Plano da semana'],['notificacoes','Notificações']]],
    ['Treinar',[['catalogo','Catálogo'],['treino','Detalhe do treino'],['execucao','Execução'],['concluido','Treino concluído']]],
    ['Progresso',[['estatisticas','Estatísticas'],['historico','Histórico'],['medidas','Peso e medidas'],['conquistas','Conquistas']]],
    ['Conta',[['perfil','Perfil e ajustes'],['estados','Estados do sistema']]]
  ];

  return <div style={{display:'flex',gap:36,padding:'40px 44px',alignItems:'flex-start',fontFamily:'var(--font-ui)'}}>
    <nav style={{width:210,flexShrink:0,display:'flex',flexDirection:'column',gap:20,position:'sticky',top:40}}>
      <img src="../../assets/logo-uppro-wordmark.png" alt="UP.PRO" style={{width:150,marginLeft:-8}}/>
      {chapters.map(([t,items])=><div key={t} style={{display:'flex',flexDirection:'column',gap:3}}>
        <span style={{fontSize:10,letterSpacing:'var(--ls-caps)',color:'var(--grey-400)',marginBottom:3}}>{t.toUpperCase()}</span>
        {items.map(([id,label])=><button key={id} type="button" onClick={()=>setScreen(id)}
          style={{textAlign:'left',padding:'7px 12px',borderRadius:10,border:'none',cursor:'pointer',background:screen===id?'var(--lime-500)':'transparent',color:screen===id?'var(--raisin-700)':'var(--grey-200)',fontFamily:'var(--font-ui)',fontSize:13,fontWeight:screen===id?700:500}}>{label}</button>)}
      </div>)}
    </nav>
    <Phone statusDark={light}>
      <Current {...ctx}/>
      {rootTabs[screen]&&<NavDock active={rootTabs[screen]} go={id=>{
        const map={inicio:'inicio',nutricao:'catalogo',estatisticas:'estatisticas',conquistas:'conquistas'};
        go(map[id]||id);}}/>}
      {toast&&<div style={{position:'absolute',left:'var(--screen-margin)',right:'var(--screen-margin)',bottom:92,zIndex:30}}><Snackbar tone="success" message={toast} actionLabel="Desfazer"/></div>}
    </Phone>
  </div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);