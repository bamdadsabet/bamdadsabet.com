const navbar = document.querySelector("nav.navbar") as HTMLElement;
const hamburger = navbar.querySelector("span.navbar__hamburger") as HTMLElement;
let isScrolling: boolean = false;


const handelNavbarToggle = (): void => {
  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("navbar--open")
  });
  
  document.addEventListener("click", (event: MouseEvent) => {
    if (!navbar.contains(event.target as Node)) {
      navbar.classList.remove("navbar--open");
    }
  });
}

const disableObserverWhileScrollingByLinkClick = (): void => {
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
}

const setUpObserver = (): void => {
  const onIntersect = (entries: IntersectionObserverEntry[]): void => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (!isScrolling && entry.isIntersecting) {
        const id = entry.target.id;
        const nav = document.querySelector(`a[href="#${id}"]`);
        const perviousNav = document.querySelector("a.active-nav");
        perviousNav?.classList.remove("active-nav");
        nav?.classList.add("active-nav");
      }
    });
  };
  const option = {};
  const navbarObserver = new IntersectionObserver(onIntersect, option);
  const allSections = document.querySelectorAll("[id$='-section']");
  allSections.forEach((section) => {
    navbarObserver.observe(section);
  });
}

const initNavbar = (): void => {
  handelNavbarToggle();
  setUpObserver();
  disableObserverWhileScrollingByLinkClick();
}

initNavbar();

