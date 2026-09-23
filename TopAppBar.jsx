import React from 'react';
import {IconButton} from '../actions/IconButton.jsx';
export function TopAppBar({title,onBack,trailing,transparent=false,style}){
  return <header style={{display:'flex',alignItems:'center',gap:8,height:'var(--appbar-height)',padding:'0 var(--screen-margin)',background:transparent?'transparent':'var(--bg-app)',fontFamily:'var(--font-ui)',...style}}>
    <span style={{width:44}}>{onBack&&<IconButton icon="arrow-left" label="Voltar" size={38} variant={transparent?'glass':'solid'} onClick={onBack}/>}</span>
    <h2 style={{flex:1,margin:0,textAlign:'center',fontSize:17,fontWeight:700,color:'var(--text-primary)'}}>{title}</h2>
    <span style={{width:44,display:'flex',justifyContent:'flex-end'}}>{trailing}</span>
  </header>;
}