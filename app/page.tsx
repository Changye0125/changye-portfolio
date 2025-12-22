"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

type Mist = {
  left: number;
  top: number;
  delay: number;
  duration: number;
  scale: number;
  opacity: number;
  blur: number;
};

type Project = {
  name: string;
  desc: string;
  tags: string[];
  image?: string;
  link?: string;
};

function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 雾点：固定随机，避免 hydration mismatch */
function useMist(count = 10): Mist[] {
  return useMemo(() => {
    const rnd = makeRng(20251222 + count * 31);
    return Array.from({ length: count }).map(() => ({
      left: rnd() * 100,
      top: 10 + rnd() * 65,
      delay: rnd() * 6,
      duration: 18 + rnd() * 22,
      scale: 0.7 + rnd() * 1.1,
      opacity: 0.10 + rnd() * 0.16,
      blur: 10 + rnd() * 18,
    }));
  }, [count]);
}

/** 一张“水墨雾团”SVG（可重复铺开） */
const MIST_SVG_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="420" viewBox="0 0 1200 420">
  <defs>
    <filter id="b" x="-20%" y="-50%" width="140%" height="200%">
      <feGaussianBlur stdDeviation="22" />
    </filter>
  </defs>
  <g filter="url(#b)" opacity="0.95">
    <ellipse cx="120" cy="260" rx="220" ry="90" fill="#ffffff" fill-opacity="0.55"/>
    <ellipse cx="330" cy="240" rx="260" ry="105" fill="#ffffff" fill-opacity="0.50"/>
    <ellipse cx="560" cy="270" rx="320" ry="120" fill="#ffffff" fill-opacity="0.44"/>
    <ellipse cx="820" cy="245" rx="300" ry="110" fill="#ffffff" fill-opacity="0.46"/>
    <ellipse cx="1040" cy="275" rx="260" ry="100" fill="#ffffff" fill-opacity="0.50"/>
    <rect x="0" y="260" width="1200" height="160" fill="#ffffff" fill-opacity="0.24"/>
  </g>
</svg>
`);

function SwordConnect() {
  return (
    <a
      href="#contact"
      className="group relative flex items-center gap-2 select-none"
      aria-label="Connect me"
      title="Connect me"
    >
      <span className="relative h-10 w-[190px]">
        <svg viewBox="0 0 360 90" className="absolute inset-0 h-full w-full" fill="none">
          {/* 鞘 */}
          <path
            d="M20 45 C70 18, 160 18, 205 45 C160 72, 70 72, 20 45 Z"
            className="fill-white/10 stroke-white/25"
            strokeWidth="2"
          />
          <path
            d="M18 45 C12 40, 12 50, 18 45 Z"
            className="fill-white/10 stroke-white/25"
            strokeWidth="2"
          />

          {/* 护手 */}
          <path
            d="M214 36 L236 36 L242 45 L236 54 L214 54 Z"
            className="fill-white/10 stroke-white/25"
            strokeWidth="2"
          />
          {/* 剑柄 */}
          <path
            d="M242 32 L268 32 L284 45 L268 58 L242 58 Z"
            className="fill-white/10 stroke-white/25"
            strokeWidth="2"
          />
          {/* 缠绕 */}
          <path d="M248 38 L270 52" className="stroke-white/18" strokeWidth="2" strokeLinecap="round" />
          <path d="M248 52 L270 38" className="stroke-white/18" strokeWidth="2" strokeLinecap="round" />
          {/* 穗 */}
          <path
            d="M282 58 C290 66, 300 72, 312 78"
            className="stroke-amber-200/55"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 剑身：hover 出鞘 */}
          <g className="transition-transform duration-300 ease-out group-hover:translate-x-[42px]">
            <path
              d="M236 45 L338 45"
              className="stroke-amber-200/80"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M252 42 L328 42"
              className="stroke-white/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M334 36 L350 45 L334 54"
              className="stroke-amber-200/80"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M292 28 L306 45 L292 62"
              className="stroke-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        </svg>

        <span className="pointer-events-none absolute -inset-2 rounded-full opacity-0 blur-xl transition duration-300 group-hover:opacity-100 bg-amber-300/15" />
      </span>

      <span className="text-xs tracking-[0.34em] text-white/70 group-hover:text-amber-200">
        CONNECT ME
      </span>
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
    <div
      className={[
        "fixed inset-0 z-[70] transition",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      <div
        className={[
          "absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      <aside
        className={[
          "absolute right-0 top-0 h-full w-[320px] max-w-[85vw]",
          "border-l border-white/12 bg-black/40 backdrop-blur-xl",
          "shadow-[0_30px_120px_rgba(0,0,0,0.6)]",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
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
  href={p.link}
  target="_blank"
  rel="noreferrer"
  className="mt-5 block rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-black shadow-lg shadow-amber-900/25 transition hover:-translate-y-0.5 hover:bg-amber-200"
>
  Open →
</a>

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
        <a
          href="#top"
          className="text-sm font-semibold tracking-[0.28em] text-amber-50 transition hover:text-amber-200"
        >
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
  // 两层“铺开的雾”，靠 background-position 漂移，性能很好
  return (
    <>
      <div
        className="mistSheet mistSheet1"
        style={{
          backgroundImage: `url("${MIST_SVG_DATA_URI}")`,
        }}
      />
      <div
        className="mistSheet mistSheet2"
        style={{
          backgroundImage: `url("${MIST_SVG_DATA_URI}")`,
        }}
      />
    </>
  );
}

function MistDots() {
  const mist = useMist(12);
  return (
    <div className="pointer-events-none absolute inset-0">
      {mist.map((m, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: 520,
            height: 220,
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
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden px-4 sm:px-6 pt-24 sm:pt-28 pb-14 sm:pb-16">
      {/* 背景：别写复杂 global css，直接用简单色 + 少量叠层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060913] via-[#0a0f20] to-[#05060d]" />

      {/* 灵气光晕（inline style，Vercel 稳） */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 18%, rgba(255, 220, 150, 0.18), transparent 38%), radial-gradient(circle at 80% 22%, rgba(180, 230, 210, 0.10), transparent 40%), radial-gradient(circle at 50% 60%, rgba(255, 255, 255, 0.06), transparent 46%)",
        }}
      />

      {/* 云雾：漂移铺层 + 雾点 */}
      <MistSheets />
      <MistDots />

      {/* 轻微暗角 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_35%,rgba(0,0,0,0.68)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center justify-center">
        <div className="text-center">
          <h1 className="mt-2 text-balance text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.05]">
            <span className="gold-text drop-shadow-[0_18px_60px_rgba(0,0,0,0.6)] block">
              Make It Work.
            </span>
            <span className="gold-text drop-shadow-[0_18px_60px_rgba(0,0,0,0.6)] block mt-2">
              Make It Scale.
            </span>
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-sm sm:text-base leading-7 text-white/70">
            Changye Chen · Engineering Management · Data & ML
            <span className="block text-xs text-white/50 mt-1">
              仙侠基调（2D 分层云雾 + 玻璃卡）— 不建模也能像
            </span>
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="#projects"
              className="w-full sm:w-auto rounded-full bg-amber-300 px-7 py-3 text-center text-sm font-semibold text-black shadow-lg shadow-amber-900/30 transition hover:-translate-y-0.5 hover:bg-amber-200"
            >
              Enter
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto rounded-full border border-white/15 bg-white/8 px-7 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/12"
            >
              Contact
            </a>
          </div>

          {/* 右侧一点“人物/照片”感（可删） */}
          <div className="mt-10 mx-auto w-full max-w-[420px]">
            <div className="product-card">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10">
                  {/* 如果你没有这张图，先删掉这一块也行 */}
                  <Image src="/me_4x5_1600w.webp" alt="Portrait" fill className="object-cover" sizes="80px" />
                </div>
                <div className="min-w-0 text-left">
                  <p className="truncate text-sm font-semibold text-amber-50">Decision-focused analytics</p>
                  <p className="mt-1 text-xs text-white/60">Leakage-free ML · Simulation · Stakeholder-ready</p>
                  <p className="mt-2 text-xs text-white/55">（这块后面我们换成“卷轴/玉牌”更仙侠）</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <a href="#projects" className="group inline-flex flex-col items-center gap-1 text-amber-200/75">
              <span className="text-xs uppercase tracking-[0.35em]">Scroll</span>
              <span className="text-3xl leading-none transition group-hover:translate-y-0.5">↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* 样式：只保留“安全 CSS” */}
      <style jsx global>{`
        .gold-text {
          background: linear-gradient(180deg, #ffe8a3 0%, #fff2c8 18%, #f2c96a 55%, #b07a18 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .product-card {
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(0, 0, 0, 0.22) 100%);
          padding: 14px;
          backdrop-filter: blur(10px);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.10);
        }

        /* 云雾铺层：只动 background-position（最稳） */
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
          animation-duration: 52s;
        }
        .mistSheet2 {
          bottom: -6vh;
          opacity: 0.26;
          filter: blur(10px);
          animation-duration: 34s;
          animation-direction: reverse;
        }

        @keyframes mistDrift {
          0% { background-position: 0 0; }
          100% { background-position: 1200px 0; }
        }

        /* 雾点漂浮：轻轻左右上下 */
        @keyframes mistFloat {
          0% { transform: translate3d(0, 0, 0) scale(var(--s, 1)); }
          50% { transform: translate3d(26px, -12px, 0) scale(var(--s, 1)); }
          100% { transform: translate3d(0, 0, 0) scale(var(--s, 1)); }
        }

        @media (prefers-reduced-motion: reduce) {
          .mistSheet { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative w-full overflow-hidden scroll-mt-24 py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-[#060913] via-[#0a0f20] to-[#05060d]" />
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage:
          "radial-gradient(circle at 25% 20%, rgba(255, 220, 150, 0.12), transparent 40%), radial-gradient(circle at 80% 65%, rgba(180, 230, 210, 0.08), transparent 44%)",
      }} />
      <MistSheets />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">Projects</p>
          <h2 className="mt-3 text-3xl font-semibold text-amber-50 drop-shadow md:text-4xl">
            Case studies (placeholder)
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65">
            这里下一步我们会把卡片做成“玉牌/卷轴”，并把你的项目链接/Slides/Repo 加进去。
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p.name}
              className="rounded-3xl border border-white/12 bg-white/5 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 92vw, 33vw" />
                ) : (
                  <div className="absolute inset-0 bg-white/5" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
              </div>

              <div className="mt-4">
                <p className="text-base font-semibold text-amber-50">{p.name}</p>
                <p className="mt-2 text-sm text-white/65 leading-6">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="
