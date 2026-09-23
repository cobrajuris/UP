const {Page,Photo,DS}=window;
const {Card,SectionHeader,TopAppBar,IconButton,Icon,Badge,Button,ListRow,Avatar,Switch,Dialog,Snackbar,EmptyState,Skeleton,ProgressBar,DataRow}=DS;

const CONQUISTAS=[
  {i:'flame',t:'6 dias seguidos',d:'Sequência atual',on:true},
  {i:'footprints',t:'100 mil passos',d:'Em setembro',on:true},
  {i:'sunrise',t:'Madrugadora',d:'5 treinos antes das 07:00',on:true},
  {i:'mountain',t:'Meia maratona',d:'21 km em uma semana',on:false},
  {i:'droplet',t:'Hidratação perfeita',d:'2,5 L por 14 dias',on:false},
  {i:'medal',t:'12 semanas',d:'Plano completo',on:false}
];

function Conquistas({go}){
  return <>
    <TopAppBar title="Conquistas"/>
    <Page>
      <Card padding="22px 20px" tone="accent" style={{textAlign:'center'}}>
        <span style={{fontSize:56,fontWeight:700,letterSpacing:'var(--ls-tight)',lineHeight:1,fontFamily:'var(--font-display)'}}>6</span>
        <p style={{margin:'6px 0 14px',fontSize:15,fontWeight:700}}>dias seguidos de atividade</p>
        <div style={{display:'flex',gap:6,justifyContent:'center'}}>
          {['S','T','Q','Q','S','S','D'].map((d,i)=><span key={i} style={{width:32,height:32,borderRadius:'var(--radius-pill)',display:'grid',placeItems:'center',fontSize:12,fontWeight:700,background:i<6?'var(--raisin-700)':'rgba(30,30,37,.15)',color:i<6?'var(--lime-500)':'rgba(30,30,37,.45)'}}>{d}</span>)}
        </div>
        <p style={{margin:'14px 0 0',fontSize:12,opacity:.75}}>Mais 1 dia e você bate seu recorde pessoal.</p>
      </Card>
      <Card padding="18px 20px">
        <SectionHeader title="Medalhas" action="Ver tudo"/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginTop:14}}>
          {CONQUISTAS.map(c=><span key={c.t} style={{textAlign:'center',opacity:c.on?1:.38}}>
            <span style={{width:56,height:56,margin:'0 auto 8px',borderRadius:'var(--radius-pill)',display:'grid',placeItems:'center',background:c.on?'var(--lime-500)':'var(--raisin-700)',border:c.on?'none':'1px dashed var(--outer-space-500)'}}>
              <Icon name={c.i} size={24} color={c.on?'var(--raisin-700)':'var(--grey-400)'}/></span>
            <span style={{display:'block',fontSize:12,fontWeight:700,lineHeight:1.3}}>{c.t}</span>
            <span style={{display:'block',fontSize:10,color:'var(--text-muted)',marginTop:2}}>{c.d}</span>
          </span>)}
        </div>
      </Card>
      <Card padding="18px 20px">
        <SectionHeader title="Próxima meta"/>
        <p style={{margin:'10px 0 12px',fontSize:14,color:'var(--text-secondary)'}}>Faltam 1.240 passos para sua meta de hoje e 3 treinos para fechar a semana.</p>
        <ProgressBar value={4} max={6} height={8}/>
      </Card>
    </Page>
  </>;
}

const AVISOS=[
  {i:'droplet',c:'var(--water-500)',t:'Hora de beber água',d:'Faltam 3 copos para a meta de hoje.',h:'14:00',novo:true},
  {i:'dumbbell',c:'var(--lime-500)',t:'Seu treino começa em 30 minutos',d:'Peito e core em casa · 45 min',h:'06:10',novo:true},
  {i:'trophy',c:'var(--warning-500)',t:'Nova conquista desbloqueada',d:'Madrugadora — 5 treinos antes das 07:00.',h:'Ontem'},
  {i:'moon',c:'var(--sleep-500)',t:'Resumo do seu sono',d:'6h42 na noite passada, 23 min abaixo da média.',h:'Ontem'}
];

function Notificacoes({go}){
  return <>
    <TopAppBar title="Notificações" onBack={()=>go('inicio')} trailing={<IconButton icon="check-check" label="Marcar todas como lidas" size={38}/>}/>
    <Page>
      <Card padding="10px 20px">
        {AVISOS.map((a,i)=><div key={a.t} style={{display:'flex',gap:12,padding:'14px 0',borderTop:i?'1px solid var(--divider)':'none'}}>
          <span style={{width:40,height:40,flexShrink:0,borderRadius:'var(--radius-pill)',background:'var(--raisin-700)',display:'grid',placeItems:'center'}}><Icon name={a.i} size={18} color={a.c}/></span>
          <span style={{flex:1,minWidth:0}}>
            <span style={{display:'flex',alignItems:'baseline',gap:8}}>
              <b style={{fontSize:14,fontWeight:700}}>{a.t}</b>
              {a.novo&&<span style={{width:6,height:6,borderRadius:'50%',background:'var(--lime-500)',flexShrink:0}}/>}
              <span style={{marginLeft:'auto',fontSize:11,color:'var(--text-muted)',whiteSpace:'nowrap'}}>{a.h}</span></span>
            <span style={{display:'block',fontSize:13,color:'var(--text-secondary)',marginTop:3,lineHeight:1.45}}>{a.d}</span>
          </span></div>)}
      </Card>
      <Card padding="18px 20px">
        <SectionHeader title="Lembretes"/>
        <div style={{display:'grid',gap:16,marginTop:14}}>
          <Switch label="Lembrete de hidratação" description="A cada 2 horas, das 08:00 às 20:00" checked/>
          <Switch label="Lembrete de treino" description="30 minutos antes do horário planejado" checked/>
          <Switch label="Resumo semanal" description="Domingo às 19:00"/>
        </div>
      </Card>
    </Page>
  </>;
}

function Perfil({go}){
  const [escuro,setEscuro]=React.useState(true);
  return <>
    <TopAppBar title="Perfil" trailing={<IconButton icon="pencil" label="Editar perfil" size={38}/>}/>
    <Page>
      <Card padding="22px 20px" style={{textAlign:'center'}}>
        <Avatar name="Mariana Alves" size={84} online style={{marginBottom:12}}/>
        <h2 style={{margin:'0 0 2px',fontSize:22,fontWeight:700}}>Mariana Alves</h2>
        <p style={{margin:'0 0 16px',fontSize:13,color:'var(--text-muted)'}}>Membro desde março de 2026 · Plano Premium</p>
        <div style={{display:'flex',borderTop:'1px solid var(--divider)',paddingTop:16}}>
          {[['68,4 kg','Peso'],['167 cm','Altura'],['32','Idade']].map(([v,k],i)=>
            <span key={k} style={{flex:1,borderLeft:i?'1px solid var(--divider)':'none'}}>
              <span style={{display:'block',fontSize:17,fontWeight:700}}>{v}</span>
              <span style={{display:'block',fontSize:11,color:'var(--text-muted)',marginTop:2}}>{k}</span></span>)}
        </div>
      </Card>

      <Card padding="4px 20px">
        {[['Meu diário','notebook-pen','historico'],['Plano de atividades','calendar-check','plano'],['Peso e medidas','scale','medidas'],['Pagamento e assinatura','credit-card',null]].map(([t,i,dest],n)=>
          <div key={t} onClick={()=>dest&&go(dest)} style={{display:'flex',alignItems:'center',gap:14,padding:'15px 0',borderTop:n?'1px solid var(--divider)':'none',cursor:'pointer'}}>
            <Icon name={i} size={19} color="var(--lime-500)"/><span style={{flex:1,fontSize:15,fontWeight:500}}>{t}</span><Icon name="chevron-right" size={17} color="var(--text-muted)"/></div>)}
      </Card>

      <Card padding="18px 20px">
        <SectionHeader title="Preferências"/>
        <div style={{display:'grid',gap:16,marginTop:14}}>
          <Switch label="Tema escuro" description="Acompanhar o sistema Android" checked={escuro} onChange={setEscuro}/>
          <Switch label="Sincronizar com Google Fit" description="Passos e frequência cardíaca" checked/>
          <Switch label="Perfil público" description="Outras pessoas podem ver suas conquistas"/>
        </div>
      </Card>

      <Card padding="4px 20px">
        {[['Privacidade e dados','shield-check'],['Idioma · Português (Brasil)','languages'],['Unidades · métrico (kg, cm, km)','ruler'],['Ajuda e suporte','life-buoy']].map(([t,i],n)=>
          <div key={t} style={{display:'flex',alignItems:'center',gap:14,padding:'15px 0',borderTop:n?'1px solid var(--divider)':'none',cursor:'pointer'}}>
            <Icon name={i} size={19} color="var(--text-secondary)"/><span style={{flex:1,fontSize:15,fontWeight:500}}>{t}</span><Icon name="chevron-right" size={17} color="var(--text-muted)"/></div>)}
      </Card>

      <Button variant="outline" block iconStart="log-out" onClick={()=>go('login')}>Sair da conta</Button>
      <p style={{textAlign:'center',fontSize:11,color:'var(--text-muted)',margin:'4px 0 0'}}>UP.PRO 2.4.0 (build 118)</p>
    </Page>
  </>;
}

function Estados({go}){
  const [caso,setCaso]=React.useState('vazio');
  const opcoes=[['vazio','Vazio'],['carregando','Carregando'],['erro','Erro'],['sucesso','Sucesso']];
  return <>
    <TopAppBar title="Estados do sistema" onBack={()=>go('perfil')}/>
    <div style={{position:'relative',minHeight:'calc(100% - 56px)'}}>
      <Page>
        <div style={{display:'flex',gap:6}}>
          {opcoes.map(([k,l])=><button key={k} type="button" onClick={()=>setCaso(k)}
            style={{flex:1,height:34,borderRadius:'var(--radius-pill)',border:'none',cursor:'pointer',background:caso===k?'var(--lime-500)':'var(--surface-card)',color:caso===k?'var(--raisin-700)':'var(--text-secondary)',fontFamily:'var(--font-ui)',fontSize:12,fontWeight:700}}>{l}</button>)}
        </div>

        {caso==='vazio'&&<Card padding="8px">
          <EmptyState icon="dumbbell" title="Nenhum treino por aqui" message="Escolha um objetivo e montamos um plano para a sua semana." actionLabel="Explorar treinos" onAction={()=>go('catalogo')}/>
        </Card>}

        {caso==='carregando'&&<Card padding="18px 20px" style={{display:'grid',gap:14}}>
          <Skeleton width="52%" height={20}/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}><Skeleton height={150} radius="var(--radius-md)"/><Skeleton height={150} radius="var(--radius-md)"/></div>
          <Skeleton height={54} radius="var(--radius-md)"/><Skeleton height={54} radius="var(--radius-md)"/>
        </Card>}

        {caso==='erro'&&<>
          <Card padding="8px"><EmptyState icon="cloud-off" title="Não foi possível carregar" message="Verifique sua conexão. Seus registros locais estão salvos e serão sincronizados depois." actionLabel="Tentar de novo"/></Card>
          <Snackbar tone="error" message="Sem conexão com a internet" actionLabel="Tentar de novo"/>
        </>}

        {caso==='sucesso'&&<Card padding="8px" style={{minHeight:260}}/>}
      </Page>
      {caso==='sucesso'&&<Dialog title="Tudo certo" message="Seu plano foi atualizado e já vale a partir de amanhã." actionLabel="Ver plano" secondaryLabel="Fechar" onAction={()=>go('plano')} onSecondary={()=>setCaso('vazio')}/>}
    </div>
  </>;
}

Object.assign(window,{Conquistas,Notificacoes,Perfil,Estados});