import '../styles/sections/_benefits.scss';
import {
  benefitsCards,
  benefitsTitleKey,
  benefitsDescriptionKey
} from '../../data/benefits';
import { useI18n } from '../../data/I18nProvider';

export default function Benefits() {
  const { t } = useI18n();

  return (
    <section className="benefits">
      <div className="benefits__text">
        <h2 className="benefits__text-title fade-up delay-600">
          {t(benefitsTitleKey)}
        </h2>

        <p className="benefits__text-description fade-up delay-1000">
          {t(benefitsDescriptionKey)}
        </p>
      </div>

      <div className="benefits__cards">
        {benefitsCards.map((card, i) => (
          <div className={`fade-up delay-${1400 + i * 200}`}>
            <div
              className={`benefits__card`}
              key={i}
            >
              <img src={card.icon} alt={card.alt} className="benefits__card-icon" />

              <div className="benefits__card-text">
                <p className="benefits__card-title">{t(card.titleKey)}</p>
                <p className="benefits__card-description">{t(card.descriptionKey)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
