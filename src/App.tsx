import AppLayout from "./ui/layouts/AppLayout";
import Hero from "./ui/sections/Hero";
import Benefits from "./ui/sections/Benefits";
import HowItWorks from "./ui/sections/HowItWorks";
import Ritual from "./ui/sections/Ritual";
import ConstellationMap from "./ui/sections/ConstellationMap";
import Form from "./ui/sections/Form/Form";
import Graffiti from "./ui/sections/Graffiti";
import useScrollReveal from "./utils/animations/useScrollReveal";
import "./ui/styles/main.scss";

import { useHead } from "./hooks/useHead";
import { useI18n } from "./data/I18nProvider";

export default function App() {
  useScrollReveal();

  const { t, locale } = useI18n();

  const origin = window.location.origin;
  const base = `${origin}/oraculux`;

  const currentUrl = `${base}/${locale}`;
  const previewUrl = `${base}/preview.jpg`;

  // META
  const meta = [
    { name: "description", content: t("meta.description") },
    { name: "keywords", content: t("meta.keywords") },

    { property: "og:title", content: t("meta.title") },
    { property: "og:description", content: t("meta.description") },
    { property: "og:image", content: previewUrl },
    { property: "og:type", content: "website" },
    { property: "og:url", content: currentUrl },
    { property: "og:site_name", content: t("meta.siteName") },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t("meta.title") },
    { name: "twitter:description", content: t("meta.description") },
    { name: "twitter:image", content: previewUrl },

    { name: "theme-color", content: "#000" }
  ];

  // LINKS (favicon, manifest, canonical)
  const link = [
    { rel: "icon", href: `${base}/favicon/favicon.ico` },
    { rel: "apple-touch-icon", href: `${base}/favicon/apple-touch-icon.png` },
    { rel: "manifest", href: `${base}/manifest.json` },
    { rel: "canonical", href: currentUrl }
  ];

  // Apply HEAD
  useHead({
    title: t("meta.title"),
    meta,
    link
  });
  
  // RENDER
  return (
    <AppLayout>
      <Hero />
      <Benefits />
      <HowItWorks />
      <Ritual />
      <ConstellationMap />
      <Form />
      <Graffiti />
    </AppLayout>
  );
}
