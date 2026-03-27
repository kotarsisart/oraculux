import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import eyeAnim from "../../assets/animations/eye-oraculux.json";
import "../styles/sections/_hero.scss";
import { useI18n } from "../../data/I18nProvider";

export default function Hero() {
  const { t } = useI18n();

  /**
   * Ref for mounting Lottie animation (imperative DOM control).
   */
  const eyeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!eyeRef.current) return;

    /**
     * Initialize Lottie animation manually.
     * Using Lottie here avoids heavy video assets and allows fine control.
     */
    const anim = lottie.loadAnimation({
      container: eyeRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: eyeAnim,
    });

    /**
     * Cleanup to prevent memory leaks when component unmounts.
     */
    return () => anim.destroy();
  }, []);

  const [modal, setModal] = useState(false);
  const [closing, setClosing] = useState(false);

  /**
   * Handles modal closing with animation delay.
   * Keeps component mounted long enough for CSS transition to finish.
   */
  const closeModal = () => {
    setClosing(true);

    setTimeout(() => {
      setModal(false);
      setClosing(false);
    }, 350); // Must match CSS animation duration
  };

  return (
    <>
      {/* Modal is conditionally rendered to avoid unnecessary DOM presence */}
      {modal && (
        <div className={`oracle-modal ${closing ? "closing" : "open"}`}>
          <div className="oracle-modal__overlay" />

          <div className="oracle-modal__content">
            <p className="oracle-modal__content-text">
              {t("hero.modal.text")}
            </p>

            <a
              className="oracle-modal__button"
              href="https://t.me/The_Oraculux_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("hero.modal.button")}
            </a>

            <p className="oracle-modal__close" onClick={closeModal}>
              ×
            </p>
          </div>
        </div>
      )}

      {/* Hero section with animated focal point (eye) */}
      <section className="hero" id="hero">
        <div className="hero__eye">
          {/* Lottie animation container */}
          <div className="hero__eye-animation" ref={eyeRef}></div>
        </div>

        <h1 className="hero__title fade-up delay-1200">
          {t("hero.title")}
        </h1>

        <p className="hero__subline fade-up delay-1400">
          {t("hero.subline")}
        </p>

        <div className="fade-up delay-1600">
          {/* Opens modal instead of navigation to keep user in flow */}
          <button
            className="hero__button"
            onClick={() => setModal(true)}
          >
            {t("hero.button")}
          </button>
        </div>
      </section>
    </>
  );
}
