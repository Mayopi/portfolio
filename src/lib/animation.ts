import { animate } from 'animejs/animation';
import { createTimeline } from 'animejs/timeline';
import { stagger, set } from 'animejs/utils';

export function createScrollReveal(options: any) {
  const {
    targets,
    translateY = [50, 0],
    opacity = [0, 1],
    scale = [0.9, 1],
    duration = 1200,
    delay = 0,
    easing = 'easeOutExpo',
    stagger: staggerValue,
  } = options;

  return animate(targets, {
    translateY,
    opacity,
    scale,
    duration,
    delay,
    easing,
    stagger: staggerValue,
    autoplay: false,
  });
}

export function createStaggerAnimation(options: any) {
  const {
    targets,
    translateY = [30, 0],
    opacity = [0, 1],
    duration = 800,
    easing = 'easeOutQuad',
    stagger: staggerValue = 100,
  } = options;

  return animate(targets, {
    translateY,
    opacity,
    duration,
    easing,
    stagger: staggerValue,
    autoplay: false,
  });
}

export function createParallaxAnimation(
  element: Element,
  speed: number = 0.1
) {
  let targetY = 0;
  let currentY = 0;

  const onMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaY = (e.clientY - centerY) * speed;
    
    targetY = deltaY;
  };

  const animateLoop = () => {
    currentY += (targetY - currentY) * 0.1;
    set(element, { translateY: currentY });
    requestAnimationFrame(animateLoop);
  };

  window.addEventListener('mousemove', onMove);
  animateLoop();

  return () => window.removeEventListener('mousemove', onMove);
}

export function createEntranceAnimation(options: any) {
  const { targets, delay = 0, duration = 1000 } = options;

  return animate(targets, {
    opacity: [0, 1],
    translateY: [30, 0],
    scale: [0.95, 1],
    duration,
    delay,
    easing: 'easeOutExpo',
  });
}

export function createTimelineAnimation() {
  return createTimeline({
    autoplay: false,
  });
}

export function animateOnScroll(
  element: string | Element | NodeListOf<Element>,
  options: any = {}
) {
  const {
    translateY = [50, 0],
    opacity = [0, 1],
    scale = [0.9, 1],
    duration = 1200,
    delay = 0,
    easing = 'easeOutExpo',
    threshold = 0.2,
  } = options;

  const elements = typeof element === 'string' 
    ? document.querySelectorAll(element) 
    : element instanceof NodeList 
      ? element 
      : [element];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target as Element, {
            translateY,
            opacity,
            scale,
            duration,
            delay,
            easing,
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}

export { animate, set, createTimeline, stagger };