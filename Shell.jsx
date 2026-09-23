const DS=window.UPPRODesignSystem_86b5ff;
const {Icon}=DS;

const shellStyles={
  phone:{position:'relative',width:412,height:916,borderRadius:40,background:'var(--bg-app)',overflow:'hidden',boxShadow:'0 30px 80px rgba(0,0,0,.6), 0 0 0 9px #111116, 0 0 0 10px #2b2b32',flexShrink:0},
  status:{position:'absolute',top:0,left:0,right:0,height:34,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 20px',fontFamily:'var(--font-ui)',fontSize:13,fontWeight:700,color:'var(--text-primary)',zIndex:30,pointerEvents:'none'},
  body:{position:'absolute',top:34,left:0,right:0,bottom:0,overflowY:'auto',overflowX:'hidden',scrollbarWidth:'none'},
  gesture:{position:'absolute',left:'50%',bottom:7,transform:'translateX(-50%)',width:126,height:4,borderRadius:3,background:'rgba(243,243,243,.45)',zIndex:40,pointerEvents:'none'}
};

function StatusBar({dark}){
  return <div style={{...shellStyles.status,background:dark?'var(--lime-500)':'transparent',color:dark?'var(--raisin-700)':'var(--text-primary)'}}>
    <span>07:42</span>
    <span style={{display:'inline-flex',alignItems:'center',gap:6}}>
      <Icon name="signal" size={14}/><Icon name="wifi" size={14}/><Icon name="battery-full" size={17}/>
    </span>
  </div>;
}

/** Android device shell. `statusDark` flips the status bar to dark icons for lime screens. */
function Phone({children,statusDark=false,label}){
  return <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:10}}>
    <div style={shellStyles.phone} data-screen-label={label}>
      <StatusBar dark={statusDark}/>
      <div style={shellStyles.body}>{children}</div>
      <div style={{...shellStyles.gesture,background:statusDark?'rgba(30,30,37,.4)':'rgba(243,243,243,.45)'}}/>
    </div>
    {label&&<span style={{fontFamily:'var(--font-ui)',fontSize:12,color:'var(--grey-400)'}}>{label}</span>}
  </div>;
}

/** Scrollable page body with the 10px screen margin and room for the floating nav. */
function Page({children,pad=true,bottom=96,style}){
  return <div style={{padding:pad?'0 var(--screen-margin)':0,paddingBottom:bottom,display:'flex',flexDirection:'column',gap:'var(--section-gap)',minHeight:'100%',...style}}>{children}</div>;
}

/** Fixed floating bottom navigation inside the phone. */
function NavDock({active,go}){
  const {BottomNav}=DS;
  return <div style={{position:'absolute',left:'var(--screen-margin)',right:'var(--screen-margin)',bottom:16,zIndex:20}}>
    <BottomNav active={active} onSelect={go} onFab={()=>go('registrar')} style={{boxShadow:'var(--shadow-raised)'}}/>
  </div>;
}

/** Image stand-in. No licensed photography ships with this design system. */
function Photo({h=170,r='var(--radius-md)',label,children,style}){
  return <div style={{position:'relative',height:h,borderRadius:r,overflow:'hidden',background:'linear-gradient(145deg,#41414d 0%,#25252d 55%,#1a1a20 100%)',...style}}>
    {label&&<span style={{position:'absolute',top:10,left:12,fontFamily:'var(--font-ui)',fontSize:10,letterSpacing:'var(--ls-caps)',color:'rgba(243,243,243,.35)'}}>{label}</span>}
    {children}
  </div>;
}

Object.assign(window,{Phone,Page,NavDock,Photo,StatusBar,shellStyles,DS});