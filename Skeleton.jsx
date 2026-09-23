import React from 'react';
export function Skeleton({width='100%',height=14,radius='var(--radius-xs)',style}){
  return <span style={{display:'block',width,height,borderRadius:radius,background:'linear-gradient(90deg,var(--outer-space-600) 25%,var(--outer-space-500) 50%,var(--outer-space-600) 75%)',backgroundSize:'200% 100%',animation:'upproShimmer 1.4s var(--ease-standard) infinite',...style}}>
    <style>{'@keyframes upproShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}'}</style>
  </span>;
}