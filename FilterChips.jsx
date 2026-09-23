import React from 'react';
export function FilterChips({items=[],value,onChange,scroll=true,style}){
  return <div style={{display:'flex',gap:8,overflowX:scroll?'auto':'visible',paddingBottom:scroll?2:0,scrollbarWidth:'none',...style}}>
    {items.map(it=>{const key=typeof it==='string'?it:it.value;const label=typeof it==='string'?it:it.label;const on=key===value;
      return <button key={key} type="button" onClick={()=>onChange&&onChange(key)}
        style={{flexShrink:0,height:40,padding:'0 18px',borderRadius:'var(--radius-pill)',border:'none',cursor:'pointer',background:on?'var(--lime-500)':'var(--outer-space-600)',color:on?'var(--text-on-accent)':'var(--text-secondary)',fontFamily:'var(--font-ui)',fontWeight:on?700:600,fontSize:14,transition:'background var(--dur-base) var(--ease-standard)'}}>{label}</button>;
    })}
  </div>;
}