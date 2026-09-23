import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
export function Snackbar({message,tone='neutral',actionLabel,onAction,style}){
  const c=tone==='success'?'var(--lime-500)':tone==='error'?'var(--danger-500)':'var(--text-secondary)';
  const ic=tone==='success'?'check-circle-2':tone==='error'?'alert-circle':'info';
  return <div role="status" style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderRadius:'var(--radius-md)',background:'var(--raisin-700)',boxShadow:'var(--shadow-raised)',fontFamily:'var(--font-ui)',...style}}>
    <Icon name={ic} size={18} color={c}/>
    <span style={{flex:1,fontSize:14,color:'var(--text-primary)'}}>{message}</span>
    {actionLabel&&<button type="button" onClick={onAction} style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-accent)',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:14}}>{actionLabel}</button>}
  </div>;
}