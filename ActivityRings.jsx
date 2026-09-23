import React from 'react';
export function ActivityRings({rings=[],size=140,thickness=12,gap=6,style}){
  const cx=size/2;
  return <svg width={size} height={size} viewBox={'0 0 '+size+' '+size} style={{display:'block',...style}} role="img" aria-label="Anéis de atividade">
    <defs><linearGradient id="upproRing" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#d5ff5f"/><stop offset="100%" stopColor="#7c9a2e"/></linearGradient></defs>
    {rings.map((r,i)=>{
      const rad=cx-thickness/2-i*(thickness+gap);
      const c=2*Math.PI*rad;const pct=Math.max(0,Math.min(1,(r.value||0)/(r.max||1)));
      return <g key={i} transform={'rotate(-90 '+cx+' '+cx+')'}>
        <circle cx={cx} cy={cx} r={rad} fill="none" stroke="var(--outer-space-500)" strokeWidth={thickness}/>
        <circle cx={cx} cy={cx} r={rad} fill="none" stroke={r.color||'url(#upproRing)'} strokeWidth={thickness} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c*(1-pct)} style={{transition:'stroke-dashoffset var(--dur-ring) var(--ease-emphasized)'}}/>
      </g>;})}
  </svg>;
}