import { useEffect, useRef, useState } from "react";
import { useI18n } from "../../../data/I18nProvider";

import { usePortalAnimation } from "./usePortalAnimation";
import { useFormSubmit } from "./useFormSubmit";
import { FORM_ANIM } from "./constants";
import { useTypewriterWarning } from "./useTypewriterWarning";

import eye from "../../../assets/icons/form/eye.png";
import portalSvg from "../../../assets/icons/form/portal.svg";
import successIcon from "../../../assets/icons/form/succes.svg";
import warningIcon from "../../../assets/icons/form/fail.svg";

import "../../styles/sections/_form.scss";

export default function Form() {
  const { t } = useI18n();
  
  /**
   * Refs for imperative animation control (DOM + CSS orchestration)
   */
  const imgRef = useRef<HTMLImageElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const fieldsRef = useRef<HTMLFormElement | null>(null);
  const responseRef = useRef<HTMLDivElement | null>(null);
  const warningRef = useRef<HTMLDivElement | null>(null);
  
  /**
   * Animation + side-effect hooks
   */
  const { startIdleRotation, accelerate, reverseAndStop } = usePortalAnimation();
  const { showWarning: typewriterWarning } = useTypewriterWarning(
    warningIcon,
    t("form.alt.warningIcon")
  );

  /**
   * Controls button UI state (idle vs sending)
   */
  const [buttonState, setButtonState] = useState<"default" | "sending">("default");

  /**
   * Success flow:
   * Fully orchestrates multi-step animation sequence (portal + form + response)
   */
  const handleSuccess = () => {
    if (!fieldsRef.current || !boxRef.current || !imgRef.current || !responseRef.current) return;

    const fields = fieldsRef.current;
    const box = boxRef.current;
    const img = imgRef.current;
    const response = responseRef.current;

    // Initial feedback (pulse)
    fields.classList.add("pulsing");

    accelerate(img, FORM_ANIM.ACCEL_SPEED, FORM_ANIM.ACCEL_DURATION, () => {
      fields.classList.remove("pulsing");
      box.classList.add("vanish");

      setTimeout(() => {
        fields.style.opacity = "0";
        img.classList.add("returning");
        
        setTimeout(() => {
          // Show oracle response
          response.classList.add("visible");

          setTimeout(() => {
            // Restore layout and reverse animation
            box.classList.remove("vanish");
            box.classList.add("reappear");

            img.classList.remove("returning");
            img.style.animation = "none";

            reverseAndStop(img, FORM_ANIM.REVERSE_SPIN_DURATION);
          }, FORM_ANIM.REAPPEAR_DELAY);
        }, FORM_ANIM.RETURNING_DELAY);

      }, FORM_ANIM.DELAY_BEFORE_VANISH);
    });
  };


  /**
   * Error flow:
   * Displays animated warning message and resets button state
   */
  const handleError = (msgKey: string) => {
    if (!warningRef.current) return;

    typewriterWarning(warningRef.current, t(msgKey));
    setButtonState("default");
  };

  /**
   * Sending state (UI feedback only)
   */
  const handleSending = () => {
    setButtonState("sending");
  };


  /**
   * Form submission logic (decoupled from UI)
   */
  const { submitHandler } = useFormSubmit(handleSuccess, handleError, handleSending);

  /**
   * Start idle portal animation on mount
   */
  useEffect(() => {
    if (imgRef.current) startIdleRotation(imgRef.current);
  }, []);

  return (
    <section className="form" id="ask-oracle">
      <h2 className="form__title">{t("form.title")}</h2>

      <p className="form__description">{t("form.description")}</p>

      <div className="form__container">
        <div className="form__box" ref={boxRef}>
          <p className="form__response" ref={responseRef}>
            {t("form.response")}
          </p>

          <div className="form__portal">
            <img src={portalSvg}
              ref={imgRef}
              className="form__portal-img"
              alt={t("form.alt.portalSvg")}
            />
          </div>

          <form className="form__fields" onSubmit={submitHandler} ref={fieldsRef}>
            <img src={eye}
              className="form__eye" 
              alt={t("form.alt.eye")}
            />

            <input
              name="name"
              className="form__input fade-up delay-600"
              placeholder={t("form.inputs.name")}
            />

            <input
              name="email"
              className="form__input fade-up delay-900"
              placeholder={t("form.inputs.email")}
            />

            <textarea
              name="question"
              className="form__textarea fade-up delay-1200"
              placeholder={t("form.inputs.question")}
            />

            <div className="form__button-wrapper fade-up delay-1600">
              <button className="form__button ">
                {buttonState === "default" ? (
                  <span className="form__button-text">{t("form.button.default")}</span>
                ) : (
                  <span className="form__button-sending">
                    <img src={successIcon}
                      alt={t("form.alt.succesIcon")}
                      className="form__button-icon"
                    />
                    {t("form.button.sending")}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="form__warning" ref={warningRef}></div>
      </div>
    </section>
  );
}
