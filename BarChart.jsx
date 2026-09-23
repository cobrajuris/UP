import React from 'react';
export function BarChart({data=[],height=90,labels=[],nowIndex,barColor='var(--lime-500)',style}){
  const max=Math.max(1,...data);
  return <div style={{fontFamily:'var(--font-ui)',...style}}>
    <div style={{display:'flex',alignItems:'flex-end',gap:2,height,borderBottom:'1px dotted var(--border-strong)'}}>
      {data.map((v,i)=><span key={i} title={String(v)} style={{flex:1,height:Math.max(2,(v/max)*height)+'px',borderRadius:2,background:i===nowIndex?'var(--white-050)':barColor,opacity:v===0?.25:1,transition:'height var(--dur-slow) var(--ease-emphasized)'}}/>)}
    </div>
    {labels.length>0&&<div style={{display:'flex',justifyContent:'space-between',marginTop:6,fontSize:11,color:'var(--text-muted)'}}>{labels.map(l=><span key={l}>{l}</span>)}</div>}
  </div>;
}