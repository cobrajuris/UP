import React from 'react';
export function RatingSummary({score=0,total=0,distribution=[0,0,0,0,0],style}){
  const max=Math.max(1,...distribution);
  return <div style={{display:'flex',gap:18,alignItems:'center',fontFamily:'var(--font-ui)',...style}}>
    <div style={{display:'flex',flexDirection:'column'}}>
      <span style={{fontSize:40,fontWeight:700,letterSpacing:'var(--ls-tight)',color:'var(--text-primary)',lineHeight:1}}>{String(score).replace('.',',')}</span>
      <span style={{fontSize:12,color:'var(--text-muted)',marginTop:4}}>{total} avaliações</span>
    </div>
    <div style={{flex:1,display:'flex',flexDirection:'column',gap:4}}>
      {[5,4,3,2,1].map((n,i)=><span key={n} style={{display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:11,color:'var(--text-muted)',width:8}}>{n}</span>
        <span style={{flex:1,height:3,borderRadius:2,background:'var(--outer-space-500)',overflow:'hidden'}}>
          <span style={{display:'block',height:'100%',width:((distribution[4-i]||0)/max*100)+'%',background:'var(--white-050)'}}/>
        </span></span>)}
    </div>
  </div>;
}