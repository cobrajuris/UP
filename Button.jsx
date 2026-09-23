import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
const V={
  primary:{bg:'var(--lime-500)',fg:'var(--text-on-accent)',bd:'none'},
  secondary:{bg:'var(--raisin-700)',fg:'var(--text-primary)',bd:'none'},
  outline:{bg:'transparent',fg:'var(--text-primary)',bd:'1px solid var(--border-strong)'},
  ghost:{bg:'transparent',fg:'var(--text-accent)',bd:'none'}
};
const S={sm:{h:40,px:18,fs:15},md:{h:52,px:24,fs:17},lg:{h:60,px:30,fs:20}};
export function Button({children,variant='primary',size='md',iconStart,iconEnd,block=false,disabled=false,onClick,style,...rest}){
  const v=V[variant]||V.primary,s=S[size]||S.md;
  const dis=disabled?{background:'var(--grey-400)',color:'var(--raisin-700)',border:'none',cursor:'not-allowed',opacity:.9}:{};
  return <button type="button" disabled={disabled} onClick={onClick} {...rest}
    style={{display:block?'flex':'inline-flex',width:block?'100%':'auto',alignItems:'center',justifyContent:'center',gap:10,height:s.h,padding:'0 '+s.px,background:v.bg,color:v.fg,border:v.bd,borderRadius:'var(--radius-pill)',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:s.fs,lineHeight:1,cursor:'pointer',transition:'transform var(--dur-fast) var(--ease-standard),filter var(--dur-base) var(--ease-standard)',...dis,...style}}
    onMouseDown={e=>{if(!disabled)e.currentTarget.style.transform='scale(var(--press-scale))'}}
    onMouseUp={e=>{e.currentTarget.style.transform='none'}} onMouseLeave={e=>{e.currentTarget.style.transform='none'}}>
    {iconStart&&<Icon name={iconStart} size={s.fs}/>}{children}{iconEnd&&<Icon name={iconEnd} size={s.fs}/>}
  </button>;
}