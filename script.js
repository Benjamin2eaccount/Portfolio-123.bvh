/* Benjamin van Hemert — Portfolio JS */

/* SCROLL REVEAL */
(function(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));
})();

/* NAVBAR */
(function(){
  const nav=document.getElementById('navbar');
  addEventListener('scroll',()=>{if(nav)nav.classList.toggle('scrolled',scrollY>50)});
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
