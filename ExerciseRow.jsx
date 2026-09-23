import React from 'react';
export function ExerciseRow({name,detail,thumb,active=false,index,onClick,style}){
  return <div onClick={onClick} style={{display:'flex',alignItems:'center',gap:12,padding:'8px 0',cursor:onClick?'pointer':'default',fontFamily:'var(--font-ui)',...style}}>
    <span style={{width:72,height:52,borderRadius:'var(--radius-sm)',flexShrink:0,background:thumb?('#23232b url('+thumb+') center/cover'):'linear-gradient(145deg,#3a3a45,#23232b)'}}/>
    <span style={{flex:1,minWidth:0}}>
      <span style={{display:'block',fontSize:15,fontWeight:700,color:active?'var(--lime-500)':'var(--text-primary)'}}>{index!=null?index+'. ':''}{name}</span>
      <span style={{display:'block',fontSize:13,color:'var(--text-muted)',marginTop:2}}>{detail}</span>
    </span>
  </div>;
}