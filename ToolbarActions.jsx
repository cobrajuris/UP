import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
export function ToolbarActions({items=[{icon:'sliders-horizontal',label:'Filtros'},{icon:'arrow-up-down',label:'Ordenar'},{icon:'search',label:'Buscar'}],active,onSelect,style}){
  return <div style={{display:'flex',alignItems:'center',borderTop:'1px solid var(--divider)',borderBottom:'1px solid var(--divider)',...style}}>
    {items.map((it,i)=>{const on=active===it.label;
      return <React.Fragment key={it.label}>
        {i>0&&<span style={{width:1,height:20,background:'var(--divider)'}}/>}
        <button type="button" onClick={()=>onSelect&&onSelect(it.label)} style={{flex:1,height:48,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:8,background:'transparent',border:'none',cursor:'pointer',color:on?'var(--lime-500)':'var(--text-primary)',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:15}}>
          <Icon name={it.icon} size={17}/>{it.label}
        </button>
      </React.Fragment>;})}
  </div>;
}