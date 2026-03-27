import '../styles/sections/_hiw.scss';
import {
  howItWorksSteps,
  howItWorksArrow,
  howItWorksTitleKey,
  howItWorksQuoteKey
} from '../../data/hiw';

import { useI18n } from '../../data/I18nProvider';

export default function HowItWorks() {
  const { t } = useI18n();

  return (
    <section className="hiw">
      <h2 className="hiw__title fade-up delay-400">
        {t(howItWorksTitleKey)}
      </h2>

      <div className="hiw__steps">
        {howItWorksSteps.map((step, i) => (
          <>
            <div className={`fade-up delay-${800 + i * 200}`}>
              <div
                className="hiw__step"
                key={i}
              >
                <div className="hiw__step-title-container">
                  <p className="hiw__step-title">{t(step.titleKey)}</p>
                  <img src={step.icon} alt={step.alt} className="hiw__step-icon" />
                </div>

                <div className="hiw__step-text-container">
                  <p className="hiw__step-description">{t(step.hoverKey)}</p>
                </div>
              </div>
          </div>

            {i < howItWorksSteps.length - 1 && (
              <div className={`fade-up delay-${1000 + i * 200}`}>
              <div key={"arrow-" + i} className="hiw__arrow">
                <img src={howItWorksArrow} alt="arrow to next step" className="hiw__arrow-icon" />
              </div>
              </div>
            )}
          </>
        ))}
      </div>

      <p className="hiw__quote fade-up delay-2000">
        {t(howItWorksQuoteKey)}
      </p>
    </section>
  );
}
