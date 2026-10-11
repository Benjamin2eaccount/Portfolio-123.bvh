/* Benjamin van Hemert — Portfolio JS */

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
