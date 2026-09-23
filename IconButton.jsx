import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
const V={solid:{bg:'var(--raisin-700)',fg:'var(--text-primary)'},accent:{bg:'var(--lime-500)',fg:'var(--text-on-accent)'},glass:{bg:'rgba(14,14,17,.5)',fg:'var(--white-050)'},ghost:{bg:'transparent',fg:'var(--text-secondary)'}};
export function IconButton({icon,label,variant='solid',size=44,active=false,onClick,style,...rest}){
  const v=active?V.accent:(V[variant]||V.solid);
  return <button type="button" aria-label={label} onClick={onClick} {...rest}
    style={{width:size,height:size,display:'inline-flex',alignItems:'center',justifyContent:'center',background:v.bg,color:v.fg,border:'none',borderRadius:'var(--radius-pill)',cursor:'pointer',backdropFilter:variant==='glass'?'var(--blur-scrim)':'none',transition:'transform var(--dur-fast) var(--ease-standard)',...style}}
    onMouseDown={e=>{e.currentTarget.style.transform='scale(var(--press-scale))'}} onMouseUp={e=>{e.currentTarget.style.transform='none'}} onMouseLeave={e=>{e.currentTarget.style.transform='none'}}>
    <Icon name={icon} size={Math.round(size*0.45)}/>
  </button>;
}