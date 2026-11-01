import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { VISIBLE } from "../data/projects";
import { useI18n } from "../i18n";
import { AppIcon, Icon, Reveal, StatusPill, StoreLinks, shot } from "../components/ui";
import NotFound from "./NotFound";

function Lightbox({ id, count, start, title, onClose }: { id: string; count: number; start: number; title: string; onClose: () => void }) {
  const { t } = useI18n();
  const [i, setI] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const go = useCallback((d: number) => setI(x => (x + d + count) % count), [count]);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", k); document.body.style.overflow = ""; prev?.focus(); };
  }, [go, onClose]);
  return (
    <motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label={title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-black/90 p-4 text-white outline-none backdrop-blur" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="flex items-center justify-between gap-3">
        <b className="font-display text-lg">{title} <span className="font-mono text-sm font-normal text-white/60">{i + 1} / {count}</span></b>
        <button type="button" onClick={onClose} aria-label={t("lb.close")} className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/10 hover:bg-white/20"><Icon name="close" /></button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center py-4" onClick={e => e.target === e.currentTarget && onClose()}>
        <AnimatePresence mode="wait">
          <motion.img key={i} src={shot(id, i + 1, true)} alt={`${title} ${i + 1}`} className="max-h-full max-w-full rounded-3xl object-contain"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }} />
        </AnimatePresence>
        {count > 1 && <>
          <button type="button" onClick={() => go(-1)} aria-label={t("lb.prev")} className="absolute left-0 grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-white/10 hover:bg-white/20"><Icon name="chevron_left" className="text-[28px]" /></button>
          <button type="button" onClick={() => go(1)} aria-label={t("lb.next")} className="absolute right-0 grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-white/10 hover:bg-white/20"><Icon name="chevron_right" className="text-[28px]" /></button>
        </>}
      </div>
      <div className="flex justify-center gap-2 overflow-x-auto pb-1">
        {Array.from({ length: count }, (_, k) => (
          <button key={k} type="button" onClick={() => setI(k)} aria-label={`${k + 1}`} aria-current={k === i}
            className={`h-16 w-9 flex-none cursor-pointer overflow-hidden rounded-lg border-2 transition ${k === i ? "border-white" : "border-transparent opacity-50 hover:opacity-100"}`}>
            <img src={shot(id, k + 1)} alt="" className="h-full w-full object-cover object-top" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const { t, L, lang } = useI18n();
  const reduce = useReducedMotion();
  const idx = VISIBLE.findIndex(p => p.id === id);
  const p = VISIBLE[idx];
  const [lb, setLb] = useState<number | null>(null);
  const hero = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);

  useEffect(() => { scrollTo(0, 0); }, [id]);
  useEffect(() => {
    if (!p) return;
    const name = p.nameEn && lang === "en" ? p.nameEn : p.name;
    document.title = `${name} · Suertech`;
    return () => { document.title = "Suertech · Eren Can Yıldırım"; };
  }, [p, lang]);
  if (!p) return <NotFound />;

  const name = p.nameEn ? L({ tr: p.name, en: p.nameEn }) : p.name;
  const next = VISIBLE[(idx + 1) % VISIBLE.length];
  const shots = Array.from({ length: p.shots }, (_, k) => k + 1);

  return (
    <main>
      <section ref={hero} className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(60% 80% at 80% 0%, ${p.accent}33, transparent 70%)` }} aria-hidden />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:pt-14">
          <div>
            <Link to="/#work" className="inline-flex min-h-11 items-center gap-1 text-sm text-muted hover:text-fg"><Icon name="arrow_back" className="text-[18px]" />{t("detail.back")}</Link>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-6 flex items-center gap-4">
              <AppIcon p={p} size={72} />
              <div>
                <p className="text-sm text-muted">{L(p.kind)}</p>
                <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-none tracking-tight">{name}</h1>
              </div>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-6 max-w-[56ch] text-lg text-muted">{L(p.about)}</motion.p>
            <dl className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div><dt className="text-muted">{t("detail.status")}</dt><dd className="mt-1"><StatusPill s={p.status} /></dd></div>
              <div><dt className="text-muted">{t("detail.platforms")}</dt><dd className="mt-1 font-medium">{p.platforms}</dd></div>
              <div className="col-span-2"><dt className="text-muted">{t("detail.package")}</dt><dd className="mt-1 break-all font-mono">{p.pkg}</dd></div>
            </dl>
            <div className="mt-8"><StoreLinks p={p} size="lg" /></div>
          </div>
          {p.shots > 0 && (
            <motion.div style={{ y }} className="relative mx-auto flex w-full max-w-md justify-center">
              {[2, 1, 3].filter(n => n <= p.shots).map((n, k, arr) => (
                <motion.button key={n} type="button" onClick={() => setLb(n - 1)} aria-label={`${name}, ${t("detail.screens")} ${n}`}
                  initial={{ opacity: 0, y: 40, rotate: 0 }} animate={{ opacity: 1, y: k === 1 ? 0 : 30, rotate: arr.length > 1 ? (k - 1) * 6 : 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + k * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`w-[46%] flex-none cursor-zoom-in overflow-hidden rounded-[28px] border border-line shadow-2xl ${k === 1 ? "relative z-10 -mx-6" : "opacity-90"}`}>
                  <img src={shot(p.id, n)} alt="" width={480} height={1040} className="block w-full" />
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-2xl font-bold">{t("detail.features")}</h2>
          <ul className="mt-6 grid gap-3">
            {p.features[lang].map((f, k) => (
              <li key={k} className="flex gap-3 rounded-2xl border border-line bg-surface p-4"><Icon name="check_circle" className="text-[22px]" fill />{f}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-2xl font-bold">{t("detail.stack")}</h2>
          <div className="mt-6 flex flex-wrap gap-2">{p.stack.map(s => <span key={s} className="chip">{s}</span>)}</div>
        </Reveal>
      </section>

      <section className="border-t border-line bg-raised py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal><h2 className="font-display text-2xl font-bold">{t("detail.screens")} <span className="font-mono text-base font-normal text-muted">{p.shots}</span></h2></Reveal>
          {p.shots > 0 ? (
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {shots.map((n, k) => (
                <Reveal as="li" key={n} delay={(k % 5) * 0.05}>
                  <button type="button" onClick={() => setLb(n - 1)} aria-label={`${name}, ${t("detail.screens")} ${n}`}
                    className="group block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-line bg-surface transition hover:-translate-y-1 hover:border-accent">
                    <img src={shot(p.id, n)} alt="" loading="lazy" width={480} height={1040} className="block w-full transition-transform duration-500 group-hover:scale-[1.03]" />
                  </button>
                </Reveal>
              ))}
            </ul>
          ) : <p className="mt-6 text-muted">{t("detail.noShots")}</p>}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Link to={`/apps/${next.id}`} className="group flex items-center justify-between gap-6 rounded-3xl border border-line bg-surface p-6 transition hover:border-accent sm:p-8">
          <div className="flex items-center gap-4">
            <AppIcon p={next} size={56} />
            <div><p className="text-sm text-muted">{t("detail.next")}</p><p className="font-display text-2xl font-bold">{next.nameEn ? L({ tr: next.name, en: next.nameEn }) : next.name}</p></div>
          </div>
          <Icon name="arrow_forward" className="text-[28px] text-accent transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      <AnimatePresence>
        {lb !== null && <Lightbox id={p.id} count={p.shots} start={lb} title={name} onClose={() => setLb(null)} />}
      </AnimatePresence>
    </main>
  );
}
