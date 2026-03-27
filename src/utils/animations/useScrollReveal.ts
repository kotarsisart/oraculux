import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    /**
     * Uses IntersectionObserver instead of scroll listeners
     * for better performance and no manual throttling.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            /**
             * Adds a CSS class once element becomes visible.
             * Animation is fully handled in CSS.
             */
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    /**
     * Select all elements that should animate on scroll.
     * Keeps the hook generic and reusable.
     */
    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => observer.observe(el));

    /**
     * Cleanup observer on unmount to avoid memory leaks.
     */
    return () => observer.disconnect();
  }, []);
}
