import React from 'react';
const DOW=['SEG','TER','QUA','QUI','SEX','SÁB','DOM'];
export function CalendarGrid({year,month,selected,marked=[],onSelect,style}){
  const first=new Date(year,month,1);const offset=(first.getDay()+6)%7;
  const days=new Date(year,month+1,0).getDate();const prevDays=new Date(year,month,0).getDate();
  const cells=[];
  for(let i=offset-1;i>=0;i--)cells.push({n:prevDays-i,out:true});
  for(let d=1;d<=days;d++)cells.push({n:d});
  while(cells.length%7)cells.push({n:cells.length-offset-days+1,out:true});
  return <div style={{fontFamily:'var(--font-ui)',...style}}>
    <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',marginBottom:6}}>
      {DOW.map(d=><span key={d} style={{textAlign:'center',fontSize:10,fontWeight:600,letterSpacing:'var(--ls-caps)',color:'var(--text-muted)'}}>{d}</span>)}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',rowGap:6}}>
      {cells.map((c,i)=>{const on=!c.out&&c.n===selected;const mk=!c.out&&marked.includes(c.n);
        return <button key={i} type="button" disabled={c.out} onClick={()=>onSelect&&onSelect(c.n)}
          style={{position:'relative',height:32,border:'none',background:on?'var(--lime-500)':'transparent',borderRadius:'var(--radius-pill)',cursor:c.out?'default':'pointer',color:c.out?'var(--outer-space-500)':(on?'var(--text-on-accent)':'var(--text-primary)'),fontFamily:'var(--font-ui)',fontSize:13,fontWeight:on?700:500}}>
          {c.n}{mk&&!on&&<span style={{position:'absolute',left:'50%',bottom:3,transform:'translateX(-50%)',width:4,height:4,borderRadius:'50%',background:'var(--lime-500)'}}/>}
        </button>;})}
    </div>
  </div>;
}