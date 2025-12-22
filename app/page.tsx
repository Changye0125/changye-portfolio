"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

type ProjectLink = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
  external?: boolean;
};

type Project = {
  name: string;
  tagline: string;
  summary: string[];
  tags: string[];
  image?: string; // in /public
  links: ProjectLink[];
};

type MistDot = {
  left: number;
  top: number;
  delay: number;
  duration: number;
  scale: number;
  opacity: number;
  blur: number;
};

function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function useMistDots(count = 12): MistDot[] {
  return useMemo(() => {
    const rnd = makeRng(20251222 + count * 31);
    return Array.from({ length: count }).map(() => ({
      left: rnd() * 100,
      top: 10 + rnd() * 70,
      delay: rnd() * 6,
      duration: 18 + rnd() * 22,
      scale: 0.75 + rnd() * 1.1,
      opacity: 0.09 + rnd() * 0.18,
      blur: 10 + rnd() * 22,
    }));
  }, [count]);
}

/** ink-mist blob (tileable) */
const MIST_SVG_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="420" viewBox="0 0 1200 420">
  <defs>
    <filter id="b" x="-20%" y="-60%" width="140%" height="240%">
      <feGaussianBlur stdDeviation="22" />
    </filter>
  </defs>
  <g filter="url(#b)" opacity="0.96">
    <ellipse cx="140" cy="260" rx="240" ry="92" fill="#ffffff" fill-opacity="0.55"/>
    <ellipse cx="360" cy="235" rx="280" ry="110" fill="#ffffff" fill-opacity="0.50"/>
    <ellipse cx="610" cy="275" rx="340" ry="125" fill="#ffffff" fill-opacity="0.45"/>
    <ellipse cx="860" cy="242" rx="310" ry="118" fill="#ffffff" fill-opacity="0.46"/>
    <ellipse cx="1060" cy="280" rx="270" ry="105" fill="#ffffff" fill-opacity="0.50"/>
    <rect x="0" y="258" width="1200" height="162" fill="#ffffff" fill-opacity="0.24"/>
  </g>
</svg>
`);

/** subtle mountain silhouette */
const MOUNTAIN_SVG_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="420" viewBox="0 0 1600 420">
  <path d="M0 340
           C120 310, 190 290, 280 250
           C360 210, 440 180, 520 210
           C610 250, 700 300, 820 250
           C930 210, 980 140, 1120 170
           C1240 195, 1320 280, 1450 250
           C1520 235, 1560 245, 1600 260
           L1600 420 L0 420 Z"
        fill="rgba(12,16,28,0.85)"/>
  <path d="M0 360
           C180 335, 240 320, 360 290
           C500 255, 590 240, 720 265
           C860 290, 960 335, 1120 300
           C1280 270, 1380 280, 1600 310
           L1600 420 L0 420 Z"
        fill="rgba(8,10,18,0.75)"/>
</svg>
`);

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function PrimaryButton(props: React.ComponentProps<"a">) {
  const { className, ...rest } = props;
  return (
    <a
      {...rest}
      className={clsx(
        "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold",
        "bg-amber-300 text-black shadow-lg shadow-amber-900/25",
        "transition hover:-translate-y-0.5 hover:bg-amber-200 active:translate-y-0",
        "focus:outline-none focus:ring-2 focus:ring-amber-200/60",
        className
      )}
    />
  );
}

function GhostButton(props: React.ComponentProps<"a">) {
  const { className, ...rest } = props;
  return (
    <a
      {...rest}
      className={clsx(
        "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold",
        "border border-white/16 bg-white/8 text-white backdrop-blur",
        "transition hover:-translate-y-0.5 hover:bg-white/12 active:translate-y-0",
        className
      )}
    />
  );
}

/** square-ish chips (not pills) */
function SigilChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 px-3 py-1.5 text-[11px] text-white/70",
        "rounded-lg border border-white/12 bg-white/[0.06]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]"
      )}
    >
      <span className="h-2 w-2 bg-amber-200/70" />
      {children}
    </span>
  );
}

/** Sword link (wuxia vibe, still readable for recruiters) */
function SwordConnect() {
  return (
    <a
      href="#contact"
      className="group relative flex items-center gap-2 select-none"
      aria-label="Connect"
      title="Connect"
    >
      <span className="relative h-10 w-[210px]">
        <svg viewBox="0 0 420 90" className="absolute inset-0 h-full w-full" fill="none">
          {/* sheath */}
          <path
            d="M22 45 C86 16, 200 16, 250 45 C200 74, 86 74, 22 45 Z"
            className="fill-white/10 stroke-white/22"
            strokeWidth="2"
          />
          {/* sheath cap */}
          <path
            d="M22 45 C10 38, 10 52, 22 45 Z"
            className="fill-white/10 stroke-white/22"
            strokeWidth="2"
          />
          {/* guard */}
          <path
            d="M258 33 L286 33 L296 45 L286 57 L258 57 Z"
            className="fill-white/10 stroke-white/22"
            strokeWidth="2"
          />
          {/* handle */}
          <path
            d="M296 28 L328 28 L350 45 L328 62 L296 62 Z"
            className="fill-white/10 stroke-white/22"
            strokeWidth="2"
          />
          {/* wrap lines */}
          <path d="M304 36 L334 54" className="stroke-white/18" strokeWidth="2" strokeLinecap="round" />
          <path d="M304 54 L334 36" className="stroke-white/18" strokeWidth="2" strokeLinecap="round" />
          {/* tassel */}
          <path
            d="M348 62 C362 72, 376 78, 396 84"
            className="stroke-amber-200/55"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* blade group: slides out on hover */}
          <g className="transition-transform duration-300 ease-out group-hover:translate-x-[56px]">
            {/* spine */}
            <path d="M286 45 L402 45" className="stroke-amber-200/85" strokeWidth="3" strokeLinecap="round" />
            {/* edge highlight */}
            <path
              d="M292 41 L394 41"
              className="stroke-white/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* tip */}
            <path
              d="M396 34 L412 45 L396 56"
              className="stroke-amber-200/85"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* flowing shine */}
            <path
              d="M300 49 L392 49"
              className="bladeShine stroke-white/0 group-hover:stroke-white/25"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* glow */}
        <span className="pointer-events-none absolute -inset-2 rounded-full opacity-0 blur-xl transition duration-300 group-hover:opacity-100 bg-amber-300/15" />
      </span>

      <span className="text-xs tracking-[0.34em] text-white/70 group-hover:text-amber-200">CONNECT</span>
    </a>
  );
}

function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div className={clsx("fixed inset-0 z-[70] transition", open ? "pointer-events-auto" : "pointer-events-none")}>
      <div
        className={clsx(
          "absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        className={clsx(
          "absolute right-0 top-0 h-full w-[340px] max-w-[88vw]",
          "border-l border-white/12 bg-black/40 backdrop-blur-xl",
          "shadow-[0_30px_120px_rgba(0,0,0,0.6)]",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="text-xs tracking-[0.34em] text-white/70">MENU</div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        {/* (you said: menu buttons don't need to change) */}
        <nav className="px-5 py-5 space-y-2">
          {[
            ["Home", "#top"],
            ["Projects", "#projects"],
            ["About", "#about"],
            ["Contact", "#contact"],
          ].map(([t, href]) => (
            <a
              key={href}
              href={href}
              onClick={onClose}
              className="block rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/80 hover:bg-white/[0.10] hover:text-amber-200 transition"
            >
              {t}
            </a>
          ))}
        </nav>

        <div className="px-5 pt-2 pb-6 text-xs text-white/55">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="text-white/70">Quick links</div>
            <div className="mt-3 space-y-2">
              <a className="block hover:text-amber-200" href="mailto:cchen90@stevens.edu">
                cchen90@stevens.edu
              </a>
              <a
                className="block hover:text-amber-200"
                href="https://github.com/Changye0125"
                target="_blank"
                rel="noreferrer"
              >
                GitHub →
              </a>
              <a className="block hover:text-amber-200" href="/Changye_Resume.pdf">
                Resume →
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function TopNav({ onOpen }: { onOpen: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <div className="absolute inset-0 border-b border-white/10 bg-black/25 backdrop-blur-md" />
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-4">
        <a href="#top" className="text-sm font-semibold tracking-[0.28em] text-amber-50 transition hover:text-amber-200">
          CHANGYE
        </a>

        <div className="flex items-center gap-3">
          <SwordConnect />

          <button
            type="button"
            className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur hover:bg-white/10"
            aria-label="Menu"
            title="Menu"
            onClick={onOpen}
          >
            <span className="absolute h-[2px] w-5 bg-white/70 transition group-hover:w-6 -translate-y-[6px]" />
            <span className="absolute h-[2px] w-5 bg-white/70 transition group-hover:w-6" />
            <span className="absolute h-[2px] w-5 bg-white/70 transition group-hover:w-6 translate-y-[6px]" />
          </button>
        </div>
      </div>
    </header>
  );
}

function MistSheets() {
  return (
    <>
      <div className="mistSheet mistSheet1" style={{ backgroundImage: `url("${MIST_SVG_DATA_URI}")` }} />
      <div className="mistSheet mistSheet2" style={{ backgroundImage: `url("${MIST_SVG_DATA_URI}")` }} />
      <div className="mountainBand" style={{ backgroundImage: `url("${MOUNTAIN_SVG_DATA_URI}")` }} />
    </>
  );
}

function MistDots() {
  const mist = useMistDots(12);
  return (
    <div className="pointer-events-none absolute inset-0">
      {mist.map((m, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: 560,
            height: 240,
            opacity: m.opacity,
            transform: `translate3d(0,0,0) scale(${m.scale})`,
            filter: `blur(${m.blur}px)`,
            backgroundImage: `url("${MIST_SVG_DATA_URI}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            animation: `mistFloat ${m.duration}s ease-in-out ${m.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1..1
      setParallax({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove as any);
  }, []);

  const pX = parallax.x * 6;
  const pY = parallax.y * 4;

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden px-4 sm:px-6 pt-24 sm:pt-28 pb-14 sm:pb-16">
      {/* base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060913] via-[#0a0f20] to-[#05060d]" />

      {/* glow */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          transform: `translate3d(${pX * 0.35}px, ${pY * 0.35}px, 0)`,
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(255, 220, 150, 0.18), transparent 38%), radial-gradient(circle at 82% 24%, rgba(180, 230, 210, 0.10), transparent 40%), radial-gradient(circle at 50% 60%, rgba(255, 255, 255, 0.06), transparent 46%)",
        }}
      />

      {/* mist + mountains */}
      <div style={{ transform: `translate3d(${pX * 0.25}px, ${pY * 0.2}px, 0)` }} className="absolute inset-0">
        <MistSheets />
        <MistDots />
      </div>

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_35%,rgba(0,0,0,0.70)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          {/* left */}
          <div className="text-center md:text-left">
            <p className="text-xs tracking-[0.34em] text-white/55">ENGINEERING MANAGEMENT • DATA & ML</p>

            <h1 className="mt-5 text-balance text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05]">
              <span className="gold-text drop-shadow-[0_18px_60px_rgba(0,0,0,0.6)] block">Make It Work.</span>
              <span className="gold-text drop-shadow-[0_18px_60px_rgba(0,0,0,0.6)] block mt-2">Make It Scale.</span>
            </h1>

            <p className="mt-6 max-w-xl mx-auto md:mx-0 text-sm sm:text-base leading-7 text-white/72">
              I build reproducible, decision-focused analytics: leakage-safe ML pipelines, simulation with uncertainty,
              and stakeholder-ready reporting.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
              <SigilChip>Leakage-safe modeling</SigilChip>
              <SigilChip>Monte Carlo + CI</SigilChip>
              <SigilChip>Data QA & pipelines</SigilChip>
              <SigilChip>Clear deliverables</SigilChip>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
              <PrimaryButton href="#projects">Enter</PrimaryButton>
              <GhostButton href="mailto:cchen90@stevens.edu">Email</GhostButton>
              <GhostButton href="/Changye_Resume.pdf">Resume</GhostButton>
            </div>

            <div className="mt-10">
              <a href="#projects" className="group inline-flex flex-col items-center md:items-start gap-1 text-amber-200/75">
                <span className="text-xs uppercase tracking-[0.35em]">Scroll</span>
                <span className="text-3xl leading-none transition group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </div>

          {/* right (photo + small stat pills only; no Featured) */}
          <div className="mx-auto w-full max-w-[520px]">
            <div className="heroCard">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                <Image
                  src="/me_4x5_1600w.webp"
                  alt="Portrait of Changye Chen"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 92vw, 520px"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/45" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  ["Focus", "Data + ML"],
                  ["Style", "Reproducible"],
                  ["Output", "Measurable"],
                ].map(([k, v]) => (
                  <div key={k} className="statPill">
                    <p className="text-xs text-white/55">{k}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .gold-text {
          background: linear-gradient(180deg, #ffe8a3 0%, #fff2c8 18%, #f2c96a 55%, #b07a18 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .heroCard {
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(0, 0, 0, 0.24) 100%);
          padding: 14px;
          backdrop-filter: blur(12px);
          box-shadow: 0 26px 90px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.10);
        }

        .statPill {
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.10);
          background: rgba(0, 0, 0, 0.22);
          padding: 12px;
          backdrop-filter: blur(10px);
        }

        /* blade shine */
        .bladeShine {
          stroke-dasharray: 24 120;
          stroke-dashoffset: 120;
          transition: stroke 0.3s ease;
        }
        a.group:hover .bladeShine {
          animation: bladeSweep 0.75s ease-out 1;
        }
        @keyframes bladeSweep {
          0% {
            stroke-dashoffset: 120;
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        /* mist sheets (cheap & stable) */
        .mistSheet {
          position: absolute;
          left: -20%;
          width: 140%;
          height: 56vh;
          bottom: -10vh;
          background-repeat: repeat-x;
          background-size: 1200px 420px;
          opacity: 0.22;
          filter: blur(14px);
          transform: translate3d(0, 0, 0);
          animation-name: mistDrift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .mistSheet1 {
          opacity: 0.18;
          animation-duration: 54s;
        }
        .mistSheet2 {
          bottom: -6vh;
          opacity: 0.26;
          filter: blur(10px);
          animation-duration: 34s;
          animation-direction: reverse;
        }
        @keyframes mistDrift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 1200px 0;
          }
        }
        @keyframes mistFloat {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(26px, -12px, 0) scale(1);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .mountainBand {
          position: absolute;
          left: 50%;
          bottom: -2vh;
          width: 1600px;
          height: 420px;
          transform: translateX(-50%);
          background-repeat: no-repeat;
          background-size: 1600px 420px;
          opacity: 0.9;
          filter: blur(0px);
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .mountainBand {
            width: 1200px;
            background-size: 1200px 420px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mistSheet {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="projectCard group">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
        {p.image ? (
          <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 92vw, 33vw" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,220,150,0.18),transparent_55%),radial-gradient(circle_at_80%_65%,rgba(180,230,210,0.10),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.22))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/40" />
      </div>

      <div className="mt-4">
        <h3 className="text-base font-semibold text-amber-50">{p.name}</h3>
        <p className="mt-1 text-sm text-white/65">{p.tagline}</p>

        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {p.summary.map((x) => (
            <li key={x} className="flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 rounded-sm bg-amber-200/70 shrink-0" />
              <span className="leading-6">{x}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <SigilChip key={t}>{t}</SigilChip>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.links.map((l) => {
            const isPrimary = l.variant === "primary";
            return (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                className={clsx(
                  "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0",
                  isPrimary
                    ? "bg-amber-300 text-black shadow-lg shadow-amber-900/25 hover:bg-amber-200"
                    : "border border-white/16 bg-white/8 text-white hover:bg-white/12"
                )}
              >
                {l.label}
              </a>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .projectCard {
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          padding: 16px;
          backdrop-filter: blur(12px);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.10);
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .projectCard:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </article>
  );
}

function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative min-h-[100svh] w-full overflow-hidden py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060913] via-[#0a0f20] to-[#05060d]" />
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 16%, rgba(255, 220, 150, 0.14), transparent 40%), radial-gradient(circle at 82% 64%, rgba(180, 230, 210, 0.09), transparent 46%)",
        }}
      />
      <MistSheets />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">PROJECTS</p>
          <h2 className="mt-3 text-3xl font-semibold text-amber-50 drop-shadow md:text-4xl">Case Studies</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65">
            Links are real (Colab + downloads). Tags are informational chips.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative min-h-[100svh] w-full overflow-hidden py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060913] via-[#0a0f20] to-[#05060d]" />
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(circle at 22% 22%, rgba(255, 220, 150, 0.12), transparent 42%), radial-gradient(circle at 78% 30%, rgba(180, 230, 210, 0.08), transparent 46%)",
        }}
      />
      <MistSheets />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-10">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">ABOUT</p>
          <h2 className="mt-3 text-3xl font-semibold text-amber-50 drop-shadow md:text-4xl">How I work</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65">
            Simple process, clear metrics, and repeatable delivery.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          {[
            ["01", "Define the decision", "Clarify objective, constraints, and success metrics."],
            ["02", "Build a clean pipeline", "QA checks, leakage-safe features, reproducible runs."],
            ["03", "Validate & explain", "Cross-validation, uncertainty, interpretation."],
            ["04", "Ship deliverables", "Readable report + next actions stakeholders can use."],
          ].map(([n, t, d]) => (
            <div
              key={n}
              className="rounded-3xl border border-white/12 bg-white/5 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="text-xs font-semibold tracking-[0.3em] text-white/55">{n}</p>
              <h3 className="mt-3 text-base font-semibold text-amber-50">{t}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative min-h-[100svh] w-full overflow-hidden py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060913] via-[#0a0f20] to-[#05060d]" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 18%, rgba(255, 220, 150, 0.14), transparent 42%), radial-gradient(circle at 82% 72%, rgba(180, 230, 210, 0.08), transparent 46%)",
        }}
      />
      <MistSheets />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-10">
        <div className="mx-auto max-w-3xl rounded-[36px] border border-white/12 bg-white/5 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.60)] backdrop-blur md:p-10">
          <h2 className="text-balance text-3xl font-semibold text-amber-50 md:text-4xl">Let’s build something measurable.</h2>
          <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
            If you need ML evaluation, clean data pipelines, or simulation-driven decisions, I can help you move fast with
            solid outputs.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="mailto:cchen90@stevens.edu">Email me</PrimaryButton>
            <GhostButton href="/Changye_Resume.pdf">Download resume</GhostButton>
            <GhostButton href="https://github.com/Changye0125" target="_blank" rel="noreferrer">
              GitHub
            </GhostButton>
          </div>

          <div className="mt-7 text-sm text-white/70">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span className="text-white/50">Email:</span>
              <a className="hover:text-amber-200 transition" href="mailto:cchen90@stevens.edu">
                cchen90@stevens.edu
              </a>
            </div>
          </div>
        </div>

        <footer className="py-10 text-center text-xs text-white/45">© {new Date().getFullYear()} Changye Chen</footer>
      </div>
    </section>
  );
}

export default function Page() {
  const [open, setOpen] = useState(false);

  // IMPORTANT: spaces in filenames are risky; encodeURI makes links safer.
  const em624Pptx = encodeURI("/EM624 - Predicting NFL Game Outcomes.pptx");
  const sys611Pdf = encodeURI("/SYS611_TermProject_NFL4thDown_MonteCarlo.pdf");

  const projects: Project[] = [
    {
      name: "NFL Play-by-Play ML Pipeline (EM624)",
      tagline: "Leakage-safe features, strong baselines, and interpretable outputs.",
      summary: [
        "Built a leakage-safe feature pipeline using recent-form matchup trends.",
        "Benchmarked classifiers with cross-validation and clear metrics.",
        "Used SHAP to explain predictions for stakeholder-ready interpretation.",
      ],
      tags: ["Python", "pandas", "scikit-learn", "XGBoost", "SHAP"],
      image: "",
      links: [
        {
          label: "Open Colab",
          href: "https://colab.research.google.com/drive/1cXyP8DP4dS2wa59tvASfKJl5-3Zb9NL6?usp=sharing",
          variant: "primary",
          external: true,
        },
        { label: "Download PPTX", href: em624Pptx, variant: "ghost" },
      ],
    },
    {
      name: "Monte Carlo Strategy Simulation (SYS611)",
      tagline: "Compare policies with confidence intervals and explicit uncertainty.",
      summary: [
        "Estimated transition/scoring parameters from historical play-by-play data.",
        "Simulated outcomes under multiple 4th-down decision policies.",
        "Reported 95% CIs to quantify risk–reward trade-offs.",
      ],
      tags: ["Monte Carlo", "Simulation", "Analytics", "Confidence Intervals"],
      image: "/montecarlo_16x10_1600w.webp",
      links: [
        {
          label: "Open Colab",
          href: "https://colab.research.google.com/drive/1FrYON171XMlLIq9T_8V8JcveaYF7LTzh?usp=sharing",
          variant: "primary",
          external: true,
        },
        { label: "Download PDF", href: sys611Pdf, variant: "ghost" },
      ],
    },
    {
      name: "EEG / iEEG Data Standardization (Lab)",
      tagline: "Unified schemas, metadata, and QA to make datasets training-ready.",
      summary: [
        "Converted heterogeneous raw formats into a consistent schema.",
        "Standardized channels and preprocessing rules across sources.",
        "Delivered QA checks + manifests + splits for downstream modeling.",
      ],
      tags: ["Data Engineering", "HDF5", "Metadata", "QA"],
      image: "",
      links: [{ label: "Details (on request)", href: "#contact", variant: "primary" }],
    },
  ];

  return (
    <main className="w-full overflow-x-hidden bg-[#05060d] text-white">
      <TopNav onOpen={() => setOpen(true)} />
      <Drawer open={open} onClose={() => setOpen(false)} />

      <Hero />
      <ProjectsSection projects={projects} />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
