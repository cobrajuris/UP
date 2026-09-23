import React from 'react';
import {Icon} from '../foundation/Icon.jsx';
import {Avatar} from '../foundation/Avatar.jsx';
export function ProfessionalRow({name,specialty,experience,rating,photo,onClick,style}){
  return <div onClick={onClick} style={{display:'flex',alignItems:'center',gap:14,padding:'12px 16px',borderRadius:'var(--radius-lg)',background:'var(--surface-card)',cursor:'pointer',fontFamily:'var(--font-ui)',...style}}>
    <Avatar name={name} src={photo} size={52} rating={rating}/>
    <span style={{flex:1,minWidth:0}}>
      <span style={{display:'block',fontSize:17,fontWeight:700,color:'var(--text-primary)',position:'relative'}}>{name}
        <svg width="183" height="139" viewBox="0 0 183 139" preserveAspectRatio="none" style={{position:'absolute',left:34,top:1,width:183,height:139,overflow:'visible',fill:'none',stroke:'#8a8378',strokeWidth:2,strokeLinecap:'round',strokeLinejoin:'round'}}>
          <path d="M127 5 L125 7 L123 7 L122 9 L119 11 L117 11 L115 11 L113 11 L111 11 L107 13 L98 15 L91 17 L86 19 L72 25 L58 31 L43 37 L27 45 L18 50 L11 53 L3 57 L1 58 L0 60 L0 64 L0 66 L0 75 L1 84 L3 91 L7 103 L9 106 L12 109 L15 112 L26 118 L33 122 L39 127 L55 135 L63 138 L73 139 L83 138 L94 132 L108 123 L123 112 L143 90 L155 69 L170 44 L180 20 L183 11 L183 7 L183 4 L181 3 L178 1 L176 0"/>
        </svg>
      </span>
      <span style={{display:'block',fontSize:12,color:'var(--text-muted)'}}>{specialty}</span>
      {experience&&<span style={{display:'block',fontSize:13,fontWeight:600,color:'var(--text-accent)',marginTop:4}}>{experience}</span>}
    </span>
    <Icon name="chevron-right" size={18} color="var(--text-secondary)"/>
  </div>;
}