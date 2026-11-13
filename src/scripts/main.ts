import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { initSmoothScroll } from './smooth-scroll';
import { heroSetup, heroIntro, initScrollAnimations, runPreloader } from './animations';
import { initInteractions } from './interactions';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initInteractions(reduced);

if (reduced) {
  document.body.classList.remove('is-loading');
} else {
  const lenis = initSmoothScroll();
  lenis.stop();
  heroSetup();

  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

  Promise.all([runPreloader(), fontsReady]).then(() => {
    try {
      initScrollAnimations();
    } catch (err) {
      // si algo falla, la página nunca debe quedarse bloqueada u oculta
      console.error(err);
      document.documentElement.classList.remove('js');
    } finally {
      document.body.classList.remove('is-loading');
      lenis.start();
      heroIntro();
      ScrollTrigger.refresh();
    }
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
