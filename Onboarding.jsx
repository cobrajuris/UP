const {Page,Photo,DS}=window;
const {Button,TextField,Icon,Card,FilterChips,ProgressBar,IconButton,TopAppBar}=DS;

const SLIDES=[
  {t:'Seu treino, do seu jeito',d:'Planos que se ajustam ao seu objetivo, ao seu tempo e ao equipamento que você tem em casa.',i:'dumbbell'},
  {t:'Tudo o que importa, em um lugar',d:'Passos, calorias, hidratação, sono e minutos ativos no mesmo resumo diário.',i:'activity'},
  {t:'Constância vale mais que intensidade',d:'Sequências, conquistas e lembretes no horário certo para você não perder o ritmo.',i:'flame'}
];

function Onboarding({go}){
  const [i,setI]=React.useState(0);const s=SLIDES[i];
  return <Page bottom={24} style={{gap:0}}>
    <Photo h={420} r="var(--radius-card)" label="FOTO DE ABERTURA" style={{marginTop:6}}>
      <span style={{position:'absolute',inset:0,background:'var(--overlay-image)'}}/>
      <span style={{position:'absolute',left:22,bottom:22,width:56,height:56,borderRadius:'var(--radius-pill)',background:'var(--lime-500)',display:'grid',placeItems:'center'}}><Icon name={s.i} size={26} color="var(--raisin-700)"/></span>
    </Photo>
    <div style={{display:'flex',gap:6,margin:'22px 0 18px'}}>
      {SLIDES.map((_,n)=><span key={n} onClick={()=>setI(n)} style={{height:4,flex:n===i?2:1,borderRadius:2,background:n===i?'var(--lime-500)':'var(--outer-space-500)',cursor:'pointer',transition:'all var(--dur-base) var(--ease-standard)'}}/>)}
    </div>
    <h1 style={{margin:0,fontSize:34,fontWeight:700,letterSpacing:'var(--ls-tight)',lineHeight:1.08}}>{s.t}</h1>
    <p style={{margin:'12px 0 0',fontSize:15,lineHeight:1.55,color:'var(--text-secondary)'}}>{s.d}</p>
    <div style={{flex:1}}/>
    <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:28}}>
      <Button size="lg" block iconEnd="arrow-right" onClick={()=>i<2?setI(i+1):go('cadastro')}>{i<2?'Continuar':'Criar minha conta'}</Button>
      <Button variant="ghost" block onClick={()=>go('login')}>Já tenho conta</Button>
    </div>
  </Page>;
}

function AuthHeader({title,sub}){
  return <div style={{padding:'34px 6px 26px'}}>
    <img src="../../assets/app-icon-uppro.png" alt="UP.PRO" style={{width:56,borderRadius:16,marginBottom:20}}/>
    <h1 style={{margin:0,fontSize:30,fontWeight:700,letterSpacing:'var(--ls-tight)'}}>{title}</h1>
    <p style={{margin:'8px 0 0',fontSize:14,color:'var(--text-secondary)',lineHeight:1.5}}>{sub}</p>
  </div>;
}

function Login({go}){
  return <Page bottom={24}>
    <AuthHeader title="Bem-vinda de volta" sub="Entre para continuar de onde você parou."/>
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <TextField label="E-mail" type="email" placeholder="mariana@email.com"/>
      <TextField label="Senha" type="password" placeholder="••••••••"/>
      <button type="button" onClick={()=>go('recuperar')} style={{alignSelf:'flex-end',background:'none',border:'none',cursor:'pointer',color:'var(--text-accent)',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:13}}>Esqueci minha senha</button>
    </div>
    <Button size="lg" block onClick={()=>go('inicio')} style={{marginTop:6}}>Entrar</Button>
    <div style={{display:'flex',alignItems:'center',gap:12,margin:'20px 0 4px'}}>
      <span style={{flex:1,height:1,background:'var(--divider)'}}/><span style={{fontSize:12,color:'var(--text-muted)'}}>ou continue com</span><span style={{flex:1,height:1,background:'var(--divider)'}}/>
    </div>
    <div style={{display:'flex',gap:8}}>
      <Button variant="outline" block iconStart="chrome">Google</Button>
      <Button variant="outline" block iconStart="smartphone">Celular</Button>
    </div>
    <div style={{flex:1}}/>
    <p style={{textAlign:'center',fontSize:13,color:'var(--text-muted)',margin:0}}>Ainda não tem conta? <a href="#" onClick={e=>{e.preventDefault();go('cadastro')}}>Criar agora</a></p>
  </Page>;
}

function Cadastro({go}){
  return <Page bottom={24}>
    <AuthHeader title="Criar sua conta" sub="Leva menos de um minuto. Depois montamos seu plano."/>
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <TextField label="Nome" placeholder="Mariana Alves"/>
      <TextField label="E-mail" type="email" placeholder="mariana@email.com"/>
      <TextField label="Senha" type="password" placeholder="Mínimo de 8 caracteres" helper="Use letras, números e ao menos um símbolo."/>
    </div>
    <p style={{fontSize:12,color:'var(--text-muted)',lineHeight:1.6,margin:'4px 0 0'}}>Ao continuar você concorda com os <a href="#" onClick={e=>e.preventDefault()}>Termos de uso</a> e com a <a href="#" onClick={e=>e.preventDefault()}>Política de privacidade</a>.</p>
    <div style={{flex:1}}/>
    <Button size="lg" block onClick={()=>go('perfilInicial')}>Criar conta</Button>
  </Page>;
}

function Recuperar({go}){
  const [enviado,setEnviado]=React.useState(false);
  return <>
    <TopAppBar title="Recuperar senha" onBack={()=>go('login')}/>
    <Page bottom={24}>
      {enviado?
        <Card padding="24px" style={{textAlign:'center',marginTop:20}}>
          <span style={{width:64,height:64,margin:'0 auto 14px',borderRadius:'var(--radius-pill)',background:'var(--lime-500)',display:'grid',placeItems:'center'}}><Icon name="mail-check" size={28} color="var(--raisin-700)"/></span>
          <h2 style={{margin:'0 0 8px',fontSize:20,fontWeight:700}}>Link enviado</h2>
          <p style={{margin:0,fontSize:14,color:'var(--text-secondary)',lineHeight:1.5}}>Enviamos as instruções para mar***@email.com. O link vale por 30 minutos.</p>
        </Card>
        :<>
        <p style={{fontSize:14,color:'var(--text-secondary)',lineHeight:1.55,margin:'14px 0 20px'}}>Informe o e-mail da sua conta. Enviaremos um link para você criar uma nova senha.</p>
        <TextField label="E-mail" type="email" placeholder="mariana@email.com"/>
        </>}
      <div style={{flex:1}}/>
      <Button size="lg" block onClick={()=>enviado?go('login'):setEnviado(true)}>{enviado?'Voltar para entrar':'Enviar link'}</Button>
    </Page>
  </>;
}

const PASSOS=[
  {k:'objetivo',t:'Qual é o seu objetivo?',o:['Perder peso','Ganhar massa','Manter a forma','Ganhar condicionamento']},
  {k:'nivel',t:'Como está seu nível hoje?',o:['Sedentária','Levemente ativa','Ativa','Muito ativa']}
];

function PerfilInicial({go}){
  const [etapa,setEtapa]=React.useState(0);
  const [resp,setResp]=React.useState({objetivo:'Perder peso',nivel:'Levemente ativa'});
  const total=3;
  return <>
    <TopAppBar title={'Etapa '+(etapa+1)+' de '+total} onBack={()=>etapa?setEtapa(etapa-1):go('cadastro')}/>
    <Page bottom={24}>
      <ProgressBar value={etapa+1} max={total} height={4}/>
      {etapa<2?<>
        <h1 style={{margin:'24px 0 6px',fontSize:27,fontWeight:700,letterSpacing:'var(--ls-tight)'}}>{PASSOS[etapa].t}</h1>
        <p style={{margin:'0 0 20px',fontSize:14,color:'var(--text-secondary)'}}>Você pode mudar isso depois nas configurações.</p>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {PASSOS[etapa].o.map(op=>{const on=resp[PASSOS[etapa].k]===op;
            return <button key={op} type="button" onClick={()=>setResp({...resp,[PASSOS[etapa].k]:op})}
              style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 22px',borderRadius:'var(--radius-lg)',border:on?'1px solid var(--lime-500)':'1px solid transparent',background:on?'rgba(213,255,95,.10)':'var(--surface-card)',color:'var(--text-primary)',cursor:'pointer',fontFamily:'var(--font-ui)',fontSize:16,fontWeight:on?700:500}}>
              {op}{on&&<Icon name="check" size={18} color="var(--lime-500)"/>}</button>;})}
        </div>
      </>:<>
        <h1 style={{margin:'24px 0 6px',fontSize:27,fontWeight:700,letterSpacing:'var(--ls-tight)'}}>Seus dados</h1>
        <p style={{margin:'0 0 20px',fontSize:14,color:'var(--text-secondary)'}}>Usamos isso para calcular metas e calorias.</p>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <TextField label="Idade" type="number" value="32" helper="anos"/>
          <TextField label="Peso" type="number" value="68,4" helper="kg"/>
          <TextField label="Altura" type="number" value="167" helper="cm"/>
        </div>
      </>}
      <div style={{flex:1}}/>
      <Button size="lg" block iconEnd="arrow-right" onClick={()=>etapa<2?setEtapa(etapa+1):go('inicio')} style={{marginTop:24}}>{etapa<2?'Continuar':'Montar meu plano'}</Button>
    </Page>
  </>;
}

Object.assign(window,{Onboarding,Login,Cadastro,Recuperar,PerfilInicial,AuthHeader});