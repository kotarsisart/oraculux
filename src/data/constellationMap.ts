const icons = import.meta.glob("/src/assets/icons/constellations/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const iconPath = (name: string) =>
  icons[`/src/assets/icons/constellations/${name}.svg`];

export const constellationMap = {
  titleKey: "constellationMap.title",
  sublineKey: "constellationMap.subline",

  groups: [
    {
      id: "top",
      className: "constellation-map__group--top",
      items: [
        {
          sign: "aquarius",
          size: "medium",
          textKey: "constellationMap.signs.aquarius",
          altKey: "constellationMap.alt.aquarius",
          descKey: "constellationMap.desc.aquarius",
          icon: iconPath("aquarius"),
        },
        {
          sign: "capricorn",
          size: "large",
          textKey: "constellationMap.signs.capricorn",
          altKey: "constellationMap.alt.capricorn",
          descKey: "constellationMap.desc.capricorn",
          icon: iconPath("capricorn"),
        },
      ],
    },

    {
      id: "midTop",
      className: "constellation-map__group--mid-top",
      items: [
        {
          sign: "gemini",
          size: "large",
          textKey: "constellationMap.signs.gemini",
          altKey: "constellationMap.alt.gemini",
          descKey: "constellationMap.desc.gemini",
          icon: iconPath("gemini"),
        },
        {
          sign: "leo",
          size: "narrow",
          textKey: "constellationMap.signs.leo",
          altKey: "constellationMap.alt.leo",
          descKey: "constellationMap.desc.leo",
          icon: iconPath("leo"),
        },
        {
          sign: "virgo",
          size: "narrow",
          textKey: "constellationMap.signs.virgo",
          altKey: "constellationMap.alt.virgo",
          descKey: "constellationMap.desc.virgo",
          icon: iconPath("virgo"),
        },
        {
          sign: "scorpio",
          size: "large",
          textKey: "constellationMap.signs.scorpio",
          altKey: "constellationMap.alt.scorpio",
          descKey: "constellationMap.desc.scorpio",
          icon: iconPath("scorpio"),
        },
      ],
    },

    {
      id: "midBottom",
      className: "constellation-map__group--mid-bottom",
      items: [
        {
          sign: "taurus",
          size: "large",
          textKey: "constellationMap.signs.taurus",
          altKey: "constellationMap.alt.taurus",
          descKey: "constellationMap.desc.taurus",
          icon: iconPath("taurus"),
        },
        {
          sign: "libra",
          size: "medium",
          textKey: "constellationMap.signs.libra",
          altKey: "constellationMap.alt.libra",
          descKey: "constellationMap.desc.libra",
          icon: iconPath("libra"),
        },
        {
          sign: "sagittarius",
          size: "large",
          textKey: "constellationMap.signs.sagittarius",
          altKey: "constellationMap.alt.sagittarius",
          descKey: "constellationMap.desc.sagittarius",
          icon: iconPath("sagittarius"),
        },
        {
          sign: "pisces",
          size: "medium",
          textKey: "constellationMap.signs.pisces",
          altKey: "constellationMap.alt.pisces",
          descKey: "constellationMap.desc.pisces",
          icon: iconPath("pisces"),
        },
      ],
    },

    {
      id: "bottom",
      className: "constellation-map__group--bottom",
      items: [
        {
          sign: "cancer",
          size: "narrow",
          textKey: "constellationMap.signs.cancer",
          altKey: "constellationMap.alt.cancer",
          descKey: "constellationMap.desc.cancer",
          icon: iconPath("cancer"),
        },
        {
          sign: "aries",
          size: "narrow",
          textKey: "constellationMap.signs.aries",
          altKey: "constellationMap.alt.aries",
          descKey: "constellationMap.desc.aries",
          icon: iconPath("aries"),
        },
      ],
    },
  ],
};

export { iconPath };
