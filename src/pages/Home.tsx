import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { VISIBLE, type Project } from "../data/projects";
import { JOBS, SKILLS, CERTS } from "../data/profile";
import { useI18n } from "../i18n";
import { AppIcon, Icon, Reveal, SpotlightCard, StatusPill, shot } from "../components/ui";

type Filter = "all" | "own" | "client" | "live";
const match = (p: Project, f: Filter) => f === "all" || (f === "live" ? p.status === "live" || p.status === "web" : p.category === f);

const HERO = VISIBLE.filter(p => p.shots > 0).map(p => ({ id: p.id, src: shot(p.id, 1), p }));

function HeroPhone() {
  const reduce = useReducedMotion();
  const { L, t } = useI18n();
  const N = HERO.length, step = 360 / N;
  const W = 150, R = Math.round(W / 2 / Math.tan(Math.PI / N)) + 24;
  const angle = useMotionValue(0);
  const spin = useSpring(angle, { stiffness: 60, damping: 18 });
  const ring = useTransform(spin, a => `translateZ(${-R}px) rotateY(${a}deg)`);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragging = useRef(false);
  useEffect(() => spin.on("change", a => setI(((Math.round(-a / step) % N) + N) % N)), [spin, step, N]);
  const go = (d: number) => angle.set((Math.round(angle.get() / step) - d) * step);
  const to = (k: number) => { const cur = Math.round(-angle.get() / step); let d = ((k - cur) % N + N) % N; if (d > N / 2) d -= N; go(d); };
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => !document.hidden && go(1), 3000);
    return () => clearInterval(id);
  }, [reduce, paused]);
  const cur = HERO[i];
  return (
    <div className="relative mx-auto w-full max-w-[420px] select-none" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      role="region" aria-roledescription="carousel" aria-label={t("work.eyebrow" as never)}>
      <div className="absolute -inset-10 -z-10 rounded-full opacity-60 blur-3xl transition-colors duration-700" style={{ background: `radial-gradient(closest-side, ${cur.p.accent}55, transparent)` }} />
      <motion.div className="relative h-[360px] cursor-grab touch-pan-y active:cursor-grabbing sm:h-[400px]" style={{ perspective: 1100 }}
        onPanStart={() => { dragging.current = true; setPaused(true); }}
        onPan={(_, info) => angle.set(angle.get() + info.delta.x * 0.35)}
        onPanEnd={(_, info) => { angle.set(Math.round((angle.get() + info.velocity.x * 0.08) / step) * step); setTimeout(() => { dragging.current = false; }, 50); }}>
        <motion.div className="absolute left-1/2 top-1/2" style={{ transformStyle: "preserve-3d", transform: ring, width: 0, height: 0 }}>
          {HERO.map((h, k) => (
            <div key={h.id} className="absolute" style={{ width: W, height: W * 2.1, left: -W / 2, top: -W * 1.05, transform: `rotateY(${-k * step}deg) translateZ(${R}px)`, backfaceVisibility: "hidden" }}>
              <Link to={`/apps/${h.id}`} draggable={false} tabIndex={k === i ? 0 : -1} aria-hidden={k !== i}
                onClick={e => { if (dragging.current) e.preventDefault(); else if (k !== i) { e.preventDefault(); to(k); } }}
                className={`block h-full w-full rounded-[28px] bg-gradient-to-br from-zinc-700 to-zinc-950 p-[7px] shadow-2xl ring-1 ring-white/10 transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-60"}`}>
                <img src={h.src} alt={k === i ? L(h.p.nameEn ? { tr: h.p.name, en: h.p.nameEn } : h.p.name) : ""} draggable={false} className="h-full w-full rounded-[22px] bg-black object-cover object-top" />
              </Link>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <div className="mt-2 flex items-center justify-center gap-3">
        <button type="button" onClick={() => { setPaused(true); go(-1); }} aria-label={t("lb.prev")} className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-surface hover:border-accent"><Icon name="chevron_left" /></button>
        <Link to={`/apps/${cur.id}`} className="flex min-w-0 max-w-[230px] flex-1 items-center gap-3 rounded-2xl border border-line bg-surface/95 p-2.5 pr-4 shadow-xl backdrop-blur transition-colors hover:border-accent">
          <AppIcon p={cur.p} size={36} />
          <AnimatePresence mode="wait">
            <motion.div key={cur.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="min-w-0" aria-live="polite">
              <b className="block truncate text-sm font-semibold">{L(cur.p.nameEn ? { tr: cur.p.name, en: cur.p.nameEn } : cur.p.name)}</b>
              <small className="block truncate font-mono text-xs text-muted">{cur.p.platforms}</small>
            </motion.div>
          </AnimatePresence>
        </Link>
        <button type="button" onClick={() => { setPaused(true); go(1); }} aria-label={t("lb.next")} className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-surface hover:border-accent"><Icon name="chevron_right" /></button>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-1">
        {HERO.map((h, k) => (
          <button key={h.id} type="button" onClick={() => { setPaused(true); to(k); }} aria-label={h.p.name} aria-current={k === i}
            className="grid h-6 cursor-pointer place-items-center px-0.5"><span className={`block h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-accent" : "w-1.5 bg-line"}`} /></button>
        ))}
      </div>
    </div>
  );
}

function Counter({ n }: { n: number }) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? n : 0);
  return (
    <motion.span onViewportEnter={() => {
      if (reduce) return;
      const t0 = performance.now();
      const step = (now: number) => { const k = Math.min(1, (now - t0) / 1100); setV(Math.round(n * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }} viewport={{ once: true }}>{v}</motion.span>
  );
}

export function ProjectCard({ p, i }: { p: Project; i: number }) {
  const { t, L } = useI18n();
  const name = p.nameEn ? L({ tr: p.name, en: p.nameEn }) : p.name;
  return (
    <motion.li layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.45, delay: Math.min(i, 6) * 0.05 }}>
      <SpotlightCard color={`${p.accent}33`} className="h-full">
        <Link to={`/apps/${p.id}`} className="flex h-full flex-col" aria-label={`${name}: ${t("card.open")}`}>
          <div className="relative flex h-64 items-start justify-center gap-3 overflow-hidden border-b border-line px-6 pt-6" style={{ background: `radial-gradient(circle at 50% 0%, ${p.accent}26, transparent 70%)` }}>
            {p.shots > 0 ? [1, 2, 3].filter(n => n <= p.shots).map((n, k) => (
              <img key={n} src={shot(p.id, n)} alt="" loading="lazy" width={480} height={1040}
                className="w-[30%] flex-none rounded-2xl border border-line shadow-lg transition-transform duration-500 group-hover:-translate-y-1"
                style={{ transform: `translateY(${k * 20}px)` }} />
            )) : (
              <div className="grid h-full place-items-center pb-6"><AppIcon p={p} size={88} /></div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="flex items-center gap-3">
              <AppIcon p={p} size={44} />
              <div className="min-w-0">
                <h3 className="truncate font-display text-xl font-bold">{name}</h3>
                <p className="text-sm text-muted">{L(p.kind)}</p>
              </div>
            </div>
            <p className="text-muted">{L(p.summary)}</p>
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
              <StatusPill s={p.status} />
              <span className="font-mono text-xs text-muted">{p.platforms}</span>
              <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-accent">{t("card.open")}<Icon name="arrow_forward" className="text-[18px] transition-transform group-hover:translate-x-1" /></span>
            </div>
          </div>
        </Link>
      </SpotlightCard>
    </motion.li>
  );
}

function Work() {
  const { t } = useI18n();
  const [f, setF] = useState<Filter>("all");
  const list = useMemo(() => VISIBLE.filter(p => match(p, f)), [f]);
  return (
    <section id="work" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">{t("work.eyebrow")}</p>
            <h2 className="h2 max-w-[20ch]">{t("work.title")}</h2>
          </Reveal>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t("work.eyebrow")}>
            {(["all", "own", "client", "live"] as Filter[]).map(k => (
              <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}
                className={`relative min-h-11 cursor-pointer rounded-full border px-4 text-sm transition-colors ${f === k ? "border-fg text-bg" : "border-line text-muted hover:border-accent hover:text-fg"}`}>
                {f === k && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
                <span className="relative">{t(`f.${k}` as never)} <sup className="font-mono">{VISIBLE.filter(p => match(p, k)).length}</sup></span>
              </button>
            ))}
          </div>
        </div>
        <motion.ul layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

export default function Home() {
  const { t, L, lang } = useI18n();
  const live = VISIBLE.filter(p => p.status === "live" || p.status === "web").length;
  const clients = VISIBLE.filter(p => p.category === "client").length;
  const [copied, setCopied] = useState(false);
  const email = "erncanyildirim@gmail.com";
  const copy = () => navigator.clipboard?.writeText(email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });

  return (
    <main id="top">
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:pt-20">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" /><span className="relative h-2 w-2 rounded-full bg-live" /></span>
              {t("hero.eyebrow")}
            </motion.p>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,5.6vw,4.4rem)] font-bold leading-[0.98] tracking-tight">
              {[t("hero.title1"), t("hero.title2")].map((line, k) => (
                <span key={k} className="block overflow-hidden pb-1">
                  <motion.span className={`block ${k ? "text-accent" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.08 * k, ease: [0.2, 0.8, 0.2, 1] }}>{line}</motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 max-w-[58ch] text-lg text-muted">{t("hero.lead")}</motion.p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={{ hash: "work" }} className="btn-primary">{t("hero.cta1")}<Icon name="arrow_downward" className="text-[20px]" /></Link>
              <Link to={{ hash: "contact" }} className="btn">{t("hero.cta2")}</Link>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {[[VISIBLE.length, "stat.apps"], [live, "stat.live"], [clients, "stat.clients"], [16, "stat.langs"]].map(([n, k]) => (
                <div key={k} className="bg-surface p-4">
                  <dt className="sr-only">{t(k as never)}</dt>
                  <dd className="font-display text-3xl font-bold tabular-nums"><Counter n={n as number} /></dd>
                  <dd className="mt-1 text-xs leading-snug text-muted">{t(k as never)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroPhone />
        </div>
      </section>

      <Work />

      {/* about */}
      <section id="about" className="scroll-mt-20 bg-raised py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal><p className="eyebrow">{t("about.eyebrow")}</p><h2 className="h2 max-w-[22ch]">{t("about.title")}</h2></Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal className="grid gap-5 text-lg text-muted">
              <p>{t("about.p1")}</p><p>{t("about.p2")}</p><p>{t("about.p3")}</p>
            </Reveal>
            <Reveal delay={0.1} className="flex items-start gap-4 self-start rounded-3xl border border-line bg-surface p-6">
              <Icon name="school" className="text-[28px] text-accent" />
              <p>{t("edu")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* experience */}
      <section id="experience" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal><p className="eyebrow">{t("exp.eyebrow")}</p><h2 className="h2 max-w-[22ch]">{t("exp.title")}</h2></Reveal>
          <ol className="relative mt-12 grid gap-12 border-l border-line pl-8">
            {JOBS.map((j, i) => (
              <Reveal as="li" key={i} delay={i * 0.05} className="relative">
                <span className={`absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-accent ${i === 0 ? "bg-accent" : "bg-bg"}`} aria-hidden />
                <p className="font-mono text-sm text-muted">{L(j.when)} · {L(j.where)}</p>
                <h3 className="mt-1 font-display text-2xl font-bold">{L(j.title)}</h3>
                <p className="mt-1 text-muted">{L(j.org)}</p>
                <ul className="mt-4 grid max-w-[70ch] gap-2 text-muted">
                  {j.items[lang].map((x, k) => <li key={k} className="flex gap-3"><Icon name="check" className="mt-0.5 text-[18px] text-accent" />{x}</li>)}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* skills */}
      <section id="skills" className="scroll-mt-20 bg-raised py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal><p className="eyebrow">{t("skills.eyebrow")}</p><h2 className="h2">{t("skills.title")}</h2></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((s, i) => (
              <Reveal key={i} delay={(i % 3) * 0.05} className="rounded-3xl border border-line bg-surface p-6">
                <h3 className="flex items-center gap-3 font-display text-lg font-bold"><Icon name={s.icon} className="text-[24px] text-accent" />{L(s.k)}</h3>
                <div className="mt-4 flex flex-wrap gap-2">{s.items.map((x, k) => <span key={k} className="chip">{L(x)}</span>)}</div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <h3 className="font-display text-xl font-bold">{L({ tr: "Sertifikalar", en: "Certificates" })}</h3>
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
              {CERTS.map((c, i) => (
                <li key={i} className="flex gap-4 border-t border-line py-4">
                  <Icon name="workspace_premium" className="text-[24px] text-accent" />
                  <div><b className="font-semibold">{L(c.t)}</b><p className="text-sm text-muted">{L(c.o)}</p></div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="relative overflow-hidden rounded-[32px] border border-line bg-surface p-8 sm:p-14">
            <div className="pointer-events-none absolute -bottom-1/2 -right-1/4 h-[80%] w-[60%] rounded-full bg-accent/20 blur-3xl" aria-hidden />
            <p className="eyebrow">{t("contact.eyebrow")}</p>
            <h2 className="mt-3 max-w-[14ch] font-display text-[clamp(2.2rem,6vw,4rem)] font-bold leading-none">{t("contact.title")}</h2>
            <p className="mt-5 max-w-[54ch] text-lg text-muted">{t("contact.text")}</p>
            <div className="mt-8 flex flex-wrap items-stretch gap-3">
              <span className="rounded-2xl border border-line bg-bg px-5 py-3.5 font-mono text-lg">{email}</span>
              <button type="button" onClick={copy} className="btn-primary cursor-pointer" aria-live="polite">
                <Icon name={copied ? "check" : "content_copy"} className="text-[20px]" />{t(copied ? "contact.copied" : "contact.copy")}
              </button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn" href={`mailto:${email}`}><Icon name="mail" className="text-[20px]" />{t("contact.mail")}</a>
              <a className="btn" href="https://www.linkedin.com/in/eren-can-yildirim-ceng" target="_blank" rel="noopener">LinkedIn</a>
              <a className="btn" href="https://github.com/erncanyildirim" target="_blank" rel="noopener">GitHub</a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
