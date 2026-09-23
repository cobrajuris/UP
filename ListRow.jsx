import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
export function ListRow({icon,iconColor='var(--lime-500)',leading,title,subtitle,value,meta,chevron=true,onClick,style}){
  return <div onClick={onClick} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px',borderRadius:'var(--radius-md)',background:'var(--raisin-700)',cursor:onClick?'pointer':'default',fontFamily:'var(--font-ui)',...style}}>
    {leading||(icon&&<span style={{width:38,height:38,borderRadius:'var(--radius-pill)',background:'var(--outer-space-600)',display:'grid',placeItems:'center',flexShrink:0}}><Icon name={icon} size={19} color={iconColor}/></span>)}
    <span style={{flex:1,minWidth:0}}>
      <span style={{display:'block',fontSize:13,color:'var(--text-secondary)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{title}</span>
      {(value||subtitle)&&<span style={{display:'block',fontSize:16,fontWeight:700,color:'var(--text-primary)',marginTop:1}}>{value||subtitle}</span>}
    </span>
    {meta&&<span style={{fontSize:12,color:'var(--text-muted)',whiteSpace:'nowrap'}}>{meta}</span>}
    {chevron&&<Icon name="chevron-right" size={16} color="var(--text-muted)"/>}
  </div>;
}