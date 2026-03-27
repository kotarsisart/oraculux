import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import type { Locale } from "../data/I18nProvider";
import { messages } from "../data/I18nProvider";

function isLocale(value: string): value is Locale {
  return value in messages;
}

function detectInitialLang(): Locale {
  const stored = localStorage.getItem("lang");
  if (stored && isLocale(stored)) return stored;

  const browser = navigator.language?.slice(0, 2).toLowerCase();
  if (browser && isLocale(browser)) return browser;

  return "en";
}

function RoutesWrapper() {

  return (
    <Routes>
      <Route index element={<Navigate to={detectInitialLang()} replace />} />

      <Route path=":lang" element={<App />} />
    </Routes>
  );
}

export default function Router() {
  return (
    <BrowserRouter basename="/oraculux">
      <RoutesWrapper />
    </BrowserRouter>
  );
}
