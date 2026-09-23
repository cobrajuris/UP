import React from 'react';
export function Avatar({src,name='',size=44,online=false,rating,style}){
  const initials=(name||'').split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
  return (
    <span style={{position:'relative',display:'inline-flex',flexShrink:0,...style}}>
      <span style={{width:size,height:size,borderRadius:'var(--radius-pill)',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--outer-space-500)',color:'var(--text-secondary)',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:Math.round(size*0.34)}}>
        {src?<img src={src} alt={name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:initials}
      </span>
      {online&&<span style={{position:'absolute',right:1,bottom:1,width:Math.max(8,size*0.2),height:Math.max(8,size*0.2),borderRadius:'var(--radius-pill)',background:'var(--lime-500)',border:'2px solid var(--bg-elevated)'}}/>}
      {rating!=null&&<span style={{position:'absolute',left:-2,bottom:-4,background:'var(--lime-500)',color:'var(--text-on-accent)',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:11,lineHeight:1,padding:'3px 5px',borderRadius:6}}>{rating}</span>}
    </span>
  );
}