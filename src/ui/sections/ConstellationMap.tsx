import { useEffect, useState } from "react";
import { constellationMap } from "../../data/constellationMap";
import { useI18n } from "../../data/I18nProvider";
import "../styles/sections/_constellations.scss";

type Breakpoint = "mobile" | "tablet" | "narrowDesktop" | "wideDesktop";

export default function ConstellationMap() {
  const { t } = useI18n();

  /**
   * Flatten grouped data into a single array for easier lookup and mapping.
   * This avoids repeated nested iterations later.
   */
  const allSigns = constellationMap.groups.flatMap((g) =>
    g.items.map((item) => ({
      key: item.sign,
      size: item.size,
      icon: item.icon,
      textKey: item.textKey,
      altKey: item.altKey,
      descKey: item.descKey,
    }))
  );

  /**
   * Derive layout breakpoint from viewport width.
   * Kept as a function to reuse on resize.
   */
  const getBreakpoint = (): Breakpoint => {
    const w = window.innerWidth;
    if (w >= 1280) return "wideDesktop";
    if (w >= 1024) return "narrowDesktop";
    if (w >= 768) return "tablet";
    return "mobile";
  };

  const [bp, setBp] = useState<Breakpoint>(getBreakpoint());

  /**
   * Subscribe to resize and update layout dynamically.
   * Cleanup ensures no memory leaks.
   */
  useEffect(() => {
    const onResize = () => setBp(getBreakpoint());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const mapMobile = null;

  /**
   * Layout maps define visual grouping per breakpoint.
   * This separates layout logic from rendering logic,
   * making responsive behavior predictable and declarative.
   */
  const mapTablet = {
    top: ["aquarius", "capricorn"],
    midTop: ["gemini", "leo", "cancer"],
    midBottom: ["scorpio", "pisces", "taurus"],
    bottom: ["sagittarius", "virgo", "libra", "aries"],
  };

  const mapNarrow = {
    top: ["aquarius", "capricorn", "gemini"],
    midTop: [
      "cancer",
      "sagittarius",
      "virgo",
      "libra",
      "scorpio",
      "leo",
      "pisces",
      "taurus",
    ],
    midBottom: [],
    bottom: ["aries"],
  };

  const mapWide = {
    top: ["aquarius", "capricorn", "gemini"],
    midTop: ["cancer", "sagittarius", "virgo", "libra", "leo"],
    midBottom: [],
    bottom: ["scorpio", "pisces", "taurus", "aries"],
  };

  const currentMap =
    bp === "wideDesktop"
      ? mapWide
      : bp === "narrowDesktop"
      ? mapNarrow
      : bp === "tablet"
      ? mapTablet
      : mapMobile;

  const groups = {
    top: [] as typeof allSigns,
    midTop: [] as typeof allSigns,
    midBottom: [] as typeof allSigns,
    bottom: [] as typeof allSigns,
  };

  if (currentMap) {
    /**
     * Track assigned items to avoid duplicates
     * and safely place remaining items later.
     */
    const assigned = new Set<string>();

    for (const groupName of Object.keys(currentMap) as (keyof typeof currentMap)[]) {
      const signs = currentMap[groupName];

      signs.forEach((signKey) => {
        const item = allSigns.find((s) => s.key === signKey);
        if (item) {
          groups[groupName].push(item);
          assigned.add(signKey);
        }
      });
    }

    /**
     * Fallback: any unassigned signs are pushed to the bottom group.
     * Guarantees rendering stability even if layout maps are incomplete.
     */
    allSigns.forEach((item) => {
      if (!assigned.has(item.key)) groups.bottom.push(item);
    });
  } else {
    /**
     * Fallback: any unassigned signs are pushed to the bottom group.
     * Guarantees rendering stability even if layout maps are incomplete.
     */
    const g = constellationMap.groups;
    groups.top = g[0].items.map((i) => allSigns.find((s) => s.key === i.sign)!);
    groups.midTop = g[1].items.map((i) => allSigns.find((s) => s.key === i.sign)!);
    groups.midBottom = g[2].items.map((i) => allSigns.find((s) => s.key === i.sign)!);
    groups.bottom = g[3].items.map((i) => allSigns.find((s) => s.key === i.sign)!);
  }

  /**
   * Renders a group of constellations.
   * Handles i18n edge case where description may be string or array.
   */
  const renderGroup = (items: typeof allSigns) =>
    items.map((sign) => {
      const raw = t(sign.descKey); 
      const lines = Array.isArray(raw) ? raw : [raw];

      return (
        <div
          className={`constellation constellation--${sign.size}`}
          data-sign={sign.key}
          key={sign.key}
        >
          <p className="constellation__text">
            {lines[0]}
            {lines[1] && (
              <>
                <br /> {lines[1]}
              </>
            )}
          </p>

          <div className="icon-glow">
            <img
              className="constellation__icon"
              src={sign.icon}
              alt={t(sign.altKey)}
            />
          </div>
        </div>
      );
    });


  return (
    <section className="constellations" id="oracle-sources">
      <div className="constellations__text">
        <h2 className="constellations__title fade-up delay-800">
          {t(constellationMap.titleKey)}
        </h2>

        <p className="constellations__subline fade-up delay-1200">
          {t(constellationMap.sublineKey)}
        </p>
      </div>

      <div className="constellations__content">
        <div className="constellations__group constellations__group--top">
          {renderGroup(groups.top)}
        </div>
        <div className="constellations__group constellations__group--mid-top">
          {renderGroup(groups.midTop)}
        </div>
        <div className="constellations__group constellations__group--mid-bottom">
          {renderGroup(groups.midBottom)}
        </div>
        <div className="constellations__group constellations__group--bottom">
          {renderGroup(groups.bottom)}
        </div>
      </div>
    </section>
  );
}
