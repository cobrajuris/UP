import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
export function Fab({icon='plus',label='Registrar atividade',size=56,onClick,style}){
  return <button type="button" aria-label={label} onClick={onClick}
    style={{width:size,height:size,borderRadius:'var(--radius-pill)',border:'none',background:'var(--lime-500)',color:'var(--text-on-accent)',display:'inline-flex',alignItems:'center',justifyContent:'center',boxShadow:'var(--shadow-accent)',cursor:'pointer',transition:'transform var(--dur-fast) var(--ease-standard)',...style}}
    onMouseDown={e=>{e.currentTarget.style.transform='scale(var(--press-scale))'}} onMouseUp={e=>{e.currentTarget.style.transform='none'}} onMouseLeave={e=>{e.currentTarget.style.transform='none'}}>
    <Icon name={icon} size={Math.round(size*0.42)}/>
  </button>;
}