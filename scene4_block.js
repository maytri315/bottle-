const NB=1500,bP=new Float32Array(NB*3),bV=new Float32Array(NB*3),bL=new Float32Array(NB),bK=new Uint8Array(NB);let pi4=0,hit4=false,sh=0;for(let i=0;i<NB;i++)bP[i*3+1]=-99;
const bGeo=new THREE.BufferGeometry();bGeo.setAttribute('position',new THREE.BufferAttribute(bP,3));
S4.add(new THREE.Points(bGeo,new THREE.PointsMaterial({map:gt,size:.16,color:0xcfeeff,transparent:true,opacity:.75,depthWrite:false,blending:THREE.AdditiveBlending})));
const sp4=(k,x,y,vx,vy,l)=>{const i=pi4++%NB;bP.set([x,y,Math.random()*2-1],i*3);bV.set([vx,vy,0],i*3);bL[i]=l;bK[i]=k};
const bm4=glass(0xaee6ff,.8,0),bigB=[];for(let i=0;i<7;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(1,24,16),bm4),r=.06+Math.random()*.15;m.scale.setScalar(r);m.position.set(-4+Math.random()*8,-3+Math.random()*5,Math.random()*2);m.userData={vy:.25+Math.random()*.35};m.visible=false;S4.add(m);bigB.push(m)}
// sh = splash clock. It runs in slow motion at the moment of impact, then eases back to real time (movie "hero shot")
function upd4(dt,s){const dp=cl((s-9.7)/1.5,0,1);let y;
 if(dp<.4){const u=dp/.4;y=8.8-6.6*u*u}else{const v=(dp-.4)/.6;y=WL-4.8*(1-Math.pow(1-v,3))}
 b4.position.set(.4+mx*.2,y,0);b4.rotation.set(0,-.4+mx*.3,.35*(1-ease(dp))+.12+(dp>=1?.03*Math.sin(T*1.1):0));
 mO.uniforms.uA.value=mI.uniforms.uA.value=1;label.material.opacity=1;
 if(dp>=.4&&!hit4){hit4=true;sh=0;
  for(let i=0;i<260;i++){const a=Math.random()-.5;sp4(0,.4+a*1.1,WL+.02,a*4,3+Math.random()*5,2.4)}
  for(let i=0;i<650;i++)sp4(1,.4+(Math.random()-.5)*3.2,WL-Math.random()*3.6,(Math.random()-.5)*.3,.4+Math.random(),8)}
 if(dp<.4&&hit4){hit4=false;bL.fill(0)}
 const ts=hit4?.32+.68*sm(0,1.5,sh):1,sdt=dt*ts;if(hit4)sh+=sdt;
 uHit.value=hit4?T-sh:-99;
 if(dp>.4&&dp<1)for(let k=0;k<12;k++)sp4(1,b4.position.x+(Math.random()-.5)*1.2,y+Math.random()*2.8,(Math.random()-.5)*.2,.5+Math.random()*.8,6);
 else if(dp>=1&&Math.random()<.5)sp4(1,b4.position.x+(Math.random()-.5)*1.6,-2.8+Math.random()*4,0,.4+Math.random()*.6,6);
 for(let i=0;i<NB;i++)if(bL[i]>0){const j=i*3;if(bK[i]===0){bV[j+1]-=8*sdt;bP[j]+=bV[j]*sdt;bP[j+1]+=bV[j+1]*sdt;if(bP[j+1]<WL)bL[i]=0}else{bP[j]+=Math.sin(T*3+i)*.003+bV[j]*sdt;bP[j+1]+=bV[j+1]*sdt;if(bP[j+1]>WL)bL[i]=0}bL[i]-=sdt;if(bL[i]<=0)bP[j+1]=-99}
 bGeo.attributes.position.needsUpdate=true;
 bigB.forEach(m=>{m.visible=dp>=.4;m.position.y+=m.userData.vy*dt;if(m.position.y>WL)m.position.y=-3.2});fx4(sdt,dp,y)}
// splash: stretched droplets (Blender-style flying drops), glass bubbles clinging to the bottle, plus the fluid layer below
const dum=new THREE.Object3D(),UP=new THREE.Vector3(0,1,0),vv=new THREE.Vector3();
const ND=420,dX=new Float32Array(ND*7),dLf=new Float32Array(ND);let dn=0,fxHit=false;
const dIM=new THREE.InstancedMesh(new THREE.SphereGeometry(1,10,8),new THREE.MeshStandardMaterial({color:0xe9f8ff,roughness:0,transparent:true,opacity:.6,envMapIntensity:3.5}),ND);dIM.frustumCulled=false;S4.add(dIM);
const addD=(x,y,z,vx,vy,vz,r)=>{const i=dn++%ND;dX.set([x,y,z,vx,vy,vz,r],i*7);dLf[i]=3.5};
const NBB=900,bX=new Float32Array(NBB*8),bLf=new Float32Array(NBB);let bn=0;
const bmI=glass(0xbfeaff,1,0);bmI.vertexShader='varying vec3 vN,vV;void main(){mat4 mm=modelViewMatrix*instanceMatrix;vN=normalize(mat3(mm)*normal);vec4 m=mm*vec4(position,1.);vV=-m.xyz;gl_Position=projectionMatrix*m;}';
const bIM=new THREE.InstancedMesh(new THREE.SphereGeometry(1,14,10),bmI,NBB);bIM.frustumCulled=false;bIM.renderOrder=5;S4.add(bIM);
const addB=(x,y,z,r,att)=>{const i=bn++%NBB;bX.set([x,y,z,.45+Math.sqrt(r)*2.4+Math.random()*.3,r,Math.random()*6.28,att,T+.3+Math.random()*3.5],i*8);bLf[i]=1};
const bub4=()=>.015+Math.pow(Math.random(),3)*.2;
function fx4(dt,dp,y){const bx=b4.position.x,ht=hit4?sh:-1;wat4(dt,ht,bx);
 if(hit4&&!fxHit){fxHit=true;
  for(let i=0;i<320;i++){const a=Math.random()*6.28,rd=.3+Math.random()*.9,vo=.8+Math.random()*3.2;addD(bx+Math.cos(a)*rd*.6,WL+.03,Math.sin(a)*rd*.5,Math.cos(a)*vo,3+Math.pow(Math.random(),.7)*7,Math.sin(a)*vo*.6,.018+Math.pow(Math.random(),2.5)*.11)}
  for(let i=0;i<260;i++)addB(bx+(Math.random()-.5)*2.2,WL-Math.random()*2.6,(Math.random()-.5)*1.2,bub4(),0);
  for(let i=0;i<220;i++){const a=-1.2+Math.random()*2.4,h=Math.random()*3.3,rr=h<2.5?.57:.57-(h-2.5)*.35;addB(rr*Math.sin(a),h,rr*Math.cos(a),.015+Math.random()*.04,1)}}
 if(!hit4&&fxHit){fxHit=false;bLf.fill(0);dLf.fill(0)}
 if(ht>=.06&&ht<.7){const k=(ht-.06)/.64,H=3.2*Math.sin(Math.PI*Math.min(1,k));
  if(ht<.55)for(let i=0;i<4;i++)addD(bx+(Math.random()-.5)*.25,WL+H,(Math.random()-.5)*.25,(Math.random()-.5)*1.6,3+Math.random()*3.5,(Math.random()-.5)*.8,.02+Math.random()*.05)}
 if(dp>.4&&dp<1)for(let k=0;k<5;k++)addB(bx+(Math.random()-.5)*1.1,y+Math.random()*3,(Math.random()-.5)*.8,bub4()*.6,0);
 else if(dp>=1&&Math.random()<.35)addB(bx+(Math.random()-.5)*1.4,-2.7+Math.random()*4,(Math.random()-.5)*.8,bub4()*.5,0);
 for(let i=0;i<ND;i++){if(dLf[i]>0){const j=i*7;dX[j+4]-=8*dt;dX[j]+=dX[j+3]*dt;dX[j+1]+=dX[j+4]*dt;dX[j+2]+=dX[j+5]*dt;dLf[i]-=dt;if(dX[j+1]<WL)dLf[i]=0;
   const sp=Math.hypot(dX[j+3],dX[j+4],dX[j+5])+1e-4;vv.set(dX[j+3]/sp,dX[j+4]/sp,dX[j+5]/sp);dum.quaternion.setFromUnitVectors(UP,vv);dum.position.set(dX[j],dX[j+1],dX[j+2]);dum.scale.set(dX[j+6],dX[j+6]*(1+sp*.2),dX[j+6])}
  else{dum.scale.set(0,0,0);dum.position.set(0,-99,0)}dum.updateMatrix();dIM.setMatrixAt(i,dum.matrix)}
 dIM.instanceMatrix.needsUpdate=true;dum.quaternion.set(0,0,0,1);b4.updateMatrixWorld();
 for(let i=0;i<NBB;i++){const j=i*8;let vis=bLf[i]>0;
  if(vis){if(bX[j+6]===1){vv.set(bX[j],bX[j+1],bX[j+2]).applyMatrix4(b4.matrixWorld);if(vv.y>WL-.03)vis=false;else if(T>bX[j+7]){bX[j+6]=0;bX[j]=vv.x;bX[j+1]=vv.y;bX[j+2]=vv.z}dum.position.copy(vv)}
   else{bX[j+1]+=bX[j+3]*dt;bX[j]+=Math.sin(T*4+bX[j+5])*.25*dt;bX[j+2]+=Math.cos(T*3.2+bX[j+5])*.1*dt;bX[j+4]*=1+.02*dt;if(bX[j+1]>WL-.03){bLf[i]=0;vis=false}dum.position.set(bX[j],bX[j+1],bX[j+2])}}
  if(vis)dum.scale.setScalar(bX[j+4]);else{dum.scale.set(0,0,0);dum.position.set(0,-99,0)}dum.updateMatrix();bIM.setMatrixAt(i,dum.matrix)}
 bIM.instanceMatrix.needsUpdate=true}
// fluid splash: ~14k particles -> screen-space metaball water surface (crown sheet, 2nd crown, central jet, Worthington jet, trailing spray)
const NW=14000,wP=new Float32Array(NW*3),wV=new Float32Array(NW*3),wS=new Float32Array(NW),wL=new Float32Array(NW),wT=new Uint8Array(NW);let wn=0,spr=false;
const wG=new THREE.BufferGeometry();wG.setAttribute('position',new THREE.BufferAttribute(wP,3));wG.setAttribute('aSize',new THREE.BufferAttribute(wS,1));
const rt=new THREE.WebGLRenderTarget(512,256,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBAFormat}),uTx={value:new THREE.Vector2(.002,.004)},uK={value:300};
const Sfield=new THREE.Scene();
const wPts=new THREE.Points(wG,new THREE.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{uK},
 vertexShader:'attribute float aSize;uniform float uK;varying float vF,vA;void main(){vF=position.z>=0.?1.:0.;vA=aSize<.075?1.:.3;vec4 m=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*m;gl_PointSize=aSize*2.4*uK/(-m.z);}',
 fragmentShader:'varying float vF,vA;void main(){float d=length(gl_PointCoord-.5)*2.;float g=exp(-d*d*3.)*(1.-smoothstep(.85,1.,d))*.9*vA;gl_FragColor=vec4(vF<.5?g:0.,vF>.5?g:0.,0.,1.);}'}));
wPts.frustumCulled=false;Sfield.add(wPts);
const FS=`uniform sampler2D uTex;uniform vec2 uTx;uniform float uCh;varying vec2 vU;
float F(vec2 o){vec4 t=texture2D(uTex,vU+o*uTx);return uCh<.5?t.r:t.g;}
void main(){float f=F(vec2(0.));if(f<.18)discard;float fx=F(vec2(2.,0.))-F(vec2(-2.,0.)),fy=F(vec2(0.,2.))-F(vec2(0.,-2.));
float a=smoothstep(.46,.56,f),th=smoothstep(.55,1.,f);vec3 n=normalize(vec3(-fx*5.,-fy*5.,1.));vec3 V=vec3(0.,0.,1.);float fr=pow(1.-max(dot(n,V),0.),2.);
vec3 L=normalize(vec3(-.4,.7,.6));float sp=pow(max(dot(reflect(-L,n),V),0.),40.),lit=.5+.5*dot(n,normalize(vec3(-.3,.8,.5)));
vec3 c=vec3(.06,.16,.24)+vec3(.55,.8,.95)*fr*1.2+sp*1.6+vec3(.8,.95,1.)*pow(fr,3.)*.6;c=mix(c,vec3(.78,.9,.96)*(.5+.5*lit),th*.7);gl_FragColor=vec4(c,mix(a*(.35+.6*fr+sp),a*.92,th));}`;
const mkQ=(ch,z,ro,dtest)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.ShaderMaterial({transparent:true,depthWrite:false,depthTest:dtest,uniforms:{uTex:{value:rt.texture},uTx,uCh:{value:ch}},
 vertexShader:'varying vec2 vU;void main(){vU=position.xy*.5+.5;gl_Position=vec4(position.xy,'+z+',1.);}',fragmentShader:FS}));m.frustumCulled=false;m.renderOrder=ro;S4.add(m)};
mkQ(0,'.995',0,true);mkQ(1,'0.',10,false);
const em=(x,y,z,vx,vy,vz,r,ty)=>{const i=wn++%NW,j=i*3;wP[j]=x;wP[j+1]=y;wP[j+2]=z;wV[j]=vx;wV[j+1]=vy;wV[j+2]=vz;wS[i]=r;wL[i]=3.2;wT[i]=ty};
const R_=Math.random;
function wat4(dt,ht,bx){
 if(!hit4){if(spr){spr=false;wS.fill(0);wL.fill(0);wG.attributes.aSize.needsUpdate=true}return}
 if(!spr){spr=true;for(let i=0;i<700;i++){const a=R_()*6.28,sp=3+R_()*6;em(bx+Math.cos(a)*.7,WL+.03,Math.sin(a)*.5,Math.cos(a)*sp*.8,sp*(.6+R_()),Math.sin(a)*sp*.5,.012+Math.pow(R_(),2)*.04,0)}}
 // primary crown: a ring of thick sheet with fingers
 if(ht>=0&&ht<.2){const n=Math.round(dt*24000);for(let i=0;i<n;i++){const a=R_()*6.28,f=Math.max(.35,1+.6*Math.sin(a*11)+.35*Math.sin(a*5)+.3*Math.sin(a*23)),vr=1.3+R_()*1.2;em(bx+Math.cos(a)*.74,WL+.02,Math.sin(a)*.74,Math.cos(a)*vr,(4.5+R_()*3)*f,Math.sin(a)*vr,.11+R_()*.07,1)}}
 // second, smaller crown riding inside the first
 if(ht>=.09&&ht<.26){const n=Math.round(dt*9000);for(let i=0;i<n;i++){const a=R_()*6.28,f=Math.max(.4,1+.5*Math.sin(a*9)+.3*Math.sin(a*17)),vr=.5+R_()*.7;em(bx+Math.cos(a)*.55,WL+.02,Math.sin(a)*.55,Math.cos(a)*vr,(3+R_()*2.5)*f,Math.sin(a)*vr,.09+R_()*.05,1)}}
 // central jet, then the delayed Worthington jet
 if(ht>=.04&&ht<.3){const n=Math.round(dt*4500),k=1-ht*2;for(let i=0;i<n;i++)em(bx+(R_()-.5)*.2,WL+.02,(R_()-.5)*.2,(R_()-.5)*.5,(6+R_()*4)*k+2,(R_()-.5)*.4,.045+R_()*.025,0)}
 if(ht>=.5&&ht<.8){const n=Math.round(dt*3000);for(let i=0;i<n;i++)em(bx+(R_()-.5)*.25,WL+.02,(R_()-.5)*.25,(R_()-.5)*.6,6+R_()*3.5,(R_()-.5)*.4,.05+R_()*.05,0)}
 // lingering spray thrown off the bottle while it settles
 if(ht>=.26&&ht<2.4){const n=Math.round(dt*1100);for(let i=0;i<n;i++){const a=R_()*6.28;em(bx+Math.cos(a)*.66,WL+.02,Math.sin(a)*.5,Math.cos(a)*(.4+R_()*.8),1.5+R_()*3,Math.sin(a)*.4,.025+R_()*.04,0)}}
 for(let i=0;i<NW;i++)if(wL[i]>0){const j=i*3;wV[j+1]-=8.5*dt;if(wT[i]===1){wV[j]-=(wP[j]-bx)*2.2*dt;wV[j+2]-=wP[j+2]*2.2*dt}wP[j]+=wV[j]*dt;wP[j+1]+=wV[j+1]*dt;wP[j+2]+=wV[j+2]*dt;if(wT[i]===1&&wV[j+1]<0&&wV[j+1]+8.5*dt>=0&&R_()<.35)em(wP[j],wP[j+1],wP[j+2],wV[j]*1.2+(R_()-.5),1+R_()*2,wV[j+2],.02+R_()*.03,0);wL[i]-=dt;if(wP[j+1]<WL||wL[i]<=0){wL[i]=0;wS[i]=0}}
 wG.attributes.position.needsUpdate=wG.attributes.aSize.needsUpdate=true}