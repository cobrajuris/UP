import React from 'react';
const DOW=['D','S','T','Q','Q','S','S'];
export function DayStrip({days=[],value,onChange,style}){
  return <div style={{display:'flex',gap:6,justifyContent:'space-between',...style}}>
    {days.map(d=>{const on=d.date===value;
      return <button key={d.date} type="button" onClick={()=>onChange&&onChange(d.date)}
        style={{flex:1,minWidth:0,padding:'8px 0',borderRadius:'var(--radius-pill)',border:'none',cursor:'pointer',background:on?'var(--lime-500)':'var(--outer-space-600)',color:on?'var(--text-on-accent)':'var(--text-secondary)',fontFamily:'var(--font-ui)',display:'flex',flexDirection:'column',alignItems:'center',gap:2,transition:'background var(--dur-base) var(--ease-standard)'}}>
        <span style={{fontSize:10,fontWeight:500,opacity:.8}}>{d.dow||DOW[new Date(d.date+'T00:00').getDay()]}</span>
        <span style={{fontSize:16,fontWeight:700}}>{d.day||Number(d.date.slice(-2))}</span>
      </button>;})}
  </div>;
}