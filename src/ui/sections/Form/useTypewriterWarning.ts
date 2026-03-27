import { useRef } from "react";

/**
 * Configuration options for the typewriter warning behavior.
 */
type Options = {
  /** Delay between each character (ms) */
  typingSpeed?: number;

  /** Base visibility duration before auto-hide (ms) */
  showDuration?: number;
};

/**
 * Custom hook that renders a dynamic warning message
 * with a typewriter animation and auto-hide behavior.
 *
 * This hook is intentionally implemented with direct DOM manipulation
 * instead of React state to:
 * - avoid unnecessary re-renders during character-by-character typing
 * - allow fine-grained control over animation timing
 * - keep the animation fully imperative and isolated
 *
 * @param iconSrc - path to warning icon
 * @param iconAlt - accessibility alt text for the icon
 * @param options - optional timing configuration
 */
export function useTypewriterWarning(
  iconSrc: string,
  iconAlt: string,
  options?: Options
) {
  const {
    typingSpeed = 25,
    showDuration = 4000,
  } = options || {};

  /**
   * Store timeout IDs to allow proper cleanup
   * and prevent overlapping animations.
   */
  const hideTimeout = useRef<number | null>(null);
  const typeTimeout = useRef<number | null>(null);

  /**
   * Clears all active timers to prevent:
   * - memory leaks
   * - race conditions between multiple warnings
   */
  function clearTimers() {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    if (typeTimeout.current) clearTimeout(typeTimeout.current);
  }

  /**
   * Simulates a typewriter effect by appending characters
   * one by one using recursive setTimeout.
   *
   * This approach was chosen over setInterval to:
   * - allow better control over stopping/interrupting the animation
   * - avoid drift issues common with intervals
   */
  function typeLine(element: HTMLElement, text: string, cb?: () => void) {
    let i = 0;

    function tick() {
      element.textContent += text[i];
      i++;

      if (i < text.length) {
        typeTimeout.current = setTimeout(tick, typingSpeed);
      } else {
        cb?.();
      }
    }

    tick();
  }

  /**
   * Displays the warning message with:
   * - icon
   * - animated text
   * - controlled visibility lifecycle
   *
   * Flow:
   * 1. Reset previous state
   * 2. Build DOM structure
   * 3. Trigger CSS animation
   * 4. Start typewriter effect
   * 5. Schedule auto-hide
   */
  function showWarning(box: HTMLDivElement, text: string) {
    clearTimers();

    // Reset visibility state
    box.classList.remove("hide");
    box.classList.remove("show");
    box.style.pointerEvents = "auto";

    // Clear previous content
    box.innerHTML = "";

    /**
     * Create icon element (kept outside React tree intentionally)
     */
    const icon = document.createElement("img");
    icon.src = iconSrc;
    icon.alt = iconAlt;
    icon.className = "form__warning-icon";

    /**
     * Create text container
     */
    const textWrap = document.createElement("div");
    textWrap.className = "form__warning-text";

    const line = document.createElement("div");
    line.className = "form__warning-line";

    textWrap.appendChild(line);
    box.appendChild(icon);
    box.appendChild(textWrap);

    /**
     * Trigger CSS transition on next frame
     * to ensure proper animation start
     */
    requestAnimationFrame(() => {
      box.classList.add("show");
    });

    // Start typing animation
    typeLine(line, text);

    /**
     * Auto-hide after:
     * base duration + full typing time
     */
    hideTimeout.current = setTimeout(
      () => hideWarning(box),
      showDuration + text.length * typingSpeed
    );
  }

  /**
   * Hides the warning with animation and cleans up DOM.
   */
  function hideWarning(box: HTMLDivElement) {
    box.classList.remove("show");
    box.classList.add("hide");

    hideTimeout.current = setTimeout(() => {
      box.innerHTML = "";
      box.style.pointerEvents = "none";
    }, 500); // matches CSS transition duration
  }

  return { showWarning, hideWarning };
}