import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/* ---------------- Preloader ---------------- */
export function runPreloader(): Promise<void> {
  return new Promise((resolve) => {
    const pre = $('.preloader');
    if (!pre) return resolve();
    const countEl = $('[data-count]', pre);
    const counter = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        pre.remove();
      },
    });

    tl.to(counter, {
      v: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (countEl) countEl.textContent = String(Math.round(counter.v));
      },
    })
      .to('.preloader__bar span', { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0)
      .to('.preloader__inner', { y: -40, opacity: 0, duration: 0.5, ease: 'power2.in' })
      .to('.preloader__curtain', { y: '0%', duration: 0.7, ease: 'expo.inOut' }, '-=0.2')
      .add(() => resolve())
      .to(pre, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' });
  });
}

/* ---------------- Hero ---------------- */
export function heroSetup() {
  gsap.set('.hero__word, .hero__dot', { yPercent: 110 });
  gsap.set('.hero__fade', { y: 30, opacity: 0 });
  gsap.set('[data-hero-media]', { clipPath: 'inset(100% 0% 0% 0%)' });
  gsap.set('[data-hero-media] img', { scale: 1.45 });
  gsap.set('.hero__badge', { scale: 0, rotate: -90 });
}

export function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.to('.hero__word, .hero__dot', { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0.15)
    .to('[data-hero-media]', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' }, 0.3)
    .to('[data-hero-media] img', { scale: 1.15, duration: 2, ease: 'expo.out' }, 0.5)
    .to('.hero__fade', { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 }, 0.8)
    .to('.hero__badge', { scale: 1, rotate: 0, duration: 1.4 }, 1);

  gsap.to('.hero__badge-text', { rotate: 360, duration: 18, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });

  // scroll: parallax del hero
  gsap.to('[data-hero-media] img', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero__title', {
    yPercent: -30,
    opacity: 0.2,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('.hero__orb', {
    scale: 1.4,
    xPercent: -20,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
}

/* ---------------- Reveals genéricos ---------------- */
function reveals() {
  gsap.set('[data-reveal="up"]', { y: 60 });
  ScrollTrigger.batch('[data-reveal="up"]', {
    start: 'top 88%',
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.1 }),
  });

  ScrollTrigger.batch('[data-reveal="fade"]', {
    start: 'top 88%',
    onEnter: (els) => gsap.to(els, { opacity: 1, duration: 1.4, ease: 'power2.out', stagger: 0.1 }),
  });

  $$('[data-reveal="clip"]').forEach((el) => {
    const img = $('img', el);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } });
    tl.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' });
    if (img) tl.from(img, { scale: 1.35, duration: 1.8, ease: 'expo.out' }, 0.2);
  });
}

function splitHeadings() {
  $$('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 110,
          rotate: 2,
          duration: 1.3,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
      },
    });
  });
}

function highlightText() {
  $$('[data-highlight]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words' });
    gsap.fromTo(
      split.words,
      { opacity: 0.14 },
      {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      },
    );
  });
}

function parallax() {
  $$('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax ?? '0.2') * 40;
    const section = el.closest('section') ?? el;
    gsap.fromTo(
      el,
      { yPercent: -amount },
      { yPercent: amount, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });

  $$('[data-parallax-img]').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -12 },
      { yPercent: 0, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });

  $$('[data-spin]').forEach((el) => {
    gsap.to(el, {
      rotate: 30,
      y: -40,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  });
}

function counters() {
  $$('[data-counter]').forEach((el) => {
    const target = parseFloat(el.dataset.counter ?? '0');
    const decimals = parseInt(el.dataset.decimals ?? '0', 10);
    const fmt = (n: number) =>
      n.toLocaleString('es-ES', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const obj = { v: 0 };
    el.textContent = fmt(0);
    gsap.to(obj, {
      v: target,
      duration: 2.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      onUpdate: () => {
        el.textContent = fmt(obj.v);
      },
    });
  });
}

function marquee() {
  const tweens: gsap.core.Tween[] = [];
  $$('[data-marquee]').forEach((row) => {
    const track = $('.marquee__track', row);
    if (!track) return;
    const dir = row.dataset.direction === '-1' ? -1 : 1;
    const tween =
      dir === 1
        ? gsap.to(track, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
        : gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration: 40, ease: 'none', repeat: -1 });
    tweens.push(tween);
  });

  ScrollTrigger.create({
    trigger: '.marquee',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate(self) {
      const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6);
      tweens.forEach((t) => {
        t.timeScale(boost);
        gsap.to(t, { timeScale: 1, duration: 1.2, ease: 'power2.out', overwrite: true });
      });
    },
  });

  gsap.from('.marquee__row--reverse', {
    xPercent: 8,
    ease: 'none',
    scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

function methodHorizontal() {
  const section = $('[data-method]');
  const track = $('[data-method-track]');
  if (!section || !track) return;

  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    tl.to(track, { x: () => -distance(), ease: 'none' }, 0).to('[data-method-progress]', { scaleX: 1, ease: 'none' }, 0);

    $$('.step', track).forEach((step, i) => {
      gsap.from(step, {
        y: 80 + i * 20,
        opacity: 0,
        rotate: 3,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
        delay: i * 0.08,
      });
    });
  });

  mm.add('(max-width: 899px)', () => {
    $$('.step', track).forEach((step) => {
      gsap.from(step, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: step, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });
  });
}

function gallery() {
  $$('.gallery__col').forEach((col) => {
    const speed = parseFloat(col.dataset.speed ?? '0');
    gsap.to(col, {
      y: () => speed * 18,
      ease: 'none',
      scrollTrigger: { trigger: '.gallery__grid', start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
    });
  });
}

function footer() {
  gsap.from('[data-footer-big] span', {
    yPercent: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.05,
    scrollTrigger: { trigger: '[data-footer-big]', start: 'top 95%', toggleActions: 'play none none none' },
  });
}

function sectionColorShift() {
  // las secciones claras entran con un leve escalado redondeado
  $$('.section--light:not(.stats)').forEach((sec) => {
    gsap.fromTo(
      sec,
      { borderRadius: '48px 48px 0 0' },
      { borderRadius: '0px 0px 0 0', ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 40%', scrub: true } },
    );
  });
}

export function initScrollAnimations() {
  reveals();
  splitHeadings();
  highlightText();
  parallax();
  counters();
  marquee();
  methodHorizontal();
  gallery();
  footer();
  sectionColorShift();
}
