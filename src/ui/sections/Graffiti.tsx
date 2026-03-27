import { useEffect, useState } from "react";
import {
  graffitiTop,
  graffitiMidTop,
  graffitiCenter,
  graffitiMidBottom,
  graffitiBottom,
  graffitiMobile,
  type GraffitiPhrase
} from "../../data/graffiti";
import "../styles/sections/_graffiti.scss";
import { useI18n } from "../../data/I18nProvider";

export default function Graffiti() {
  /**
   * Stores dynamically generated animation strings per phrase.
   * This avoids recalculating randomness on every render.
   */

  const [animations, setAnimations] = useState<Record<string, string>>({});

  /**
   * Controls interactive error phrases (toggle state).
   */
  const [errorStates, setErrorStates] = useState<Record<string, boolean>>({});

  const { t } = useI18n();

  useEffect(() => {
    const result: Record<string, string> = {};

    /**
     * Flatten all phrase groups to apply consistent animation logic.
     */
    const all = [
      ...graffitiTop,
      ...graffitiMidTop,
      ...graffitiCenter,
      ...graffitiMidBottom,
      ...graffitiBottom,
      ...graffitiMobile,
    ];

    all.forEach((p) => {
      if (p.isError) {
        /**
         * Error phrases are static — no animation applied.
         */
        result[p.id] = "none";
      } else {
        /**
         * Randomized animation parameters create a more organic,
         * non-repetitive visual effect.
         */
        const delay = (Math.random() * 4).toFixed(2);
        const duration = (2 + Math.random() * 2).toFixed(2);
        result[p.id] = `sparkle ${duration}s ease-in-out ${delay}s infinite`;
      }
    });

    setAnimations(result);
  }, []);

  /**
   * Toggles interactive error state (used for specific phrases).
   */
  const toggleError = (id: string) => {
    setErrorStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderPhrase = (p: GraffitiPhrase) => {
    const isError = p.isError;
    const toggled = errorStates[p.id];

    let className = "graffiti__phrase";

    if (!isError) {
      className += ` graffiti__phrase-${p.id}`;
    }

    /**
     * Special-case styling for error variants.
     * Kept explicit to match design requirements.
     */
    if (isError && p.id === "error-d") {
      className += " error-phrase error-phrase-d";
    }

    if (isError && p.id === "error-m") {
      className += " error-phrase error-phrase-m";
    }

    /**
     * Toggle reveals alternate text (interaction-driven state).
     */
    if (isError && toggled) {
      className += " show-hover-text";
    }

    return (
      <span
        key={p.id}
        data-id={p.id}
        data-i18n={p.key}
        className={className}
        style={{
          animation: animations[p.id],
          /**
           * Hint browser for animation optimization.
           * Applied only to animated elements to avoid unnecessary overhead.
           */
          willChange: !isError ? "opacity, filter, text-shadow" : "auto",
        }}
        onClick={() => p.id === "error-m" && toggleError(p.id)}
      >
        <span className="error-phrase__default">
          {t(p.key)}
        </span>

        {isError && (
          <span
            className="error-phrase__hover"
            data-i18n="graffiti.errorHover"
          >
            {t("graffiti.errorHover")}
          </span>
        )}
      </span>
    );
  };

  return (
    <section className="graffiti">
      <div className="graffiti__row graffiti__row--top">
        {graffitiTop.map(renderPhrase)}
      </div>

      <div className="graffiti__row graffiti__row--mid-top">
        {graffitiMidTop.map(renderPhrase)}
      </div>

      <div className="graffiti__row graffiti__row--center">
        {graffitiCenter.map(renderPhrase)}
      </div>

      <div className="graffiti__row graffiti__row--mid-bottom">
        {graffitiMidBottom.map(renderPhrase)}
      </div>

      <div className="graffiti__row graffiti__row--bottom">
        {graffitiBottom.map(renderPhrase)}
      </div>

      <div className="graffiti__row graffiti__row--mobile">
        {graffitiMobile.map(renderPhrase)}
      </div>
    </section>
  );
}
