import type { OracleMap } from "./types";

export const ritual = {
  titleKey: "ritual.title",
  descriptionKey: "ritual.description",
  hoverKey: "ritual.hover",
  scanningKey: "ritual.scanning",
} as const;

export const oracle: OracleMap = {
  "when-find-love": {
    questionKey: "oracle.whenFindLove.question",
    answersKey: "oracle.whenFindLove.answers",
  },
  "when-know-want": {
    questionKey: "oracle.whenKnowWant.question",
    answersKey: "oracle.whenKnowWant.answers",
  },
  "keep-putting-off": {
    questionKey: "oracle.keepPuttingOff.question",
    answersKey: "oracle.keepPuttingOff.answers",
  },
  "what-ahead": {
    questionKey: "oracle.whatAhead.question",
    answersKey: "oracle.whatAhead.answers",
  },
  "why-doing-this": {
    questionKey: "oracle.whyDoingThis.question",
    answersKey: "oracle.whyDoingThis.answers",
  },
  "right-track": {
    questionKey: "oracle.rightTrack.question",
    answersKey: "oracle.rightTrack.answers",
  },
  "when-better": {
    questionKey: "oracle.whenBetter.question",
    answersKey: "oracle.whenBetter.answers",
  },
  "what-do-life": {
    questionKey: "oracle.whatDoLife.question",
    answersKey: "oracle.whatDoLife.answers",
  },
};
