import { ReactNode, useRef, MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Project, Status, LinkKind } from "../data/projects";
import { useI18n } from "../i18n";

/** Material Symbols Rounded glyph; decorative unless a label is given. */
export function Icon({ name, className = "", label, fill = false }: { name: string; className?: string; label?: string; fill?: boolean }) {
  return (
    <span className={`material-symbols-rounded select-none leading-none ${className}`} style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
      aria-hidden={label ? undefined : true} aria-label={label} role={label ? "img" : undefined}>{name}</span>
  );
}

/** Fades and lifts content in when it scrolls into view. */
export function Reveal({ children, delay = 0, className = "", as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "section" | "li" | "article" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  if (reduce) return <M className={className}>{children}</M>;
  return (
    <M className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] }}>{children}</M>
  );
}

/** Card with a pointer-following spotlight (after the 21st.dev "spotlight card" pattern). */
export function SpotlightCard({ children, className = "", color }: { children: ReactNode; className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={move} style={{ ["--spot" as string]: color ?? "rgb(var(--accent))" }}
      className={`spotlight group relative isolate overflow-hidden rounded-3xl border border-line bg-surface transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/50 ${className}`}>
      {children}
    </div>
  );
}

export function StatusPill({ s }: { s: Status }) {
  const { t } = useI18n();
  const live = s === "live" || s === "web";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs ${live ? "border-live/40 text-live" : "border-dev/40 text-dev"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${live ? "bg-live" : "bg-dev"}`} />{t(`st.${s}` as never)}
    </span>
  );
}

const LINK_ICON: Record<LinkKind, string> = { play: "shop", appstore: "phone_iphone", web: "language", github: "code" };
export function StoreLinks({ p, size = "md" }: { p: Project; size?: "md" | "lg" }) {
  const { t } = useI18n();
  if (!p.links.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {p.links.map(([k, href]) => (
        <a key={k} href={href} target="_blank" rel="noopener"
          className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-line font-medium transition-colors hover:border-accent hover:text-accent ${size === "lg" ? "px-5 py-3" : "px-4 py-2 text-sm"}`}>
          <Icon name={LINK_ICON[k]} className="text-[18px]" />{t(`l.${k}` as never)}
          <Icon name="arrow_outward" className="text-[16px] opacity-60" />
        </a>
      ))}
    </div>
  );
}

export function AppIcon({ p, size = 48 }: { p: Project; size?: number }) {
  return p.icon
    ? <img src={asset(p.icon)} alt="" width={size} height={size} className="flex-none rounded-2xl border border-line" style={{ width: size, height: size }} />
    : <span className="grid flex-none place-items-center rounded-2xl border border-line font-display font-bold text-white"
        style={{ width: size, height: size, background: p.accent, fontSize: size * 0.42 }} aria-hidden>{p.name.charAt(0)}</span>;
}

const B = import.meta.env.BASE_URL;
export const asset = (path: string) => B + path.replace(/^\//, "");
export const shot = (id: string, n: number, lg = false) => `${B}shots/${lg ? "lg/" : ""}${id}-${n}.webp`;
