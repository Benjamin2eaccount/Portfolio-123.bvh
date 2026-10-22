/* Benjamin van Hemert — Portfolio JS */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* MOBIEL MENU */
(function () {
  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('navMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
})();

/* HEADER: schaduw zodra je scrolt */
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 8);
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

/* HERO: kop woord voor woord laten verschijnen */
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const h1 = hero.querySelector('[data-split]');
  if (h1) {
    let delay = 120;
    const split = node => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const outer = document.createElement('span');
            const inner = document.createElement('span');
            outer.className = 'w';
            inner.textContent = part;
            inner.style.setProperty('--d', delay);
            delay += 55;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          split(child);
        }
      });
    };
    split(h1);
  }
  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('ready')));
})();

/* CODEVENSTER: de code wordt getypt */
(function () {
  const pre = document.querySelector('[data-type]');
  if (!pre || reduceMotion) return;
  const segments = [...pre.childNodes].map(n => ({
    cls: n.nodeType === Node.ELEMENT_NODE ? n.className : null,
    text: n.textContent
  }));
  pre.style.height = pre.offsetHeight + 'px';
  pre.textContent = '';
  const caret = document.createElement('span');
  caret.className = 'caret';
  pre.appendChild(caret);

  let s = 0, c = 0, target = null;
  const tick = () => {
    if (s >= segments.length) { pre.style.height = ''; return; }
    const seg = segments[s];
    if (!target) {
      target = seg.cls ? document.createElement('span') : document.createTextNode('');
      if (seg.cls) target.className = seg.cls;
      pre.insertBefore(target, caret);
    }
    const ch = seg.text[c++];
    if (seg.cls) target.textContent += ch; else target.data += ch;
    if (c >= seg.text.length) { s++; c = 0; target = null; }
    setTimeout(tick, ch === '\n' ? 140 : 18 + Math.random() * 30);
  };
  setTimeout(tick, 900);
})();

/* CODEVENSTER: licht kantelen met de muis */
(function () {
  const win = document.querySelector('.code-window');
  const hero = document.querySelector('.hero');
  if (!win || !hero || reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
  hero.addEventListener('mousemove', e => {
    const r = win.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
    const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
    win.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  hero.addEventListener('mouseleave', () => { win.style.transform = ''; });
})();

/* SCROLL REVEAL */
(function () {
  /* kaarten en blokken op de subpagina's krijgen automatisch dezelfde animatie */
  document.querySelectorAll('.group > h2, .group .card, .group .featured, .other-list, .contact-list, .form').forEach(el => {
    if (el.classList.contains('reveal')) return;
    el.classList.add('reveal');
    const siblings = [...el.parentElement.children];
    el.style.setProperty('--i', Math.min(siblings.indexOf(el), 4));
  });

  const els = document.querySelectorAll('.reveal, [data-observe]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach(el => { el.classList.add('is-visible'); el.classList.remove('reveal'); });
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-visible');
      io.unobserve(el);
      /* na de animatie de class weghalen, zodat hover-effecten weer werken */
      if (el.classList.contains('reveal')) {
        const i = parseFloat(getComputedStyle(el).getPropertyValue('--i')) || 0;
        setTimeout(() => el.classList.remove('reveal'), 1000 + i * 80);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(el => io.observe(el));
})();

/* TIJDLIJNEN (werk en opleiding): de lijn vult zich tijdens het scrollen */
(function () {
  const lines = [...document.querySelectorAll('.timeline')];
  if (!lines.length) return;
  let ticking = false;

  const updateOne = tl => {
    const track = tl.querySelector('.tl-track');
    const dots = [...tl.querySelectorAll('.tl-item .tl-dot')];
    if (!track || !dots.length) return;
    const mark = window.innerHeight * 0.65;
    const box = tl.getBoundingClientRect();
    const first = dots[0].getBoundingClientRect();
    const last = dots[dots.length - 1].getBoundingClientRect();
    /* het spoor loopt van de eerste tot de laatste stip */
    track.style.top = (first.top - box.top + first.height / 2) + 'px';
    track.style.bottom = (box.bottom - last.top - last.height / 2) + 'px';
    const r = track.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (mark - r.top) / Math.max(1, r.height)));
    track.style.setProperty('--p', reduceMotion ? 1 : p);
    dots.forEach(d => {
      const b = d.getBoundingClientRect();
      d.parentElement.classList.toggle('is-passed', reduceMotion || b.top + b.height / 2 <= mark);
    });
  };
  const update = () => { ticking = false; lines.forEach(updateOne); };
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  lines.forEach(tl => tl.addEventListener('transitionend', request));
  update();
})();

/* CONTACTFORMULIER: opent het mailprogramma met naam, e-mail en bericht ingevuld */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const subject = form.dataset.subject + ' ' + name;
    const body = form.dataset.labelName + ': ' + name + '\n' +
                 form.dataset.labelEmail + ': ' + email + '\n\n' + message;
    location.href = 'mailto:Benjamin.van.hemert2@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
