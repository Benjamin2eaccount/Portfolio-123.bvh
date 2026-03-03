/* Benjamin van Hemert — Portfolio JS */

/* STARFIELD */
(function(){
  const c=document.getElementById('stars');if(!c)return;
  const ctx=c.getContext('2d');let stars=[];
  function resize(){c.width=innerWidth;c.height=innerHeight;init()}
  function init(){stars=[];const n=Math.min(Math.floor(c.width*c.height/7500),180);for(let i=0;i<n;i++)stars.push({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.3+.2,a:Math.random()*.6+.1,sp:Math.random()*.35+.06,ph:Math.random()*Math.PI*2})}
  function draw(t){ctx.clearRect(0,0,c.width,c.height);for(const s of stars){const tw=Math.sin(t*.001*s.sp*5+s.ph)*.3+.7;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${s.a*tw})`;ctx.fill()}requestAnimationFrame(draw)}
  resize();addEventListener('resize',resize);requestAnimationFrame(draw);
})();

/* SCROLL REVEAL */
(function(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));
})();

/* NAVBAR */
(function(){
  const nav=document.getElementById('navbar');
  addEventListener('scroll',()=>{if(nav)nav.style.background=scrollY>50?'rgba(13,17,23,.97)':'rgba(13,17,23,.88)'});
})();
function toggleMenu(){document.getElementById('navLinks').classList.toggle('open')}
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>document.getElementById('navLinks').classList.remove('open')));

/* PONG BALL */
(function(){
  const ball=document.getElementById('pongBall');if(!ball)return;
  const court=ball.closest('.pong-court');if(!court)return;
  let bx=70,by=36,dx=.5,dy=.32;
  function step(){
    const w=court.clientWidth-14,h=court.clientHeight-12;
    bx+=dx;by+=dy;
    if(bx<=18){bx=18;dx=Math.abs(dx)}
    if(bx>=w-5){bx=w-5;dx=-Math.abs(dx)}
    if(by<=3){by=3;dy=Math.abs(dy)}
    if(by>=h-5){by=h-5;dy=-Math.abs(dy)}
    ball.style.left=bx+'px';ball.style.top=by+'px';
    requestAnimationFrame(step);
  }
  step();
})();

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));if(!t)return;
    e.preventDefault();
    window.scrollTo({top:t.getBoundingClientRect().top+scrollY-68,behavior:'smooth'});
  });
});
