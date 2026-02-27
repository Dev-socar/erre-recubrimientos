import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function observerAnimations<T extends HTMLElement>(
  className: string,
): void {
  if (typeof window === "undefined") return;

  const items: NodeListOf<T> = document.querySelectorAll<T>(`.${className}`);

  const observer: IntersectionObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      entries.forEach((entry) => {
        const target = entry.target as T;

        if (entry.isIntersecting) {
          target.classList.remove("opacity-0", "translate-y-10");
          target.classList.add("opacity-100", "translate-y-0");
          obs.unobserve(target);
        }
      });
    },
    { threshold: 0.15 },
  );

  items.forEach((item) => observer.observe(item));
}

export function initMobileMenu() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const curtain = document.querySelector(".menu-curtain");
  const content = document.querySelector(".menu-content");
  const lines = document.querySelectorAll(".line");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const footerInfo = document.querySelector(".footer-info");

  if (!btn || !menu) return;

  let isOpen = false;

  const tl = gsap.timeline({ paused: true });

  tl.set(menu, { autoAlpha: 1 })
    .to(curtain, { translateY: "0%", duration: 0.6, ease: "expo.inOut" })
    .to(
      content,
      { translateY: "0%", duration: 0.6, ease: "expo.inOut" },
      "-=0.4",
    )
    .to(
      mobileLinks,
      { y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
      "-=0.2",
    )
    .to(footerInfo, { opacity: 1, y: -20, duration: 0.4 }, "-=0.5");

  const toggleMenu = () => {
    isOpen = !isOpen;

    gsap.to(lines[0], {
      rotate: isOpen ? 45 : 0,
      y: isOpen ? 5 : 0,
      duration: 0.4,
    });

    gsap.to(lines[1], {
      rotate: isOpen ? -45 : 0,
      y: isOpen ? -5 : 0,
      duration: 0.4,
    });

    isOpen ? tl.play() : tl.reverse();
  };

  btn.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isOpen) toggleMenu();
    });
  });
}

export function initReviewAnimations() {
  const items = document.querySelectorAll(".review-item");

  if (!items.length) return;

  gsap.from(items, {
    scrollTrigger: {
      trigger: ".reviews-grid",
      start: "top 85%",
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: "expo.out",
  });

  if (window.innerWidth > 768) {
    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          y: -10,
          borderColor: "#EAB308",
          duration: 0.4,
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          y: 0,
          borderColor: "#f3f4f6",
          duration: 0.4,
        });
      });
    });
  }
}

export function initScrollProgress() {
  const bar = document.getElementById("scroll-progress-bar");
  if (!bar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    gsap.to(bar, {
      width: `${progress}%`,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  window.addEventListener("scroll", updateProgress);

  updateProgress();
}