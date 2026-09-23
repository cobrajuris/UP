import React from 'react';
export function ProgressBar({value=0,max=100,showPercent=false,height=10,color='var(--lime-500)',style}){
  const pct=Math.max(0,Math.min(100,(value/max)*100));
  return <div style={{display:'flex',flexDirection:'column',gap:4,width:'100%',...style}}>
    {showPercent&&<span style={{alignSelf:'flex-end',fontFamily:'var(--font-ui)',fontSize:11,fontWeight:700,color:'var(--text-secondary)'}}>{Math.round(pct)}%</span>}
    <div style={{position:'relative',height,borderRadius:'var(--radius-pill)',background:'var(--outer-space-500)',overflow:'hidden'}}>
      <div style={{width:pct+'%',height:'100%',borderRadius:'var(--radius-pill)',background:color,transition:'width var(--dur-slow) var(--ease-emphasized)'}}/>
      {pct>2&&pct<100&&<span style={{position:'absolute',top:'50%',left:'calc('+pct+'% - 5px)',transform:'translateY(-50%)',width:3,height:height+6,borderRadius:2,background:'var(--grey-200)'}}/>}
    </div>
  </div>;
}