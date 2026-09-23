const {Page,Photo,DS}=window;
const {Card,SectionHeader,FilterChips,ToolbarActions,WorkoutCard,TopAppBar,IconButton,Icon,Badge,Button,DifficultyMeter,ProfessionalRow,RatingSummary,ReviewCard,ExerciseRow,ProgressBar,Dialog,EmptyState}=DS;

const TREINOS=[
  {t:'Peito em casa (sem equipamento)',d:'45 min',l:'dificil'},
  {t:'Pernas completo sem peso',d:'45 min',l:'medio'},
  {t:'Força total do corpo',d:'55 min',l:'dificil'},
  {t:'Ombros definidos em casa',d:'15 min',l:'facil'},
  {t:'Dança cardio latina',d:'30 min',l:'facil'},
  {t:'HIIT sem equipamento',d:'35 min',l:'dificil'}
];

function Catalogo({go}){
  const [aba,setAba]=React.useState('Treinos');
  const [salvos,setSalvos]=React.useState({0:true});
  return <>
    <TopAppBar title="Explorar" trailing={<IconButton icon="bookmark" label="Salvos" size={38}/>}/>
    <Page>
      <FilterChips items={['Treinos','Planos','Exercícios','Profissionais','Nutrição']} value={aba} onChange={setAba}/>
      <ToolbarActions active="Filtros"/>
      {aba==='Profissionais'?
        <div style={{display:'grid',gap:'var(--stack-gap)'}}>
          <ProfessionalRow name="Rafael Nunes" specialty="Treino de alta intensidade" experience="7 anos de experiência" rating={4.6} onClick={()=>go('treino')}/>
          <ProfessionalRow name="Camila Souza" specialty="Funcional e mobilidade" experience="5 anos de experiência" rating={4.8}/>
          <ProfessionalRow name="Bruno Tavares" specialty="Força e hipertrofia" experience="9 anos de experiência" rating={4.2}/>
          <ProfessionalRow name="Letícia Prado" specialty="Nutrição esportiva" experience="6 anos de experiência" rating={4.9}/>
        </div>
      : aba==='Nutrição'?
        <EmptyState icon="salad" title="Seu diário está vazio hoje" message="Registre a primeira refeição e acompanhamos as calorias e os macros do seu dia." actionLabel="Registrar refeição"/>
      :
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-2)'}}>
          {TREINOS.map((w,i)=><WorkoutCard key={w.t} title={w.t} duration={w.d} level={w.l} saved={!!salvos[i]}
            onSave={()=>setSalvos({...salvos,[i]:!salvos[i]})} onClick={()=>go('treino')}/>)}
        </div>}
    </Page>
  </>;
}

function DetalheTreino({go}){
  return <Page pad={false} bottom={0} style={{gap:0}}>
    <Photo h={280} r="0 0 var(--radius-card) var(--radius-card)" label="FOTO DO TREINO">
      <span style={{position:'absolute',inset:0,background:'var(--overlay-image)'}}/>
      <span style={{position:'absolute',top:12,left:12}}><IconButton icon="arrow-left" label="Voltar" size={38} variant="glass" onClick={()=>go('catalogo')}/></span>
      <span style={{position:'absolute',top:12,right:12}}><IconButton icon="bookmark" label="Salvar" size={38} variant="glass"/></span>
      <span style={{position:'absolute',left:18,right:18,bottom:18}}>
        <h1 style={{margin:'0 0 10px',fontSize:24,fontWeight:700,lineHeight:1.2}}>Peito e core em casa<br/>(sem equipamento)</h1>
        <span style={{display:'flex',gap:8}}><Badge tone="glass" icon="play">45 min</Badge><Badge tone="glass" icon="flame">381 kcal</Badge></span>
      </span>
    </Photo>

    <div style={{padding:'var(--section-gap) var(--screen-margin) 0',display:'grid',gap:'var(--section-gap)'}}>
      <Card padding="18px 20px">
        <h3 style={{margin:'0 0 8px',fontSize:18,fontWeight:700}}>Sobre</h3>
        <p style={{margin:0,fontSize:13,lineHeight:1.6,color:'var(--text-secondary)'}}>Fortalecer o peito não precisa ser complicado. São 8 exercícios com o peso do corpo que dão um resultado excelente em casa, sem nenhum equipamento.</p>
        <div style={{display:'flex',marginTop:16,borderTop:'1px solid var(--divider)',paddingTop:14}}>
          {[['Nível',<DifficultyMeter key="d" level="dificil" color="var(--lime-500)"/>],['Progresso','0 %'],['Foco','Peito']].map(([k,v],i)=>
            <span key={k} style={{flex:1,textAlign:'center',borderLeft:i?'1px solid var(--divider)':'none'}}>
              <span style={{display:'block',fontSize:11,color:'var(--text-muted)',marginBottom:4}}>{k}</span>
              <span style={{display:'block',fontSize:14,fontWeight:700,color:'var(--text-primary)'}}>{v}</span></span>)}
        </div>
      </Card>

      <Card padding="4px 20px">
        {[['Som e música','volume-2'],['Guia em vídeo','play-circle'],['Equipamentos · nenhum','dumbbell']].map(([t,ic],i)=>
          <div key={t} style={{display:'flex',alignItems:'center',gap:12,padding:'15px 0',borderTop:i?'1px solid var(--divider)':'none',cursor:'pointer'}}>
            <Icon name={ic} size={18} color="var(--text-secondary)"/>
            <span style={{flex:1,fontSize:16,fontWeight:500}}>{t}</span>
            <Icon name="chevron-right" size={18} color="var(--text-muted)"/></div>)}
      </Card>

      <Card padding="18px 20px">
        <SectionHeader title="Profissional"/>
        <ProfessionalRow name="Rafael Nunes" specialty="Treino de alta intensidade" experience="7 anos de experiência" rating={4.6} style={{background:'var(--raisin-700)',marginTop:12}}/>
      </Card>

      <Card padding="18px 20px">
        <RatingSummary score={4.6} total={174} distribution={[2,3,9,38,122]}/>
        <SectionHeader title="" action="Ver tudo" style={{marginTop:6}}/>
        <ReviewCard author="Camila Souza" rating={4.8} when="há 3 dias" text="Fiz o treino inteiro na sala de casa. As instruções são claras e o ritmo é intenso na medida certa — terminei suada e sem dor nas costas." style={{marginTop:6}}/>
      </Card>

      <Card padding="18px 20px">
        <SectionHeader title="Exercícios"/>
        <p style={{margin:'2px 0 8px',fontSize:11,letterSpacing:'var(--ls-caps)',color:'var(--text-muted)'}}>8 EXERCÍCIOS · 3 SÉRIES</p>
        <ExerciseRow index={1} name="Flexão de braço" detail="20 repetições"/>
        <ExerciseRow index={2} name="Prancha com apoio" detail="40 segundos"/>
        <ExerciseRow index={3} name="Flexão em círculo" detail="8 repetições para cada lado"/>
      </Card>
    </div>

    <div style={{position:'sticky',bottom:0,padding:'14px var(--screen-margin) 22px',marginTop:'var(--section-gap)',background:'linear-gradient(180deg,rgba(23,23,27,0),var(--bg-app) 40%)'}}>
      <Button size="lg" block onClick={()=>go('execucao')}>Começar treino</Button>
    </div>
  </Page>;
}

function Execucao({go}){
  const [pausado,setPausado]=React.useState(false);
  return <Page pad={false} bottom={0} style={{gap:0,height:'100%'}}>
    <Photo h={520} r="0 0 var(--radius-card) var(--radius-card)" label="EXERCÍCIO EM VÍDEO">
      <span style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(14,14,17,.55) 0%,rgba(14,14,17,0) 30%,rgba(14,14,17,.85) 100%)'}}/>
      <span style={{position:'absolute',top:12,left:12}}><IconButton icon="x" label="Sair do treino" size={38} variant="glass" onClick={()=>go('treino')}/></span>
      <span style={{position:'absolute',top:16,right:16,fontFamily:'var(--font-ui)',fontSize:13,fontWeight:700,color:'var(--white-050)'}}>Exercício 3 de 8</span>
      <span style={{position:'absolute',inset:0,display:'grid',placeItems:'center'}}>
        <span style={{fontFamily:'var(--font-display)',fontSize:120,fontWeight:600,color:'var(--lime-500)',lineHeight:1,textShadow:'0 0 60px rgba(213,255,95,.35)'}}>00:42</span>
      </span>
      <span style={{position:'absolute',left:18,right:18,bottom:22}}>
        <h2 style={{margin:'0 0 4px',fontSize:24,fontWeight:700}}>Flexão em círculo</h2>
        <p style={{margin:0,fontSize:13,color:'var(--grey-200)'}}>8 repetições para cada lado · mantenha o core firme</p>
        <ProgressBar value={3} max={8} height={5} style={{marginTop:14}}/>
      </span>
    </Photo>

    <div style={{padding:'18px var(--screen-margin) 0',display:'grid',gap:'var(--section-gap)'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10}}>
        <Button variant="secondary" iconStart="arrow-left" onClick={()=>go('treino')}>Anterior</Button>
        <IconButton icon={pausado?'play':'pause'} label={pausado?'Retomar':'Pausar'} size={62} variant="accent" onClick={()=>setPausado(!pausado)}/>
        <Button iconEnd="arrow-right" onClick={()=>go('concluido')}>Próximo</Button>
      </div>
      <Card padding="16px 20px">
        <SectionHeader title="A seguir"/>
        <ExerciseRow index={4} name="Prancha lateral" detail="30 segundos de cada lado" style={{marginTop:6}}/>
        <ExerciseRow index={5} name="Flexão diamante" detail="12 repetições"/>
      </Card>
    </div>
  </Page>;
}

function Concluido({go}){
  return <div style={{position:'relative',minHeight:'100%',background:'var(--lime-500)',display:'flex',flexDirection:'column',padding:'0 var(--screen-margin) 30px'}}>
    <div style={{flex:1,display:'grid',placeItems:'center',textAlign:'center',color:'var(--raisin-700)',fontFamily:'var(--font-ui)'}}>
      <div>
        <span style={{width:120,height:120,margin:'0 auto 26px',borderRadius:'var(--radius-pill)',background:'var(--raisin-700)',display:'grid',placeItems:'center',boxShadow:'0 0 0 16px rgba(30,30,37,.10)'}}>
          <Icon name="check" size={56} color="var(--lime-500)"/></span>
        <h1 style={{margin:'0 0 10px',fontSize:34,fontWeight:700,letterSpacing:'var(--ls-tight)'}}>Treino concluído</h1>
        <p style={{margin:'0 0 26px',fontSize:15,lineHeight:1.5,opacity:.8}}>Você queimou 381 kcal em 45 minutos.<br/>É a sua sexta sessão seguida.</p>
        <div style={{display:'flex',gap:10,justifyContent:'center'}}>
          {[['381','kcal'],['45','min'],['8','exercícios']].map(([v,u])=><span key={u} style={{background:'rgba(30,30,37,.10)',borderRadius:'var(--radius-md)',padding:'12px 18px'}}>
            <span style={{display:'block',fontSize:22,fontWeight:700}}>{v}</span>
            <span style={{display:'block',fontSize:11,opacity:.7}}>{u}</span></span>)}
        </div>
      </div>
    </div>
    <div style={{display:'grid',gap:8}}>
      <Button variant="secondary" size="lg" block onClick={()=>go('estatisticas')}>Ver resumo</Button>
      <Button variant="ghost" block onClick={()=>go('inicio')} style={{color:'var(--raisin-700)'}}>Voltar ao início</Button>
    </div>
  </div>;
}

Object.assign(window,{Catalogo,DetalheTreino,Execucao,Concluido});