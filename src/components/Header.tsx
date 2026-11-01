import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "../i18n";
import { Icon } from "./ui";

const NAV = [["work", "nav.work"], ["about", "nav.about"], ["experience", "nav.exp"], ["skills", "nav.skills"], ["contact", "nav.contact"]] as const;

function useTheme() {
  const get = () => document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  const [theme, setTheme] = useState(get);
  const toggle = () => {
    const next = get() === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("st.theme", next); } catch {}
    setTheme(next);
  };
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: light)");
    const on = () => setTheme(get());
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return [theme, toggle] as const;
}

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const [theme, toggleTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const on = () => setScrolled(scrollY > 8);
    on(); addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors ${scrolled ? "border-line bg-bg/80" : "border-transparent bg-bg/40"}`}>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight" aria-label="Suertech">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-on-accent"><Icon name="deployed_code" className="text-[22px]" fill /></span>
          <span>suertech</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label={t("menu")}>
          {NAV.map(([id, k]) => (
            <Link key={id} to={{ pathname: "/", hash: id }} className="rounded-full px-3.5 py-2 text-[15px] text-muted transition-colors hover:bg-surface hover:text-fg">{t(k)}</Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          <div className="flex rounded-full border border-line bg-surface p-0.5 font-mono text-[13px]" role="group" aria-label="Dil / Language">
            {(["tr", "en"] as const).map(l => (
              <button key={l} type="button" lang={l} aria-pressed={lang === l} onClick={() => setLang(l)}
                className={`relative min-h-9 min-w-10 cursor-pointer rounded-full px-2.5 uppercase transition-colors ${lang === l ? "text-on-accent" : "text-muted hover:text-fg"}`}>
                {lang === l && <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 500, damping: 35 }} />}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={toggleTheme} aria-label={t(theme === "light" ? "theme.dark" : "theme.light")}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-surface text-fg">
            <Icon name={theme === "light" ? "dark_mode" : "light_mode"} className="text-[20px]" />
          </button>
          <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="mnav" aria-label={t("menu")}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-surface text-fg lg:hidden">
            <Icon name={open ? "close" : "menu"} className="text-[22px]" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav id="mnav" aria-label={t("menu")} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full border-b border-line bg-bg px-4 pb-4 pt-2 lg:hidden">
            {NAV.map(([id, k]) => (
              <Link key={id} to={{ pathname: "/", hash: id }} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-xl px-3 text-lg hover:bg-surface">{t(k)}</Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
