import sys,os
src=sys.argv[1] if len(sys.argv)>1 else 'index.html'
out=sys.argv[2] if len(sys.argv)>2 else 'index_v2.html'
here=os.path.dirname(os.path.abspath(__file__))
h=open(src,encoding='utf-8').read()
blk=open(os.path.join(here,'scene4_block.js'),encoding='utf-8').read().rstrip('\n')+'\n'
a=h.find('const NB=500,bP=');
if a<0:a=h.find('const NB=900,bP=')
if a<0:a=h.find('const NB=1500,bP=')
b=h.find('function size4(){cam4.aspect')
assert a>0 and b>a,'scene 4 markers not found - is this the original file?'
h=h[:a]+blk+h[b:]
css='''
/* card theme: card stays the same, only the TEXT colour follows the water type */
body{--tx:#0d4a73;--tx2:#2f5a74}
body[data-ty=grey]{--tx:#2b343a;--tx2:#59656c}
body[data-ty=gold]{--tx:#7d5208;--tx2:#775f2e}
body,body[data-ty=grey],body[data-ty=gold]{--cbg:rgba(247,252,253,.93)}
.oc h4,.oc .sb,.oc .tg{color:var(--tx);transition:color .5s}
.pn .oc p,.oc .sl{color:var(--tx2);transition:color .5s}
.oc h4,.oc .sb,.oc .tg,.pn .oc p,.oc .sl{animation:none}
body[data-spread] .oc h4,body[data-spread] .oc .sb,body[data-spread] .oc .tg,body[data-spread] .oc p,body[data-spread] .oc .sl{animation:water-text-spread .9s ease-out both;animation-delay:calc(var(--card-index,0) * 90ms)}
@keyframes water-text-spread{0%{color:var(--tx-prev)}45%{color:var(--tx)}100%{color:var(--tx)}}
.oc .ob{color:var(--tx);transition:background .3s,color .5s}
.oc:hover .ob,.ob.done{background:#0b1a22;border-color:#0b1a22;color:#fff}
/* bottle picture in the cards stays the same blue for every type */
.bw i{background:linear-gradient(#6fc3ee,#1768a0)}
'''
if 'bottle picture in the cards' not in h:
    assert '</style></head>' in h
    h=h.replace('</style></head>',css+'</style></head>',1)
# water surface ripple + foam band in the scene-4 background shader
old1='imp=(uHit>0.&&t>0.)?exp(-t*1.1)*.03*sin(abs(x-.1)*26.-t*11.)*exp(-abs(x-.1)*1.4):0.;'
new1='imp=(uHit>0.&&t>0.)?(.05*exp(-t*.55)*sin(abs(x-.07)*30.-t*8.)+.022*exp(-t*.4)*sin(abs(x-.07)*61.-t*13.))*exp(-abs(x-.07)*1.6)*smoothstep(t*.42,t*.42-.16,abs(x-.07)):0.;'
old2='w+=vec3(.5,.8,.95)*smoothstep(.1,0.,dd)*.3;'
new2=old2+'w+=vec3(.75,.93,1.)*smoothstep(.07,0.,dd)*(.2+.8*pow(.5+.5*sin(x*80.+sin(x*9.+uT*.8)*3.-uT*1.6+imp*260.),3.))*.55*step(0.,dd);'
if old1 in h: h=h.replace(old1,new1,1)
else: assert 'smoothstep(t*.42' in h,'bg4 ripple line not found'
if new2 not in h:
    assert old2 in h,'bg4 surface line not found'
    h=h.replace(old2,new2,1)
# picking a water type no longer re-tints the scene-4 water behind the cards
h=h.replace("bg4.material.uniforms.uSat.value=TY[k].s;bg4.material.uniforms.uTint.value.set(...TY[k].t)","")
# change only card text, with a left-to-right staggered water-spread animation
old_type="function setType(k){ty=k;document.body.dataset.ty=k;"
new_type="function setType(k){const prev=getComputedStyle(document.body).getPropertyValue('--tx').trim();document.body.style.setProperty('--tx-prev',prev);document.body.dataset.ty=k;document.body.dataset.spread='';requestAnimationFrame(()=>{document.querySelectorAll('.oc').forEach((c,i)=>c.style.setProperty('--card-index',i));document.body.removeAttribute('data-spread');requestAnimationFrame(()=>document.body.setAttribute('data-spread',''));});ty=k;"
if old_type in h:
    h=h.replace(old_type,new_type,1)
else:
    assert "data-spread" in h,'setType marker not found'
open(out,'w',encoding='utf-8').write(h)
print('wrote',out)