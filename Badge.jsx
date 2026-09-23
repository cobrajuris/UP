import React from 'react';
import {Icon} from './Icon.jsx';
const TONES={accent:{bg:'var(--lime-500)',fg:'var(--text-on-accent)'},solid:{bg:'var(--raisin-700)',fg:'var(--text-primary)'},outline:{bg:'transparent',fg:'var(--text-secondary)',bd:'1px solid var(--border-strong)'},glass:{bg:'rgba(14,14,17,.55)',fg:'var(--white-050)'},danger:{bg:'var(--danger-500)',fg:'var(--raisin-700)'}};
export function Badge({children,tone='solid',icon,size='md',style}){
  const t=TONES[tone]||TONES.solid;const sm=size==='sm';
  return <span style={{display:'inline-flex',alignItems:'center',gap:5,background:t.bg,color:t.fg,border:t.bd||'none',borderRadius:'var(--radius-pill)',padding:sm?'3px 8px':'6px 12px',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:sm?11:13,lineHeight:1.2,whiteSpace:'nowrap',...style}}>
    {icon&&<Icon name={icon} size={sm?12:14}/>}{children}
  </span>;
}