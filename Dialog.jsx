import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
import {Button} from '../actions/Button.jsx';
const TONE={success:{icon:'check',bg:'var(--lime-500)'},error:{icon:'x',bg:'var(--danger-500)'},info:{icon:'info',bg:'var(--lime-500)'}};
export function Dialog({open=true,tone='success',title,message,actionLabel='Fechar',onAction,secondaryLabel,onSecondary,style}){
  if(!open)return null;const t=TONE[tone]||TONE.success;
  return <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',background:'var(--scrim)',backdropFilter:'var(--blur-scrim)',padding:20,zIndex:50}}>
    <div style={{width:'100%',maxWidth:320,background:t.bg,borderRadius:'var(--radius-card)',padding:'32px 24px 24px',textAlign:'center',fontFamily:'var(--font-ui)',color:'var(--raisin-700)',...style}}>
      <span style={{width:96,height:96,margin:'0 auto 20px',borderRadius:'var(--radius-pill)',background:'var(--raisin-700)',display:'grid',placeItems:'center',boxShadow:'0 0 0 12px rgba(30,30,37,.10)'}}>
        <Icon name={t.icon} size={44} color={t.bg}/></span>
      <h3 style={{margin:'0 0 8px',fontSize:26,fontWeight:700,letterSpacing:'var(--ls-tight)'}}>{title}</h3>
      {message&&<p style={{margin:'0 0 22px',fontSize:14,lineHeight:1.5,opacity:.8}}>{message}</p>}
      <div style={{display:'grid',gap:8}}>
        <Button variant="secondary" block onClick={onAction}>{actionLabel}</Button>
        {secondaryLabel&&<Button variant="ghost" block onClick={onSecondary} style={{color:'var(--raisin-700)'}}>{secondaryLabel}</Button>}
      </div>
    </div>
  </div>;
}