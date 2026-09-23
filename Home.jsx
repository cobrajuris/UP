const {Page,Photo,DS}=window;
const {Card,SectionHeader,ActivityRings,MetricStat,ProgressBar,ListRow,Avatar,IconButton,Icon,Badge,TopAppBar,Button,DataRow}=DS;

function Inicio({go}){
  return <Page>
    <header style={{display:'flex',alignItems:'center',gap:12,padding:'14px 4px 6px'}}>
      <Avatar name="Mariana Alves" size={46} online/>
      <span style={{flex:1}}>
        <span style={{display:'block',fontSize:22,fontWeight:700,letterSpacing:'var(--ls-tight)'}}>Bom dia, Mariana</span>
        <span style={{display:'block',fontSize:13,color:'var(--text-secondary)'}}>Domingo, 14/09/2026</span>
      </span>
      <IconButton icon="bell" label="Notificações" onClick={()=>go('notificacoes')}/>
      <IconButton icon="trophy" label="Conquistas" onClick={()=>go('conquistas')}/>
    </header>

    <Card padding="18px 20px" onClick={()=>go('metas')} style={{cursor:'pointer'}}>
      <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:10}}>
        <span style={{fontSize:15,fontWeight:600,color:'var(--text-secondary)'}}>Passos</span>
        <span style={{fontSize:13,fontWeight:700,color:'var(--text-accent)'}}>Faltam 5.000</span>
      </div>
      <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:16}}>
        <span style={{fontSize:30,fontWeight:700,letterSpacing:'var(--ls-tight)'}}>11.000<span style={{fontSize:14,fontWeight:500,color:'var(--text-muted)'}}> / 16.000</span></span>
      </div>
      <ProgressBar value={11000} max={16000} showPercent style={{marginTop:10}}/>
    </Card>

    <Card padding="18px 20px">
      <SectionHeader title="Seu progresso de hoje" action="Ver tudo" onAction={()=>go('metas')}/>
      <div style={{display:'flex',alignItems:'center',gap:14,marginTop:14}}>
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:10}}>
          <MetricStat icon="footprints" label="Passos" value="11.000" goal="16.000"/>
          <MetricStat icon="flame" label="Calorias" value="440" goal="680" unit="kcal" color="var(--calories-500)"/>
          <MetricStat icon="droplet" label="Água" value="1,8" goal="2,5" unit="L" color="var(--water-500)"/>
        </div>
        <ActivityRings size={132} rings={[{value:11000,max:16000},{value:440,max:680,color:'var(--calories-500)'},{value:1.8,max:2.5,color:'var(--water-500)'}]}/>
      </div>
    </Card>

    <Card padding="18px 20px" tone="accent" onClick={()=>go('treino')} style={{cursor:'pointer'}}>
      <div style={{display:'flex',alignItems:'center',gap:14}}>
        <span style={{width:48,height:48,borderRadius:'var(--radius-pill)',background:'var(--raisin-700)',display:'grid',placeItems:'center',flexShrink:0}}><Icon name="play" size={20} color="var(--lime-500)"/></span>
        <span style={{flex:1}}>
          <span style={{display:'block',fontSize:12,fontWeight:700,opacity:.65}}>TREINO DE HOJE · 45 MIN</span>
          <span style={{display:'block',fontSize:18,fontWeight:700,marginTop:2}}>Peito e core em casa</span>
        </span>
        <Icon name="chevron-right" size={22}/>
      </div>
    </Card>

    <Card padding="18px 20px">
      <SectionHeader title="Atividades" action="Ver tudo" onAction={()=>go('historico')}/>
      <div style={{display:'grid',gap:'var(--stack-gap)',marginTop:12}}>
        <ListRow icon="footprints" title="Caminhada leve" value="2,44 km" meta="07:10"/>
        <ListRow icon="activity" title="Corrida matinal" value="3,88 km" meta="06:20"/>
        <ListRow icon="waves" title="Natação" value="1,38 km" meta="Ontem"/>
      </div>
    </Card>

    <Card padding="18px 20px">
      <SectionHeader title="Refeições de hoje" action="Ver tudo" onAction={()=>go('catalogo')}/>
      <div style={{display:'grid',gap:'var(--stack-gap)',marginTop:12}}>
        <ListRow icon="utensils" title="Torrada com abacate e ricota" value="233 kcal" meta="08:30"/>
        <ListRow icon="coffee" title="Café expresso" value="10 kcal" meta="09:15"/>
      </div>
    </Card>
  </Page>;
}

const METAS=[
  {i:'footprints',t:'Passos',v:11000,m:16000,f:'11.000',g:'16.000',c:'var(--lime-500)',n:'Faltam 5.000 passos para sua meta'},
  {i:'flame',t:'Calorias ativas',v:440,m:680,f:'440',g:'680 kcal',c:'var(--calories-500)',n:'Mais 35 minutos de caminhada fecham a meta'},
  {i:'droplet',t:'Hidratação',v:1.8,m:2.5,f:'1,8',g:'2,5 L',c:'var(--water-500)',n:'Faltam 3 copos de 250 ml'},
  {i:'moon',t:'Sono',v:6.7,m:8,f:'6h42',g:'8h00',c:'var(--sleep-500)',n:'Média da semana: 7h05'},
  {i:'timer',t:'Minutos ativos',v:48,m:60,f:'48',g:'60 min',c:'var(--lime-500)',n:'Você bateu essa meta 5 dias seguidos'}
];

function Metas({go}){
  return <>
    <TopAppBar title="Metas do dia" onBack={()=>go('inicio')} trailing={<IconButton icon="settings" label="Ajustar metas" size={38} onClick={()=>go('perfil')}/>}/>
    <Page>
      {METAS.map(m=><Card key={m.t} padding="16px 20px">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span style={{width:40,height:40,borderRadius:'var(--radius-pill)',background:'var(--raisin-700)',display:'grid',placeItems:'center',flexShrink:0}}><Icon name={m.i} size={19} color={m.c}/></span>
          <span style={{flex:1,fontSize:15,fontWeight:600}}>{m.t}</span>
          <span style={{fontSize:20,fontWeight:700,color:m.c}}>{m.f}<span style={{fontSize:12,fontWeight:500,color:'var(--text-muted)'}}> / {m.g}</span></span>
        </div>
        <ProgressBar value={m.v} max={m.m} color={m.c} height={8} style={{marginTop:12}}/>
        <p style={{margin:'10px 0 0',fontSize:12,color:'var(--text-muted)'}}>{m.n}</p>
      </Card>)}
      <Card padding="18px 20px">
        <SectionHeader title="Resumo da semana"/>
        <div style={{display:'grid',gap:8,marginTop:12}}>
          <DataRow label="Distância total" value="21,4" unit="km"/>
          <DataRow label="Calorias queimadas" value="3.120" unit="kcal"/>
          <DataRow label="Tempo em atividade" value="4h35" unit=""/>
          <DataRow label="Média de sono" value="7h05" unit=""/>
        </div>
      </Card>
      <Button variant="secondary" block onClick={()=>go('estatisticas')}>Ver estatísticas</Button>
    </Page>
  </>;
}

Object.assign(window,{Inicio,Metas});