import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
import {DifficultyMeter} from '../data/DifficultyMeter.jsx';
export function WorkoutCard({title,image,duration,level='facil',saved=false,onSave,onClick,height=170,style}){
  return <article onClick={onClick} style={{position:'relative',height,borderRadius:'var(--radius-md)',overflow:'hidden',cursor:'pointer',background:image?('#23232b url('+image+') center/cover'):'linear-gradient(145deg,#3a3a45,#23232b)',...style}}>
    <span style={{position:'absolute',inset:0,background:'var(--overlay-image)'}}/>
    <button type="button" aria-label={saved?'Remover dos salvos':'Salvar treino'} onClick={e=>{e.stopPropagation();onSave&&onSave()}}
      style={{position:'absolute',top:10,right:10,width:30,height:30,borderRadius:'var(--radius-xs)',border:'none',cursor:'pointer',background:'rgba(14,14,17,.45)',backdropFilter:'var(--blur-scrim)',display:'grid',placeItems:'center'}}>
      <Icon name="bookmark" size={16} color={saved?'var(--lime-500)':'var(--white-050)'}/>
    </button>
    <div style={{position:'absolute',left:12,right:12,bottom:10,display:'flex',flexDirection:'column',gap:6,fontFamily:'var(--font-ui)'}}>
      <h4 style={{margin:0,fontSize:14,fontWeight:700,color:'var(--white-050)',lineHeight:1.25}}>{title}</h4>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
        <span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:12,color:'var(--white-050)'}}><Icon name="play" size={12}/>{duration}</span>
        <DifficultyMeter level={level}/>
      </div>
    </div>
  </article>;
}