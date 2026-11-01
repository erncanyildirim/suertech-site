import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig } from "motion/react";
import Header from "./components/Header";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";
import { useI18n } from "./i18n";

function HashScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { t } = useI18n();
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" onClick={e => { e.preventDefault(); document.getElementById("main")?.focus(); }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent">Skip</a>
      <Header />
      <div id="main" tabIndex={-1} className="outline-none">
        <HashScroll />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps/:id" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className="border-t border-line py-10 text-sm text-muted">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-4 sm:px-6">
          <span>© {new Date().getFullYear()} {t("footer")}</span>
          <span className="font-mono">suertech.com.tr</span>
        </div>
      </footer>
    </MotionConfig>
  );
}
