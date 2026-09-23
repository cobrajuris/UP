import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
export function SectionHeader({title,action,onAction,size='md',style}){
  return <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,fontFamily:'var(--font-ui)',...style}}>
    <h3 style={{margin:0,fontSize:size==='lg'?22:18,fontWeight:size==='lg'?700:600,color:'var(--text-primary)',letterSpacing:'var(--ls-tight)'}}>{title}</h3>
    {action&&<button type="button" onClick={onAction} style={{background:'none',border:'none',padding:0,cursor:'pointer',display:'inline-flex',alignItems:'center',gap:2,color:'var(--text-accent)',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:13}}>{action}<Icon name="chevron-right" size={14}/></button>}
  </div>;
}