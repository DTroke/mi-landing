/* ─── NAV ─────────────────────────────────────────────────────── */
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

/* ─── THREE.JS: HERO ICOSAHEDRON ──────────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 7;

  const geo = new THREE.IcosahedronGeometry(2.4, 1);

  const mesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
    color: 0x7c5cfc,
    emissive: 0x1a0d4a,
    transparent: true,
    opacity: 0.13,
    flatShading: true,
    side: THREE.DoubleSide,
  }));

  mesh.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(geo),
    new THREE.LineBasicMaterial({ color: 0xc4b5fd, transparent: true, opacity: 0.55 })
  ));

  scene.add(mesh);
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  const pLight = new THREE.PointLight(0x7c5cfc, 3, 20);
  pLight.position.set(5, 5, 5);
  scene.add(pLight);

  let t = 0;

  function onResize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  (function animate() {
    requestAnimationFrame(animate);
    t += 0.005;
    mesh.rotation.y += 0.004;
    mesh.rotation.x = Math.sin(t * 0.4) * 0.15;
    renderer.render(scene, camera);
  })();

  onResize();
  window.addEventListener('resize', onResize, { passive: true });
})();

/* ─── CURSOR GLOW ─────────────────────────────────────────────── */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.getElementById('cursor-glow');
  if (glow) {
    document.addEventListener('mousemove', (e) => {
      glow.style.transform = `translate(${e.clientX - 260}px, ${e.clientY - 260}px)`;
    }, { passive: true });
  }
}

/* ─── CARD 3D TILT ────────────────────────────────────────────── */
document.querySelectorAll('.card, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    card.style.transition = 'border-color .3s, box-shadow .3s';
    card.style.transform  = `perspective(900px) rotateX(${-dy * 12}deg) rotateY(${dx * 12}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = '';
    card.style.transform  = '';
  });
});

/* ─── GSAP: HERO ENTRANCE ─────────────────────────────────────── */
if (typeof gsap !== 'undefined') {
  const els = [
    '.hero__eyebrow',
    '.hero__title',
    '.hero__sub',
    '.hero__desc',
    '.hero__actions',
    '.hero__stack',
  ];
  gsap.set(els, { opacity: 0, y: 28 });
  gsap.to(els, {
    opacity: 1,
    y: 0,
    duration: 0.75,
    stagger: 0.12,
    delay: 0.2,
    ease: 'power3.out',
    clearProps: 'all',
  });
}

/* ─── SCROLL REVEAL ───────────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    e.target.classList.toggle('visible', e.isIntersecting);
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.card, .project-card, .contacto__copy, .contacto__form, .section__header'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  observer.observe(el);
});

/* ─── CONTACT FORM ────────────────────────────────────────────── */
const form = document.getElementById('contactForm');

function showError(id, msg) {
  document.getElementById(id + '-error').textContent = msg;
}
function clearError(id) {
  document.getElementById(id + '-error').textContent = '';
}

['nombre', 'email', 'asunto', 'mensaje'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => clearError(id));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const nombre  = form.nombre.value.trim();
  const email   = form.email.value.trim();
  const asunto  = form.asunto.value;
  const mensaje = form.mensaje.value.trim();

  if (!nombre)  { showError('nombre',  'Por favor ingresa tu nombre.'); valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('email', 'Ingresa un email valido.'); valid = false;
  }
  if (!asunto)  { showError('asunto',  'Selecciona un asunto.'); valid = false; }
  if (mensaje.length < 10) { showError('mensaje', 'El mensaje debe tener al menos 10 caracteres.'); valid = false; }

  if (!valid) return;

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  /* Reemplaza con tu endpoint (Formspree, etc.) */
  setTimeout(() => {
    form.reset();
    btn.disabled = false;
    btn.textContent = 'Enviar mensaje';
    const success = document.getElementById('form-success');
    success.hidden = false;
    setTimeout(() => { success.hidden = true; }, 5000);
  }, 1200);
});
