import React from 'react';
export function DataRow({label,value,unit,style}){
  return <div style={{display:'flex',alignItems:'baseline',gap:8,fontFamily:'var(--font-ui)',fontSize:13,...style}}>
    <span style={{color:'var(--text-secondary)',whiteSpace:'nowrap'}}>{label}</span>
    <span style={{flex:1,borderBottom:'1px dotted var(--border-strong)',transform:'translateY(-3px)'}}/>
    <span style={{whiteSpace:'nowrap'}}><b style={{color:'var(--text-primary)',fontSize:15,fontWeight:700}}>{value}</b>{unit&&<span style={{color:'var(--text-muted)',marginLeft:4}}>{unit}</span>}</span>
  </div>;
}