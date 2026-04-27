/* NAV: scroll shadow + mobile burger */
const nav    = document.getElementById('nav');
const burger = document.getElementById('burger');
const links  = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  links.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    links.classList.remove('open');
  });
});

/* SCROLL REVEAL */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.card, .project-card, .contacto__copy, .contacto__form, .section__header'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  observer.observe(el);
});

/* CONTACT FORM: inline validation */
const form = document.getElementById('contactForm');

function showError(id, msg) {
  document.getElementById(id + '-error').textContent = msg;
}
function clearError(id) {
  document.getElementById(id + '-error').textContent = '';
}

['nombre', 'email', 'asunto', 'mensaje'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('input', () => clearError(id));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const nombre  = form.nombre.value.trim();
  const email   = form.email.value.trim();
  const asunto  = form.asunto.value;
  const mensaje = form.mensaje.value.trim();

  if (!nombre) { showError('nombre', 'Por favor ingresa tu nombre.'); valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('email', 'Ingresa un email valido.'); valid = false;
  }
  if (!asunto) { showError('asunto', 'Selecciona un asunto.'); valid = false; }
  if (mensaje.length < 10) { showError('mensaje', 'El mensaje debe tener al menos 10 caracteres.'); valid = false; }

  if (!valid) return;

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  /* Simula envio — reemplaza con tu endpoint o servicio (Formspree, etc.) */
  setTimeout(() => {
    form.reset();
    btn.disabled = false;
    btn.textContent = 'Enviar mensaje';
    const success = document.getElementById('form-success');
    success.hidden = false;
    setTimeout(() => { success.hidden = true; }, 5000);
  }, 1200);
});
