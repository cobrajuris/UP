import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
export function MetricStat({icon,label,value,unit,goal,color='var(--lime-500)',align='left',style}){
  return <div style={{display:'flex',flexDirection:'column',gap:2,alignItems:align==='center'?'center':'flex-start',fontFamily:'var(--font-ui)',...style}}>
    <span style={{fontSize:13,fontWeight:500,color:'var(--text-secondary)'}}>{label}</span>
    <span style={{display:'inline-flex',alignItems:'baseline',gap:5}}>
      {icon&&<Icon name={icon} size={15} color={color} style={{alignSelf:'center'}}/>}
      <span style={{fontSize:22,fontWeight:700,color,letterSpacing:'var(--ls-tight)'}}>{value}</span>
      {(goal||unit)&&<span style={{fontSize:12,fontWeight:500,color:'var(--text-muted)'}}>{goal?'/ '+goal:''}{unit?' '+unit:''}</span>}
    </span>
  </div>;
}