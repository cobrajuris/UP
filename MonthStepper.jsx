import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
export function MonthStepper({label,onPrev,onNext,style}){
  const b={background:'none',border:'none',padding:6,cursor:'pointer',display:'grid',placeItems:'center'};
  return <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:14,fontFamily:'var(--font-ui)',...style}}>
    <button type="button" aria-label="Mês anterior" onClick={onPrev} style={b}><Icon name="chevron-left" size={18} color="var(--text-secondary)"/></button>
    <span style={{fontSize:16,fontWeight:600,color:'var(--text-primary)',minWidth:140,textAlign:'center'}}>{label}</span>
    <button type="button" aria-label="Próximo mês" onClick={onNext} style={b}><Icon name="chevron-right" size={18} color="var(--text-secondary)"/></button>
  </div>;
}