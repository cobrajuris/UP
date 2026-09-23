import React from 'react';
const CDN='https://unpkg.com/lucide-static@0.544.0/icons/';
const cache={};
export function Icon({name,size=20,color='currentColor',style,...rest}){
  const [svg,setSvg]=React.useState(cache[name]||null);
  React.useEffect(()=>{
    let live=true;
    if(cache[name]){setSvg(cache[name]);return}
    fetch(CDN+name+'.svg').then(r=>r.ok?r.text():'').then(t=>{
      const body=t.replace(/^[\s\S]*?<svg[^>]*>/,'').replace(/<\/svg>[\s\S]*$/,'');
      cache[name]=body;if(live)setSvg(body);
    }).catch(()=>{});
    return()=>{live=false};
  },[name]);
  return <svg aria-hidden="true" {...rest} width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{display:'inline-block',flexShrink:0,...style}}
    dangerouslySetInnerHTML={{__html:svg||''}}/>;
}
