import { useI18n } from "../../data/I18nProvider";
import { languages } from "../../data/languages";

import "../styles/sections/_header.scss";
import KotarsisLogoSwitcher from "../elements/header/KotarsisLogoSwitcher";

import kotarsis from "../../assets/icons/logos/kotarsis.svg";
import oraculux from "../../assets/icons/logos/oraculux.svg";
import globe from "../../assets/icons/header/globe.svg";

interface HeaderProps {
  onOpenLanguages: () => void;
}

export default function Header({ onOpenLanguages }: HeaderProps) {
  const { locale } = useI18n();

  // find correct lang object by locale
  const langObj = languages.find((l) => l.routeCode === locale);

  return (
    <header className="header">

      <a
        href="https://kotarsis.com"
        className="header-logo__link"
        rel="noopener noreferrer"
      >
        <KotarsisLogoSwitcher
          className="header-logo"
          versions={[
            { src: oraculux, text: "Oraculux", alt: "header.logo.oraculuxAlt" },
            { src: kotarsis, text: "kotarsis", alt: "header.logo.kotarsisAlt" }
          ]}
        />
      </a>

      <div
        className="header__lang-select"
        onClick={onOpenLanguages}
      >
        <p className="header__lang-select-text">
          {langObj?.name ?? locale.toUpperCase()}
        </p>

        <img
          src={globe}
          alt="language"
          className="header__lang-select-icon"
        />
      </div>
    </header>
  );
}
