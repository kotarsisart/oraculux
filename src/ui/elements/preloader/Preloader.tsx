import { useEffect, useState } from "react";
import kotarsis from "../../../assets/icons/logos/kotarsis.svg";
import oraculux from "../../../assets/icons/logos/oraculux.svg";
import useTypewriter from "../../../hooks/useTypeWriter";
import "./_preloader.scss";

export default function Preloader() {
  const [hide, setHide] = useState(false);

  const typedProject = useTypewriter("Oraculux", {
    delay: 1500,
    // speed: 40,
    // variance: 80
  });

  const PRELOADER_DURATION = 2600;

  useEffect(() => {
    const TAB_KEY = "kotarsis_tab_id";
    const LAST_TAB_KEY = "last_active_tab";
    const LAST_SEEN_KEY = "lastSeen";

    if (!sessionStorage.getItem(TAB_KEY)) {
      sessionStorage.setItem(TAB_KEY, crypto.randomUUID());
    }

    const tabId = sessionStorage.getItem(TAB_KEY)!;
    const lastTabId = localStorage.getItem(LAST_TAB_KEY);

    const isReload = lastTabId === tabId;

    const now = Date.now();
    const lastSeen = Number(localStorage.getItem(LAST_SEEN_KEY));
    const TIMEOUT = 30 * 60 * 1000;
    const timeoutExpired = !lastSeen || now - lastSeen > TIMEOUT;

    const hasShown = sessionStorage.getItem("preloaderShown") === "true";

    const shouldShow =
      timeoutExpired ||
      isReload ||
      !hasShown;

    if (shouldShow) {
      localStorage.setItem(LAST_TAB_KEY, tabId);
      localStorage.setItem(LAST_SEEN_KEY, String(now));
      sessionStorage.setItem("preloaderShown", "true");

      const timeout = setTimeout(() => {
        setHide(true);
      }, PRELOADER_DURATION);

      return () => clearTimeout(timeout);
    }

    sessionStorage.setItem("preloaderShown", "false");
    localStorage.setItem(LAST_TAB_KEY, tabId);
    requestAnimationFrame(() => setHide(true));
  }, []);


  return (
    <div className={`preloader ${hide ? "preloader--hide" : ""}`}>
      <div className="preloader__content">

        <div className="preloader__kotarsis">
          <img src={kotarsis} className="preloader__kotarsis-icon fade-up-1" />
          <p className="preloader__kotarsis-title fade-up-1">kotarsis</p>
        </div>

        <div className="preloader__divider divider-grow" />

        <p className="preloader__presents fade-up-2">PRESENTS</p>

        <div className="preloader__project">
          <img src={oraculux} className="preloader__project-icon fade-up-4" />
          <p className="preloader__project-title fade-up-4">
            {typedProject}
          </p>
        </div>

      </div>
    </div>
  );
}
