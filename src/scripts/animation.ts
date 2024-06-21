// declaring animation observer
const animationObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
  entries.forEach(({ target, isIntersecting }: IntersectionObserverEntry) => {
    if (isIntersecting) {
      const animationClassName = target.getAttribute('data-animation') as string;
      target.classList.add(animationClassName);
      animationObserver.unobserve(target);
    }
  });
},
{ threshold: [0.15, 0.3, 0.5, 0.6] }
);

// setting up animation observers
const animatedElements = document.querySelectorAll("[data-animation]")

animatedElements.forEach((element) => {
  element.classList.add('animated');
  animationObserver.observe(element);
});
