const navbar = document.querySelector("nav.navbar") as HTMLElement;
const hamburger = navbar.querySelector("span.navbar__hamburger") as HTMLElement;
let isScrolling: boolean = false;

// handling navbar toggle 
hamburger.addEventListener("click", () => {
  navbar.classList.toggle("navbar--open")
});

// handling click outside
document.addEventListener("click", (event: MouseEvent) => {
  if (!navbar.contains(event.target as Node)) {
    navbar.classList.remove("navbar--open");
  }
});

// declaring navbar observer 
const navbarObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]): void => {
  entries.forEach((entry: IntersectionObserverEntry) => {
    if (!isScrolling && entry.isIntersecting) {
      const id = entry.target.id;
      const nav = document.querySelector(`a[href="#${id}"]`);
      const perviousNav = document.querySelector("a.active-nav");
      perviousNav?.classList.remove("active-nav");
      nav?.classList.add("active-nav");
    }
  });
}, 
{threshold: [0.2, 0.4, 0.6, 0.8, 0.9]}
);

// setting up observer for all sections
const allSections = document.querySelectorAll("[id$='-section']");
allSections.forEach((section) => {
navbarObserver.observe(section);
});

//disable navbar observer on scroll
navbar.querySelectorAll("a").forEach((nav) => {
  nav.addEventListener("click", (event: MouseEvent) => {
    isScrolling = true;
    const perviousNav = document.querySelector("a.active-nav") as HTMLElement;
    perviousNav.classList.remove("active-nav");
    if(event.target && event.target instanceof HTMLElement) {
      event.target.classList.add("active-nav");
      setTimeout(() => {
        isScrolling = false;
      }, 800);
    }
  });
});