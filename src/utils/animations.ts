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
