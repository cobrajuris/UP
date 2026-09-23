import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
export function TextField({label,value,placeholder,type='text',helper,error,icon,onChange,disabled=false,style}){
  return (
    <label style={{display:'flex',flexDirection:'column',gap:6,fontFamily:'var(--font-ui)',...style}}>
      {label&&<span style={{fontSize:15,fontWeight:700,color:error?'var(--danger-500)':'var(--text-accent)'}}>{label}</span>}
      <span style={{position:'relative',display:'flex',alignItems:'center'}}>
        {icon&&<Icon name={icon} size={18} color="var(--grey-400)" style={{position:'absolute',left:18}}/>}
        <input type={type} value={value} placeholder={placeholder} disabled={disabled}
          onChange={e=>onChange&&onChange(e.target.value)}
          style={{width:'100%',height:48,padding:icon?'0 18px 0 46px':'0 18px',borderRadius:'var(--radius-pill)',border:error?'1px solid var(--danger-500)':'1px solid transparent',background:'var(--white-050)',color:'var(--raisin-700)',fontFamily:'var(--font-ui)',fontSize:15,fontWeight:500,outline:'none',opacity:disabled?.5:1}}/>
      </span>
      {(helper||error)&&<span style={{fontSize:13,color:error?'var(--danger-500)':'var(--text-muted)'}}>{error||helper}</span>}
    </label>
  );
}