export type GraffitiPhrase = {
  id: string;
  key: string;
  isError?: boolean;
  className?: string;
};

// --- Desktop Rows --- //

export const graffitiTop: GraffitiPhrase[] = [
  { id: "1", key: "graffiti.1" },
  { id: "2", key: "graffiti.2" },
  { id: "3", key: "graffiti.3" },
  { id: "4", key: "graffiti.4" },
];

export const graffitiMidTop: GraffitiPhrase[] = [
  { id: "5", key: "graffiti.5" },
  { id: "6", key: "graffiti.6" },
  { id: "7", key: "graffiti.7" },
  { id: "8", key: "graffiti.8" },
];

export const graffitiCenter: GraffitiPhrase[] = [
  { id: "9", key: "graffiti.9" },
  { id: "10", key: "graffiti.10" },
  { id: "11", key: "graffiti.11" },
  { id: "12", key: "graffiti.12" },
  { id: "13", key: "graffiti.13" },
  { id: "14", key: "graffiti.14" },
  { id: "15", key: "graffiti.15" },
];

export const graffitiMidBottom: GraffitiPhrase[] = [
  { id: "16", key: "graffiti.16" },
  { id: "17", key: "graffiti.17" },
  {
    id: "18", key: "graffiti.18",
  },
  { id: "19", key: "graffiti.19" },
  { id: "20", key: "graffiti.20" },
];

export const graffitiBottom: GraffitiPhrase[] = [
  {
    id: "error-d",
    key: "graffiti.errorDefault",
    isError: true,
  },
  { id: "21", key: "graffiti.21" },
  { id: "22", key: "graffiti.22" },
  { id: "23", key: "graffiti.23" },
];

// --- Mobile Row --- //

export const graffitiMobile: GraffitiPhrase[] = [
  { id: "m1", key: "graffiti.9" },
  { id: "m2", key: "graffiti.18" },
  { id: "m3", key: "graffiti.19" },
  { id: "m4", key: "graffiti.8" },
  { id: "m5", key: "graffiti.4" },
  { id: "m6", key: "graffiti.1" },
  { id: "m7", key: "graffiti.11" },
  { id: "m8", key: "graffiti.12" },
  { id: "m9", key: "graffiti.20" },

  {
    id: "error-m",
    key: "graffiti.errorDefault",
    isError: true,
  },
];
