import { useEffect } from "react";
import "../styles/sections/_ritual.scss";
import { oracle, ritual } from "../../data/ritual";
import { useI18n } from "../../data/I18nProvider";
import { safeArray } from "../../core/utils/safeArray";

export default function Ritual() {
  const { t } = useI18n();

  useEffect(() => {
    /**
     * Stores remaining answers per question to avoid immediate repetition.
     * Once exhausted — resets (shuffle-like behavior).
     */
    const remainingAnswers: Record<string, string[]> = {};

    function getRandomAnswer(key: keyof typeof oracle) {
      const answers = safeArray(t(oracle[key].answersKey));
      if (!answers.length) return "...";

      if (!remainingAnswers[key] || remainingAnswers[key].length === 0) {
        remainingAnswers[key] = [...answers];
      }

      const arr = remainingAnswers[key];
      const i = Math.floor(Math.random() * arr.length);
      const val = arr[i];
      arr.splice(i, 1);
      return val;
    }

    let globalCarouselPausedSetter: null | ((
      v: boolean,
      forced?: boolean
    ) => void) = null;

    let globalCarouselAnimationFrame: number | null = null;

    /* ------------------------------------------------------
       1) LINEAR CAROUSEL (MOBILE)
    ------------------------------------------------------ */
    function initRitualCarousel(opts: {
      containerSelector: string;
      scrollSpeed: number;
    }) {
      const { containerSelector, scrollSpeed } = opts;

      const container = document.querySelector(
        containerSelector
      ) as HTMLElement | null;
      if (!container) return;

      const track = container.querySelector(
        ".ritual__carousel-track"
      ) as HTMLElement | null;
      if (!track) return;

      const _container = container;
      const _track = track;

      /**
       * Duplicate items to create infinite scroll illusion.
       */
      const items = Array.from(_track.children);
      items.forEach((el) => _track.appendChild(el.cloneNode(true)));

      let isPaused = false;
      let isForcedPaused = false;

      function setPaused(val: boolean, forced = false) {
        if (forced) {
          isForcedPaused = val;
          isPaused = val;
        } else if (!isForcedPaused) {
          isPaused = val;
        }
      }

      globalCarouselPausedSetter = setPaused;

      function animate() {
        if (!isPaused) {
          _container.scrollLeft += scrollSpeed;
          if (_container.scrollLeft >= _track.scrollWidth / 2) {
            _container.scrollLeft = 0;
          }
        }
        globalCarouselAnimationFrame = requestAnimationFrame(animate);
      }

      animate();
    }

    /* ------------------------------------------------------
       2) CIRCULAR CAROUSEL (DESKTOP)
    ------------------------------------------------------ */
    function initCircularCarousel(opts: {
      containerSelector: string;
      center: number;
      radius: number;
      rotationSpeed: number;
    }) {
      const { containerSelector, center, radius, rotationSpeed } = opts;

      const track = document.querySelector(
        `${containerSelector} .ritual__carousel-track`
      ) as HTMLElement | null;

      if (!track) return;

      const _track = track;

      const circles = _track.querySelectorAll(
        ".ritual__circle"
      ) as NodeListOf<HTMLElement>;
      if (!circles.length) return;

      const total = circles.length;

      /**
       * Precompute circle positions on a circular path.
       */
      const circleData: { element: HTMLElement; baseAngle: number }[] = [];

      circles.forEach((circle, index) => {
        const angle = (index / total) * 2 * Math.PI;

        const x = center + radius * Math.cos(angle) - circle.offsetWidth / 2;
        const y = center + radius * Math.sin(angle) - circle.offsetHeight / 2;

        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        circleData.push({ element: circle, baseAngle: angle });
      });

      let angle = 0;
      let isPaused = false;
      let isForcedPaused = false;

      function setPaused(val: boolean, forced = false) {
        if (forced) {
          isForcedPaused = val;
          isPaused = val;
        } else if (!isForcedPaused) {
          isPaused = val;
        }
      }

      globalCarouselPausedSetter = setPaused;

      function rotate() {
        if (!isPaused) {
          angle += rotationSpeed;
          _track.style.transform = `rotate(${angle}deg)`;

          circleData.forEach(({ element }) => {
            element.style.transform = `rotate(${-angle}deg)`;
          });
        }

        globalCarouselAnimationFrame = requestAnimationFrame(rotate);
      }

      rotate();

      /**
       * Pause on interaction (desktop + touch fallback)
       */

      _track.addEventListener("mouseenter", () => setPaused(true));
      _track.addEventListener("mouseleave", () => setPaused(false));
      _track.addEventListener("touchstart", () => setPaused(true));
      _track.addEventListener("touchend", () => setPaused(false));
    }

    /* ------------------------------------------------------
       3) CIRCLE SETUP
    ------------------------------------------------------ */
    function setupRitualCircle(circle: HTMLElement) {
      const inner = circle.querySelector(
        ".ritual__circle-inner"
      ) as HTMLElement | null;
      if (!inner) return;

      const key = circle.dataset.questionId as keyof typeof oracle;
      if (!key) return;

      const answerEl = inner.querySelector(
        ".ritual__circle-text--answer"
      ) as HTMLElement | null;
      const questionEl = inner.querySelector(
        ".ritual__circle-text--question"
      ) as HTMLElement | null;

      if (!answerEl || !questionEl) return;

      const _answerEl = answerEl;
      const _questionEl = questionEl;

      _questionEl.textContent = t(oracle[key].questionKey);

      /**
       * Dynamically injected UI states (hover / scanning)
       */
      const hoverText = document.createElement("p");
      hoverText.className = "ritual__circle-text ritual__circle-text--hover";
      hoverText.textContent = t(ritual.hoverKey);
      inner.appendChild(hoverText);

      const scanText = document.createElement("p");
      scanText.className = "ritual__circle-text ritual__circle-text--scanning";
      scanText.textContent = t(ritual.scanningKey);
      inner.appendChild(scanText);

      let currentState = "question";
      let timers: number[] = [];

      circle.dataset.state = "question";

      const isTouch = !window.matchMedia("(hover: hover)").matches;

      const pauseCarousel = (val: boolean, forced = false) => {
        if (globalCarouselPausedSetter) globalCarouselPausedSetter(val, forced);
      };

      function switchState(s: string) {
        circle.dataset.state = s;

        _questionEl.style.opacity = s === "question" ? "1" : "0";
        hoverText.style.opacity = s === "hover" ? "1" : "0";
        scanText.style.opacity = s === "scanning" ? "1" : "0";

        if (s === "question") _answerEl.textContent = "";
        if (s === "answer") _answerEl.textContent = getRandomAnswer(key);
      }

      function clearTimers() {
        timers.forEach((t) => clearTimeout(t));
        timers = [];
      }

      const SCANNING_DURATION = 2000;
      const PAUSE_BEFORE_ANSWER = 3000;
      const ANSWER_DURATION = 6000;
      const FADE_DURATION = 800;

      /**
       * Timed state sequence (mini state machine)
       */

      function startProcess() {
        clearTimers();
        pauseCarousel(true, true);

        currentState = "scanning";
        switchState("scanning");

        timers.push(
          setTimeout(() => {
            currentState = "waiting";
            switchState("waiting");

            timers.push(
              setTimeout(() => {
                currentState = "answer";
                switchState("answer");

                timers.push(
                  setTimeout(() => {
                    switchState("fading");

                    timers.push(
                      setTimeout(() => {
                        currentState = "question";
                        switchState("question");
                        pauseCarousel(false, true);
                      }, FADE_DURATION)
                    );
                  }, ANSWER_DURATION)
                );
              }, PAUSE_BEFORE_ANSWER)
            );
          }, SCANNING_DURATION)
        );
      }

      /**
       * Interaction logic (hover vs touch devices)
       */
      circle.addEventListener("mouseenter", () => {
        if (!isTouch && currentState === "question") {
          currentState = "hover";
          switchState("hover");
          pauseCarousel(true);
        }
      });

      circle.addEventListener("mouseleave", () => {
        if (!isTouch && currentState === "hover") {
          currentState = "question";
          switchState("question");
          pauseCarousel(false);
        }
      });

      circle.addEventListener("click", () => {
        if (isTouch) {
          if (currentState === "question") {
            currentState = "hover";
            switchState("hover");
            return;
          }
          if (currentState === "hover") startProcess();
          return;
        }

        if (!isTouch && (currentState === "question" || currentState === "hover")) {
          startProcess();
        }
      });
    }

    /* ------------------------------------------------------
       4) INIT EVERYTHING
    ------------------------------------------------------ */
    function initRitual() {
      if (globalCarouselAnimationFrame !== null) {
        cancelAnimationFrame(globalCarouselAnimationFrame);
        globalCarouselAnimationFrame = null;
      }

      const isPhone = window.innerWidth < 768;

      document.querySelectorAll(".ritual__circle").forEach((el) => {
        setupRitualCircle(el as HTMLElement);
      });

      if (isPhone) {
        initRitualCarousel({
          containerSelector: ".ritual__carousel",
          scrollSpeed: 0.3,
        });
      } else {
        initCircularCarousel({
          containerSelector: ".ritual__carousel",
          center: 335,
          radius: 230,
          rotationSpeed: 0.15,
        });
      }
    }


    /**
     * Wait for fonts to load to avoid layout shifts (important for positioning)
     */
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initRitual();
        });
      });
    });

    return () => {
      if (globalCarouselAnimationFrame !== null) {
        cancelAnimationFrame(globalCarouselAnimationFrame);
      }
    };
  }, [t]);

  const questionKeys = Object.keys(oracle);

  return (
    <section className="ritual" id="common-question">
      <h2 className="ritual__title fade-up delay-600">{t(ritual.titleKey)}</h2>
      <h3 className="ritual__description fade-up delay-1000">{t(ritual.descriptionKey)}</h3>

      <div className="ritual__carousel">
        <div className="ritual__carousel-track">
          {questionKeys.map((key) => (
            <div
              key={key}
              data-question-id={key}
              data-state="question"
              className="ritual__circle"
            >
              <div className="ritual__circle-inner">
                <p className="ritual__circle-text ritual__circle-text--question"></p>
                <p className="ritual__circle-text ritual__circle-text--answer"></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
