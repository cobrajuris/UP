import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
import {Button} from '../actions/Button.jsx';
export function EmptyState({icon='inbox',title,message,actionLabel,onAction,style}){
  return <div style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:10,padding:'36px 24px',fontFamily:'var(--font-ui)',...style}}>
    <span style={{width:64,height:64,borderRadius:'var(--radius-pill)',background:'var(--outer-space-600)',display:'grid',placeItems:'center',marginBottom:4}}><Icon name={icon} size={28} color="var(--grey-400)"/></span>
    <h4 style={{margin:0,fontSize:18,fontWeight:700,color:'var(--text-primary)'}}>{title}</h4>
    {message&&<p style={{margin:0,maxWidth:280,fontSize:14,lineHeight:1.5,color:'var(--text-muted)'}}>{message}</p>}
    {actionLabel&&<Button size="sm" onClick={onAction} style={{marginTop:8}}>{actionLabel}</Button>}
  </div>;
}