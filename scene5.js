/*IONA5*/
// ---- global particles (every scene): soft motes carried by a slow wind, parallaxed by scroll
(()=>{const cv=$('pt'),x=cv.getContext('2d');let W=1,H=1,sy=scrollY;const ps=Array.from({length:90},()=>({x:Math.random(),y:Math.random(),z:.3+Math.random()*.7,vx:(Math.random()-.5)*.15,vy:.05+Math.random()*.2,a:.15+Math.random()*.45,ph:Math.random()*6,r:1.5+Math.random()*4}));
 const rs=()=>{const d=Math.min(devicePixelRatio,2);W=cv.width=Math.round(innerWidth*d);H=cv.height=Math.round(innerHeight*d)};addEventListener('resize',rs);rs();
 function tick(){const d=Math.min(devicePixelRatio,2),n=performance.now(),w=.28+.22*Math.sin(n/6000),ds=scrollY-sy;sy=scrollY;x.clearRect(0,0,W,H);
  for(const p of ps){p.x+=(w*p.z+p.vx)*.0006*(reduce?0:1);p.y-=(p.vy*.0004+ds*.00012*p.z/(innerHeight/800))*(reduce?0:1);if(p.x>1.02)p.x=-.02;if(p.x<-.02)p.x=1.02;if(p.y<-.02)p.y=1.02;if(p.y>1.02)p.y=-.02;
   const r=p.r*p.z*d*1.6;x.globalAlpha=p.a*(.6+.4*Math.sin(n/1300+p.ph));x.drawImage(gc,p.x*W-r,p.y*H-r,r*2,r*2)}
  if(!reduce)requestAnimationFrame(tick)}tick()})();

// ---- scene 5: the night water returns (drops, ripples, the three bottles), then the finale on black
const t5=[[.38,-2.7],[.47,0],[.62,2.7]].map(([k,x],i)=>{const g=bottle.clone();g.scale.setScalar(k);g.visible=false;g.userData={x,i};S.add(g);return g});
const d5=[0,1,2,3].map(()=>{const m=new THREE.Mesh(dg,dm);m.scale.y=1.5;m.visible=false;S.add(m);return{m,on:false,x:0,z:0,t:0}});let n5=0,r5=false,wu=-1;
const pf=$('pf'),pg=$('pg'),ft=$('ft');
function rk5(){rocks.forEach(r=>r.visible=true);t5.forEach(g=>g.visible=false);d5.forEach(d=>{d.on=false;d.m.visible=false});r5=false}
function fin5(s){
 const f5=sm(14.6,15.4,s),bk=sm(14.1,14.8,s),c2=$('c2').style;
 c2.opacity=(+c2.opacity||0)*(1-bk);
 $('c').style.cssText='opacity:'+f5.toFixed(3)+';filter:blur('+((1-f5)*16).toFixed(1)+'px)';
 rocks.forEach(r=>r.visible=false);bottle.visible=false;
 const e=ease(cl((s-14.8)/.9,0,1));if(e<=0)r5=false;
 t5.forEach((g,i)=>{g.visible=e>0;g.position.set(g.userData.x,L(-4,-.5,e)+Math.sin(T*.9+i*2.1)*.05,i===1?.1:-.5);g.rotation.z=Math.sin(T*.7+i)*.025});
 if(e>0&&!r5){r5=true;t5.forEach(g=>ripple(g.userData.x,-.5))}
 if(s>14.9&&s<16.9&&T>n5){n5=T+.9+Math.random()*1.1;const d=d5.find(q=>!q.on);if(d){d.on=true;d.t=T;d.x=(Math.random()-.5)*7;d.z=-1.2+Math.random()*3;d.m.visible=true}}
 d5.forEach(d=>{if(!d.on)return;const u=(T-d.t)/.8;if(u>=1){d.on=false;d.m.visible=false;ripple(d.x,d.z);splash(d.x,d.z,26);drip();return}d.m.position.set(d.x,5.2*(1-u*u),d.z)});
 cam.position.set(mx*.5,1.2-my*.15,8.4);cam.lookAt(0,1.35,0)}
function P5(s){panel(pe,vis(12.3,14.3,s));panel(pf,vis(15.0,16.8,s));const g=sm(16.7,17.3,s);panel(pg,g);pg.classList.toggle('go',g>.85);
 const f=sm(17.55,18,s);ft.style.opacity=f;ft.style.visibility=f<.01?'hidden':'visible';ft.style.pointerEvents=f>.5?'auto':'none';
 // wind gets muffled underwater, opens up again on the surface
 if(window.wf&&AC){const u=sm(6.3,7.9,s)*(1-sm(14.2,14.9,s));if(Math.abs(u-wu)>.02){wu=u;wf.frequency.setTargetAtTime(420-210*u,AC.currentTime,.4)}}}
$('cb').onclick=()=>toast('<b>CONTACT REQUESTED</b>Thank you. Our team will reach out shortly.');
/*IONA5END*/
