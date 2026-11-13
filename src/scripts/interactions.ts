import { gsap } from 'gsap';
import { getLenis } from './smooth-scroll';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------------- Header ---------------- */
function header() {
  const el = $('[data-header]');
  if (!el) return;
  let last = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    el.classList.toggle('is-scrolled', y > 40);
    const menuOpen = document.body.classList.contains('menu-open');
    el.classList.toggle('is-hidden', !menuOpen && y > last && y > 400);
    last = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------------- Menú móvil ---------------- */
function mobileMenu(reduced: boolean) {
  const burger = $<HTMLButtonElement>('[data-burger]');
  const menu = $('[data-menu]');
  if (!burger || !menu) return;
  const links = $$('[data-menu-link]', menu);
  let open = false;

  const set = (state: boolean) => {
    open = state;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();

    if (reduced) {
      gsap.set(menu, { visibility: open ? 'visible' : 'hidden', clipPath: open ? 'circle(150% at calc(100% - 40px) 40px)' : 'circle(0% at calc(100% - 40px) 40px)' });
      return;
    }
    if (open) {
      gsap.set(menu, { visibility: 'visible' });
      gsap.to(menu, { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.9, ease: 'expo.inOut' });
      gsap.fromTo(links, { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: 'expo.out', delay: 0.3 });
    } else {
      gsap.to(menu, {
        clipPath: 'circle(0% at calc(100% - 40px) 40px)',
        duration: 0.7,
        ease: 'expo.inOut',
        onComplete: () => gsap.set(menu, { visibility: 'hidden' }),
      });
    }
  };

  burger.addEventListener('click', () => set(!open));
  links.forEach((l) => l.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) set(false);
  });
}

/* ---------------- Cursor ---------------- */
function cursor() {
  const root = $('.cursor');
  if (!root || !finePointer()) return;
  const dot = $('.cursor__dot', root)!;
  const ring = $('.cursor__ring', root)!;
  const label = $('.cursor__label', root)!;

  const dx = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

  window.addEventListener('mousemove', (e) => {
    dx(e.clientX);
    dy(e.clientY);
    rx(e.clientX);
    ry(e.clientY);
  });

  document.addEventListener('mouseover', (e) => {
    const t = e.target as HTMLElement;
    const withLabel = t.closest<HTMLElement>('[data-cursor]');
    const interactive = t.closest('a, button, label, input, textarea');
    if (withLabel) {
      label.textContent = withLabel.dataset.cursor ?? '';
      root.classList.add('is-label');
      root.classList.remove('is-hover');
    } else if (interactive) {
      root.classList.add('is-hover');
      root.classList.remove('is-label');
    } else {
      root.classList.remove('is-hover', 'is-label');
    }
  });

  document.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 }));
  document.addEventListener('mouseenter', () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 }));
}

/* ---------------- Botones magnéticos ---------------- */
function magnetic() {
  if (!finePointer()) return;
  $$('[data-magnetic]').forEach((el) => {
    const strength = 0.35;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      gsap.to(el, { x, y, duration: 0.6, ease: 'power3.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/* ---------------- Tilt en tarjetas ---------------- */
function tilt() {
  if (!finePointer()) return;
  $$('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: px * 8, rotateX: -py * 8, transformPerspective: 1200, duration: 0.6, ease: 'power3.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 1, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

/* ---------------- Recursos: imagen que sigue al cursor ---------------- */
function resourcesPreview() {
  const preview = $('[data-res-preview]');
  const inner = $('[data-res-preview-inner]');
  const list = $('.resources__list');
  if (!preview || !inner || !list || !finePointer()) return;

  const px = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' });
  const py = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' });

  list.addEventListener('mousemove', (e) => {
    px(e.clientX);
    py(e.clientY);
  });

  $$<HTMLElement>('[data-res-index]').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const i = parseInt(item.dataset.resIndex ?? '0', 10);
      gsap.to(inner, { yPercent: -100 * i, duration: 0.7, ease: 'expo.out' });
      gsap.to(preview, { opacity: 1, scale: 1, rotate: -4, duration: 0.5, ease: 'expo.out' });
    });
  });

  list.addEventListener('mouseleave', () => {
    gsap.to(preview, { opacity: 0, scale: 0.6, rotate: 0, duration: 0.4, ease: 'power3.in' });
  });
}

/* ---------------- Slider de testimonios ---------------- */
function slider(reduced: boolean) {
  const root = $('[data-slider]');
  if (!root) return;
  const slides = $$('[data-slide]', root);
  const counter = $('[data-slide-current]', root);
  let index = 0;
  let busy = false;
  let timer: number | undefined;

  const go = (next: number, dir = 1) => {
    if (busy || next === index) return;
    const from = slides[index];
    const to = slides[(next + slides.length) % slides.length];
    index = (next + slides.length) % slides.length;
    if (counter) counter.textContent = String(index + 1).padStart(2, '0');

    from.setAttribute('aria-hidden', 'true');
    to.setAttribute('aria-hidden', 'false');

    if (reduced) {
      from.classList.remove('is-active');
      to.classList.add('is-active');
      return;
    }

    busy = true;
    to.classList.add('is-active');
    gsap
      .timeline({
        onComplete: () => {
          from.classList.remove('is-active');
          busy = false;
        },
      })
      .to(from, { opacity: 0, x: -60 * dir, duration: 0.6, ease: 'power3.in' })
      .fromTo(to, { opacity: 0, x: 60 * dir }, { opacity: 1, x: 0, duration: 0.9, ease: 'expo.out' }, '-=0.15');
  };

  const restart = () => {
    window.clearInterval(timer);
    timer = window.setInterval(() => go(index + 1), 7000);
  };

  $('[data-next]', root)?.addEventListener('click', () => {
    go(index + 1, 1);
    restart();
  });
  $('[data-prev]', root)?.addEventListener('click', () => {
    go(index - 1, -1);
    restart();
  });
  root.addEventListener('mouseenter', () => window.clearInterval(timer));
  root.addEventListener('mouseleave', restart);
  restart();
}

/* ---------------- Formulario (sin backend: abre el correo) ---------------- */
function form() {
  const f = $<HTMLFormElement>('[data-form]');
  if (!f) return;
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(f);
    const intereses = data.getAll('interes').join(', ');
    const body = [
      `Nombre: ${data.get('nombre') ?? ''}`,
      `Email: ${data.get('email') ?? ''}`,
      `Centro: ${data.get('centro') ?? ''}`,
      `Intereses: ${intereses}`,
      '',
      String(data.get('mensaje') ?? ''),
    ].join('\n');
    const to = f.dataset.email ?? '';
    window.location.href = `mailto:${to}?subject=${encodeURIComponent('Solicitud de formación')}&body=${encodeURIComponent(body)}`;
  });
}

export function initInteractions(reduced: boolean) {
  header();
  mobileMenu(reduced);
  slider(reduced);
  form();
  if (!reduced) {
    cursor();
    magnetic();
    tilt();
    resourcesPreview();
  }
}
