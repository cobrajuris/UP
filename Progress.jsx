const {Page,DS}=window;
const {Card,SectionHeader,TopAppBar,IconButton,Icon,Badge,Button,DayStrip,MonthStepper,CalendarGrid,ActivityRings,MetricStat,DataRow,BarChart,ListRow,FilterChips,ProgressBar,Skeleton}=DS;

const HORAS=[0,0,0,0,1,4,9,26,42,19,10,13,31,46,21,12,28,54,39,15,7,2,0,0];
const SEMANA=[42,58,31,67,54,72,48];

function Estatisticas({go}){
  const [faixa,setFaixa]=React.useState('Semana');
  return <>
    <TopAppBar title="Estatísticas" trailing={<IconButton icon="share-2" label="Compartilhar" size={38}/>}/>
    <Page>
      <FilterChips items={['Semana','Mês','Ano']} value={faixa} onChange={setFaixa} scroll={false}/>
      <Card padding="20px">
        <div style={{display:'grid',placeItems:'center',marginBottom:16}}>
          <ActivityRings size={168} thickness={14} rings={[{value:11000,max:16000},{value:440,max:680,color:'var(--calories-500)'},{value:1.8,max:2.5,color:'var(--water-500)'}]}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid var(--divider)',paddingTop:14}}>
          <MetricStat icon="footprints" label="Passos" value="11.000" goal="16.000" align="center"/>
          <MetricStat icon="flame" label="Calorias" value="440" goal="680" color="var(--calories-500)" align="center"/>
          <MetricStat icon="droplet" label="Água" value="1,8" goal="2,5" unit="L" color="var(--water-500)" align="center"/>
        </div>
      </Card>
      <Card padding="20px">
        <SectionHeader title="Perfil do dia"/>
        <div style={{display:'grid',gap:8,margin:'12px 0 16px'}}>
          <DataRow label="Distância em atividade" value="2,44" unit="km"/>
          <DataRow label="Calorias queimadas" value="440" unit="kcal"/>
          <DataRow label="Minutos ativos" value="48" unit="min"/>
        </div>
        <BarChart data={HORAS} height={90} labels={['0','6','12','18','24 h']} nowIndex={17}/>
      </Card>
      <Card padding="20px">
        <SectionHeader title={faixa==='Semana'?'Últimos 7 dias':'Últimas 4 semanas'} action="Ver tudo" onAction={()=>go('historico')}/>
        <div style={{display:'flex',alignItems:'flex-end',gap:10,height:130,marginTop:16}}>
          {SEMANA.map((v,i)=><span key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
            <span style={{width:'100%',height:v+'%',borderRadius:8,background:i===6?'var(--lime-500)':'var(--outer-space-500)'}}/>
            <span style={{fontSize:11,color:i===6?'var(--text-primary)':'var(--text-muted)',fontWeight:i===6?700:500}}>{['S','T','Q','Q','S','S','D'][i]}</span>
          </span>)}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:16,borderTop:'1px solid var(--divider)',paddingTop:14}}>
          <MetricStat label="Média diária" value="9.840" unit="passos"/>
          <MetricStat label="Melhor dia" value="14.210" unit="passos" color="var(--text-primary)"/>
        </div>
      </Card>
    </Page>
  </>;
}

function Historico({go}){
  const semana=['2026-09-08','2026-09-09','2026-09-10','2026-09-11','2026-09-12','2026-09-13','2026-09-14'].map(d=>({date:d}));
  const [dia,setDia]=React.useState('2026-09-14');
  const [cal,setCal]=React.useState(14);
  return <>
    <TopAppBar title="Histórico" onBack={()=>go('estatisticas')}/>
    <Page>
      <DayStrip days={semana} value={dia} onChange={setDia}/>
      <Card padding="18px 20px">
        <MonthStepper label="setembro de 2026"/>
        <CalendarGrid year={2026} month={8} selected={cal} marked={[1,2,4,5,8,9,11,12,13]} onSelect={setCal} style={{marginTop:14}}/>
        <div style={{display:'flex',alignItems:'center',gap:8,marginTop:14,borderTop:'1px solid var(--divider)',paddingTop:12,fontSize:12,color:'var(--text-muted)'}}>
          <span style={{width:6,height:6,borderRadius:'50%',background:'var(--lime-500)'}}/>dia com atividade registrada · 9 de 14 dias no mês
        </div>
      </Card>
      <Card padding="18px 20px">
        <SectionHeader title="14/09/2026"/>
        <div style={{display:'grid',gap:'var(--stack-gap)',marginTop:12}}>
          <ListRow icon="dumbbell" title="Peito e core em casa" value="45 min · 381 kcal" meta="06:40"/>
          <ListRow icon="footprints" title="Caminhada leve" value="2,44 km" meta="07:10"/>
          <ListRow icon="utensils" title="Almoço registrado" value="612 kcal" meta="12:30"/>
          <ListRow icon="moon" title="Sono" value="6h42" meta="23:15"/>
        </div>
      </Card>
    </Page>
  </>;
}

function Medidas({go}){
  const pontos=[70.2,69.8,69.5,69.1,68.9,68.6,68.4];
  const min=Math.min(...pontos),max=Math.max(...pontos);
  const d=pontos.map((p,i)=>((i/(pontos.length-1))*320).toFixed(1)+','+(90-((p-min)/(max-min))*80).toFixed(1)).join(' ');
  return <>
    <TopAppBar title="Peso e medidas" onBack={()=>go('estatisticas')} trailing={<IconButton icon="plus" label="Registrar medida" size={38}/>}/>
    <Page>
      <Card padding="20px">
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:6}}>
          <span><span style={{display:'block',fontSize:13,color:'var(--text-secondary)'}}>Peso atual</span>
          <span style={{fontSize:38,fontWeight:700,letterSpacing:'var(--ls-tight)'}}>68,4<span style={{fontSize:16,fontWeight:500,color:'var(--text-muted)'}}> kg</span></span></span>
          <Badge tone="accent" icon="trending-down">−1,8 kg em 7 semanas</Badge>
        </div>
        <svg viewBox="0 0 320 100" style={{width:'100%',height:100,marginTop:10,overflow:'visible'}}>
          <polyline points={d} fill="none" stroke="var(--lime-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="320" cy={90-((pontos[6]-min)/(max-min))*80} r="5" fill="var(--lime-500)"/>
        </svg>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--text-muted)',marginTop:6}}>
          <span>28/07</span><span>11/08</span><span>25/08</span><span>14/09</span>
        </div>
      </Card>
      <Card padding="18px 20px">
        <SectionHeader title="Medidas corporais" action="Atualizar"/>
        <div style={{display:'grid',gap:8,marginTop:12}}>
          <DataRow label="Altura" value="167" unit="cm"/>
          <DataRow label="Cintura" value="72" unit="cm"/>
          <DataRow label="Quadril" value="96" unit="cm"/>
          <DataRow label="Braço" value="28" unit="cm"/>
          <DataRow label="IMC" value="24,5" unit=""/>
        </div>
      </Card>
      <Card padding="18px 20px">
        <SectionHeader title="Registros recentes"/>
        <div style={{display:'grid',gap:'var(--stack-gap)',marginTop:12}}>
          <ListRow icon="scale" title="Peso" value="68,4 kg" meta="14/09"/>
          <ListRow icon="ruler" title="Cintura" value="72 cm" meta="07/09"/>
          <ListRow icon="camera" title="Foto de progresso" value="Semana 7" meta="07/09"/>
        </div>
      </Card>
    </Page>
  </>;
}

const PLANO=[
  {d:'Segunda',t:'Força total do corpo',m:'55 min',s:'feito'},
  {d:'Terça',t:'Mobilidade e alongamento',m:'20 min',s:'feito'},
  {d:'Quarta',t:'HIIT sem equipamento',m:'35 min',s:'feito'},
  {d:'Quinta',t:'Descanso ativo · caminhada',m:'30 min',s:'feito'},
  {d:'Sexta',t:'Peito e core em casa',m:'45 min',s:'hoje'},
  {d:'Sábado',t:'Pernas completo sem peso',m:'45 min',s:'pendente'},
  {d:'Domingo',t:'Descanso',m:'—',s:'pendente'}
];

function Plano({go}){
  return <>
    <TopAppBar title="Seu plano da semana" onBack={()=>go('inicio')} trailing={<IconButton icon="settings-2" label="Ajustar plano" size={38}/>}/>
    <Page>
      <Card padding="20px" tone="accent">
        <span style={{fontSize:12,fontWeight:700,opacity:.65,letterSpacing:'var(--ls-caps)'}}>SEMANA 7 DE 12</span>
        <h2 style={{margin:'6px 0 12px',fontSize:24,fontWeight:700,letterSpacing:'var(--ls-tight)'}}>Perder peso com constância</h2>
        <ProgressBar value={4} max={6} height={8} color="var(--raisin-700)"/>
        <p style={{margin:'10px 0 0',fontSize:13,opacity:.8}}>4 de 6 treinos concluídos. Você está perto de alcançar sua meta.</p>
      </Card>
      <Card padding="10px 20px">
        {PLANO.map((p,i)=>{const hoje=p.s==='hoje',feito=p.s==='feito';
          return <div key={p.d} onClick={()=>hoje&&go('treino')} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 0',borderTop:i?'1px solid var(--divider)':'none',cursor:hoje?'pointer':'default',opacity:p.t==='Descanso'?.6:1}}>
            <span style={{width:36,height:36,borderRadius:'var(--radius-pill)',flexShrink:0,display:'grid',placeItems:'center',background:feito?'var(--lime-500)':hoje?'transparent':'var(--raisin-700)',border:hoje?'1px solid var(--lime-500)':'none'}}>
              <Icon name={feito?'check':hoje?'play':'circle'} size={16} color={feito?'var(--raisin-700)':hoje?'var(--lime-500)':'var(--grey-400)'}/></span>
            <span style={{flex:1,minWidth:0}}>
              <span style={{display:'block',fontSize:11,letterSpacing:'var(--ls-caps)',color:hoje?'var(--lime-500)':'var(--text-muted)'}}>{p.d.toUpperCase()}{hoje?' · HOJE':''}</span>
              <span style={{display:'block',fontSize:15,fontWeight:600,marginTop:2,textDecoration:feito?'none':'none',color:feito?'var(--text-secondary)':'var(--text-primary)'}}>{p.t}</span></span>
            <span style={{fontSize:12,color:'var(--text-muted)'}}>{p.m}</span>
          </div>;})}
      </Card>
      <Button size="lg" block onClick={()=>go('treino')}>Continuar treino</Button>
    </Page>
  </>;
}

Object.assign(window,{Estatisticas,Historico,Medidas,Plano});