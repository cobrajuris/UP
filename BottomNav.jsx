import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
import {Fab} from '../actions/Fab.jsx';
const DEFAULT=[{id:'inicio',icon:'house',label:'Início'},{id:'nutricao',icon:'utensils',label:'Nutrição'},{id:'estatisticas',icon:'bar-chart-3',label:'Estatísticas'},{id:'conquistas',icon:'trophy',label:'Conquistas'}];
export function BottomNav({items=DEFAULT,active,onSelect,onFab,style}){
  const left=items.slice(0,2),right=items.slice(2);
  const item=it=>{const on=it.id===active;
    return <button key={it.id} type="button" onClick={()=>onSelect&&onSelect(it.id)} style={{flex:1,minWidth:0,height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:3,background:'none',border:'none',cursor:'pointer',color:on?'var(--text-primary)':'var(--grey-400)',fontFamily:'var(--font-ui)',fontSize:10,fontWeight:on?700:500}}>
      <Icon name={it.icon} size={21}/>{it.label}</button>;};
  return <nav style={{position:'relative',display:'flex',alignItems:'center',height:'var(--navbar-height)',borderRadius:'var(--radius-shell)',background:'var(--raisin-700)',padding:'0 6px',fontFamily:'var(--font-ui)',...style}}>
    {left.map(item)}
    <span style={{width:72,display:'grid',placeItems:'center'}}><Fab size={54} onClick={onFab}/></span>
    {right.map(item)}
  </nav>;
}