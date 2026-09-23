import React from 'react';
const L={facil:{n:1,t:'Fácil'},medio:{n:2,t:'Médio'},dificil:{n:3,t:'Difícil'}};
export function DifficultyMeter({level='facil',showLabel=true,color='var(--white-050)',style}){
  const d=L[level]||L.facil;
  return <span style={{display:'inline-flex',alignItems:'baseline',gap:6,fontFamily:'var(--font-ui)',color,...style}}>
    <span style={{display:'inline-flex',alignItems:'baseline',gap:1}}>
      {[0,1,2].map(i=><span key={i} style={{fontSize:9+i*4,fontWeight:700,lineHeight:1,opacity:i<d.n?1:.3}}>A</span>)}
    </span>
    {showLabel&&<span style={{fontSize:13,fontWeight:600}}>{d.t}</span>}
  </span>;
}