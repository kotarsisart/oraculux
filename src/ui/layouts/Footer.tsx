import '../styles/sections/_footer.scss';
import coffee from '../../assets/icons/logos/oraculux-coffee.svg';
import { useI18n } from "../../data/I18nProvider";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer">
      {/* === NAVIGATION === */}
      <div className="footer__nav">
        <a href="#ask-oracle" className="footer__nav-text">
          {t("footer.nav.ask")}
        </a>

        <a href="#common-question" className="footer__nav-text">
          {t("footer.nav.commonQuestion")}
        </a>

        <a href="#oracle-sources" className="footer__nav-text">
          {t("footer.nav.sources")}
        </a>
      </div> 

      {/* === LINKS === */}
      <div className="footer__me-links">
        <p className="footer__me-links-text">
          {t("footer.me.author")}
        </p>

        <a
          href="https://buymeacoffee.com/kotarsis"
          className="footer__bmac"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={coffee}
            alt={t("footer.alt.coffee")}
            className="footer__bmac-icon"
          />
          <p className="footer__me-links-text">
            {t("footer.me.buyCoffee")}
          </p>
        </a>

        <a
          href="https://t.me/kotarsis_art"
          className="footer__me-links-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("footer.me.telegram")}
        </a>

        <a
          href="mailto:kotarsis.studio@gmail.com?subject=Custom website"
          className="footer__me-links-text"
        >
          {t("footer.me.customSite")}
        </a>
      </div>

      {/* === CREATION INFO BLOCK === */}
      <div className="footer__outro">
        <div className="footer__about">
          <p className="footer__about-text">
            {t("footer.about.handcrafted")}
          </p>

          <p className="footer__about-text">
            {t("footer.about.noAiHarmed")}
          </p>

          {/* COPYRIGHT BLOCK */}
          <div className="footer-copyright">
            <p className="footer-copyright__item footer-copyright__item--main">
              {t("footer.copyright.main")}
            </p>

            <p className="footer-copyright__item footer-copyright__item--alt">
              {t("footer.copyright.alt")}
            </p>
          </div>
        </div>

        <p className="footer__outro-easter-egg">
          {t("footer.easterEgg")}
        </p>
      </div>
    </footer>
  );
}
