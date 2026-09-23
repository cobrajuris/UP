import React from 'react';
import {Avatar} from '../foundation/Avatar.jsx';
export function ReviewCard({author,rating,when,text,photo,style}){
  return <div style={{display:'flex',gap:12,padding:14,borderRadius:'var(--radius-md)',background:'var(--raisin-700)',fontFamily:'var(--font-ui)',...style}}>
    <Avatar name={author} src={photo} size={40} rating={rating}/>
    <span style={{flex:1,minWidth:0}}>
      <span style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:8}}>
        <b style={{fontSize:15,fontWeight:700,color:'var(--text-primary)'}}>{author}</b>
        <span style={{fontSize:12,color:'var(--text-muted)'}}>{when}</span></span>
      <p style={{margin:'6px 0 0',fontSize:13,lineHeight:1.5,color:'var(--text-secondary)'}}>{text}</p>
    </span>
  </div>;
}