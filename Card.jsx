import React from 'react';
export function Card({children,padding='var(--card-padding)',tone='default',radius='var(--radius-card)',style,...rest}){
  const bg=tone==='accent'?'var(--lime-500)':tone==='flat'?'var(--raisin-700)':'var(--surface-card)';
  const fg=tone==='accent'?'var(--text-on-accent)':'var(--text-primary)';
  return <section {...rest} style={{background:bg,color:fg,borderRadius:radius,padding,boxShadow:'var(--shadow-card)',...style}}>{children}</section>;
}