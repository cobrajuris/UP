import React from 'react';
export function Switch({checked=false,label,description,onChange,disabled=false,style}){
  const t=<button type="button" role="switch" aria-checked={checked} disabled={disabled} onClick={()=>onChange&&onChange(!checked)}
    style={{width:52,height:32,flexShrink:0,borderRadius:'var(--radius-pill)',border:'none',padding:3,cursor:disabled?'not-allowed':'pointer',background:checked?'var(--lime-500)':'var(--outer-space-500)',opacity:disabled?.5:1,display:'flex',justifyContent:checked?'flex-end':'flex-start',transition:'background var(--dur-base) var(--ease-standard)'}}>
    <span style={{width:26,height:26,borderRadius:'var(--radius-pill)',background:checked?'var(--raisin-700)':'var(--grey-200)',transition:'all var(--dur-base) var(--ease-emphasized)'}}/>
  </button>;
  if(!label) return <span style={style}>{t}</span>;
  return <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,fontFamily:'var(--font-ui)',...style}}>
    <span><span style={{display:'block',fontSize:15,fontWeight:600,color:'var(--text-primary)'}}>{label}</span>
    {description&&<span style={{display:'block',fontSize:13,color:'var(--text-muted)',marginTop:2}}>{description}</span>}</span>{t}
  </div>;
}