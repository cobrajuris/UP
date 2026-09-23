import React from 'react';
export function TimeSlots({slots=[],value,onChange,disabledSlots=[],style}){
  return <div style={{display:'flex',flexWrap:'wrap',gap:8,...style}}>
    {slots.map(s=>{const on=s===value,off=disabledSlots.includes(s);
      return <button key={s} type="button" disabled={off} onClick={()=>onChange&&onChange(s)}
        style={{height:36,padding:'0 14px',borderRadius:'var(--radius-pill)',cursor:off?'not-allowed':'pointer',border:on?'1px solid var(--lime-500)':'1px solid var(--border-strong)',background:on?'var(--lime-500)':'transparent',color:off?'var(--text-disabled)':(on?'var(--text-on-accent)':'var(--text-primary)'),fontFamily:'var(--font-ui)',fontWeight:600,fontSize:13}}>{s}</button>;})}
  </div>;
}