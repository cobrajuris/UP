import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
export function PlanOption({price,note,highlight,selected=false,onClick,style}){
  return <button type="button" onClick={onClick} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,textAlign:'left',padding:'14px 22px',borderRadius:'var(--radius-shell)',border:'none',cursor:'pointer',background:selected?'var(--lime-500)':'var(--raisin-700)',color:selected?'var(--text-on-accent)':'var(--text-primary)',fontFamily:'var(--font-ui)',...style}}>
    <span><span style={{display:'block',fontSize:18,fontWeight:700}}>{price}</span>
    {note&&<span style={{display:'block',fontSize:12,opacity:.75,marginTop:2}}>{note}</span>}</span>
    <span style={{display:'inline-flex',alignItems:'center',gap:8}}>
      {highlight&&<span style={{fontSize:13,fontWeight:700}}>{highlight}</span>}
      <Icon name="chevron-right" size={18}/>
    </span>
  </button>;
}