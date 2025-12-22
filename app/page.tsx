"use client";

import React, { useEffect, useState } from "react";

function SwordConnect() {
  return (
    <a
      href="#contact"
      className="group relative flex items-center gap-2 select-none"
      aria-label="Connect me"
      title="Connect me"
    >
      <span className="relative h-10 w-[168px]">
        <svg viewBox="0 0 320 80" className="absolute inset-0 h-full w-full" fill="none">
          {/* ====== SHEATH (fixed) ====== */}
          <path
            d="M22 40
               C62 22, 132 22, 174 40
               C132 58, 62 58, 22 40 Z"
            className="fill-white/10 stroke-white/25"
            strokeWidth="2"
          />
          {/* sheath tip */}
          <path
            d="M20 40 C16 36, 16 44, 20 40 Z"
            className="fill-white/10 stroke-white/25"
            strokeWidth="2"
          />
          {/* small cord */}
          <path
            d="M62 28 C58 34,58 46,62 52"
            className="stroke-white/18"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* ====== HANDLE + GUARD (fixed) ====== */}
          {/* guard */}
          <path
            d="M182 34 L196 34 L200 40 L196 46 L182 46 Z"
            className="fill-white/10 stroke-white/25"
            strokeWidth="2"
          />
          {/* handle */}
          <path
            d="M200 30 L220 30 L230 40 L220 50 L200 50 Z"
            className="fill-white/10 stroke-white/25"
            strokeWidth="2"
          />
          {/* wrap lines */}
          <path d="M206 34 L222 46" className="stroke-white/18" strokeWidth="2" strokeLinecap="round" />
          <path d="M206 46 L222 34" className="stroke-white/18" strokeWidth="2" strokeLinecap="round" />
          {/* tassel */}
          <path
            d="M228 50 C234 58, 242 62, 250 66"
            className="stroke-emerald-200/45"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* ====== BLADE (slides out on hover) ====== */}
          <g className="transition-transform duration-300 ease-out group-hover:translate-x-[36px]">
            {/* blade line */}
            <path
              d="M196 40 L304 40"
              className="stroke-emerald-200/85"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* blade highlight */}
            <path
              d="M210 37 L296 37"
              className="stroke-white/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* tip */}
            <path
              d="M300 32 L312 40 L300 48"
              className="stroke-emerald-200/85"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* “出鞘寒光” */}
            <path
              d="M252 26 L264 40 L252 54"
              className="stroke-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* hover 时一圈淡淡灵气 */}
        <span className="pointer-events-none absolute -inset-2 rounded-full opacity-0 blur-xl transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_40%_40%,rgba(110,231,183,0.25),transparent_60%)]" />
      </span>

      <span className="text-xs tracking-[0.34em] text-white/70 group-hover:text-emerald-200">
        CONNECT ME
      </span>
    </a>
  );
}

function Drawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={[
        "fixed inset-0 z-[60] transition",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      {/* overlay */}
      <div
        className={[
          "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      {/* panel */}
      <aside
        className={[
          "absolute right-0 top-0 h-full w-[320px] max-w-[85vw]",
          "border-l border-white/12 bg-[#070b1a]/70 backdrop-blur-xl",
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
              className="block rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white/80 hover:bg-white/[0.08] hover:text-emerald-200 transition"
            >
              {t}
            </a>
          ))}
        </nav>

        <div className="px-5 pt-2 pb-6 text-xs text-white/55">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <div className="text-white/70">Quick links</div>
            <div className="mt-3 space-y-2">
              <a className="block hover:text-emerald-200" href="mailto:cchen90@stevens.edu">
                cchen90@stevens.edu
              </a>
              <a className="block hover:text-emerald-200" href="https://github.com/Changye0125" target="_blank" rel="noreferrer">
                GitHub →
              </a>
              <a className="block hover:text-emerald-200" href="/Changye_Resume.pdf">
                Resume →
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main id="top" className="relative min-h-screen overflow-hidden text-white">
      {/* 背景：宣纸夜色 + 云海 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b1a] via-[#08142a] to-[#04060d]" />

        {/* 轻微宣纸光晕 */}
        <div className="cloudHaze" />

        {/* 云海层（纯CSS） */}
        <div className="cloudLayer cloud1" />
        <div className="cloudLayer cloud2" />
        <div className="cloudLayer cloud3" />

        {/* 顶部也来一点点雾气（可删） */}
        <div className="cloudTop" />

        {/* 底部暗角 */}
        <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.55))]" />

        {/* 轻颗粒（质感） */}
        <div className="grain" />
      </div>

      {/* 右上角：剑 + 汉堡 */}
      <header className="fixed right-4 top-4 z-50 flex items-center gap-3">
        <SwordConnect />

        <button
          type="button"
          className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur hover:bg-white/10"
          aria-label="Menu"
          title="Menu"
          onClick={() => setOpen(true)}
        >
          <span className="absolute h-[2px] w-5 bg-white/70 transition group-hover:w-6 -translate-y-[6px]" />
          <span className="absolute h-[2px] w-5 bg-white/70 transition group-hover:w-6" />
          <span className="absolute h-[2px] w-5 bg-white/70 transition group-hover:w-6 translate-y-[6px]" />
        </button>
      </header>

      {/* Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)} />

      {/* 中心：两行大字 */}
      <section className="grid min-h-screen place-items-center px-6">
        <div className="text-center">
          <h1 className="text-balance text-5xl font-semibold leading-[1.02] md:text-7xl">
            <span className="block bg-gradient-to-b from-emerald-100 via-white to-violet-100 bg-clip-text text-transparent drop-shadow-[0_18px_70px_rgba(0,0,0,0.55)]">
              Make It Work.
            </span>
            <span className="mt-2 block bg-gradient-to-b from-emerald-100 via-white to-violet-100 bg-clip-text text-transparent drop-shadow-[0_18px_70px_rgba(0,0,0,0.55)]">
              Make It Scale.
            </span>
          </h1>

          <p className="mt-6 text-xs tracking-[0.34em] text-white/60">
            XIANXIA LANDING · NEXT.JS · 2D CLOUD MOTION
          </p>

          <div className="mt-10 flex justify-center gap-3">
            <a
              href="#projects"
              className="inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold
                         bg-gradient-to-b from-emerald-100 via-emerald-200 to-emerald-400 text-[#041012]
                         shadow-[0_18px_55px_rgba(0,0,0,0.35)]
                         transition hover:-translate-y-0.5 hover:brightness-[1.03] active:translate-y-0"
            >
              Enter
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold
                         border border-white/15 bg-white/8 text-white hover:bg-white/12
                         backdrop-blur transition hover:-translate-y-0.5 active:translate-y-0"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      {/* 下面先放三个占位段落，防止锚点跳转没内容 */}
      <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-xl font-semibold text-white">Projects</h2>
        <p className="mt-3 text-white/70 text-sm leading-6">
          这里下一步我们放你的项目卡片（会做成更仙侠的卷轴/玉牌风格）。
        </p>
      </section>

      <section id="about" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-xl font-semibold text-white">About</h2>
        <p className="mt-3 text-white/70 text-sm leading-6">
          这里写一段“我的道途/我能解决什么问题”，配一点技能符箓标签。
        </p>
      </section>

      <section id="contact" className="mx-auto max-w-5xl px-6 pb-24 pt-20">
        <h2 className="text-xl font-semibold text-white">Contact</h2>
        <p className="mt-3 text-white/70 text-sm leading-6">
          发邮件：{" "}
          <a className="text-emerald-200 hover:underline" href="mailto:cchen90@stevens.edu">
            cchen90@stevens.edu
          </a>
        </p>
      </section>

      {/* 云/质感 CSS（先放这里，满意后我再带你移到 globals.css） */}
      <style jsx global>{`
        .cloudHaze {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 35% 25%, rgba(255, 255, 255, 0.1), transparent 60%),
            radial-gradient(ellipse at 70% 30%, rgba(255, 255, 255, 0.08), transparent 62%),
            radial-gradient(ellipse at 50% 70%, rgba(255, 255, 255, 0.06), transparent 60%);
          filter: blur(2px);
          opacity: 0.75;
        }

        /* 真的“云带”层：多团 radial 叠出来 */
        .cloudLayer {
          position: absolute;
          left: -35%;
          width: 170%;
          bottom: -14vh;
          height: 62vh;
          background: radial-gradient(circle at 6% 70%, rgba(255, 255, 255, 0.22) 0 28%, transparent 29%),
            radial-gradient(circle at 16% 72%, rgba(255, 255, 255, 0.2) 0 32%, transparent 33%),
            radial-gradient(circle at 28% 66%, rgba(255, 255, 255, 0.18) 0 30%, transparent 31%),
            radial-gradient(circle at 40% 74%, rgba(255, 255, 255, 0.22) 0 36%, transparent 37%),
            radial-gradient(circle at 52% 68%, rgba(255, 255, 255, 0.2) 0 33%, transparent 34%),
            radial-gradient(circle at 64% 76%, rgba(255, 255, 255, 0.18) 0 38%, transparent 39%),
            radial-gradient(circle at 76% 70%, rgba(255, 255, 255, 0.22) 0 34%, transparent 35%),
            radial-gradient(circle at 88% 74%, rgba(255, 255, 255, 0.18) 0 40%, transparent 41%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(0, 0, 0, 0));
          opacity: 0.55;
          filter: blur(10px);
          transform: translate3d(0, 0, 0);
          animation: cloudDrift linear infinite;
        }

        /* 三层不同速度/高度/模糊 = 立体感 */
        .cloud1 {
          bottom: -18vh;
          opacity: 0.5;
          filter: blur(14px);
          animation-duration: 38s;
        }
        .cloud2 {
          bottom: -12vh;
          opacity: 0.62;
          filter: blur(10px);
          animation-duration: 28s;
          animation-direction: reverse;
        }
        .cloud3 {
          bottom: -8vh;
          opacity: 0.4;
          filter: blur(18px);
          animation-duration: 52s;
        }

        @keyframes cloudDrift {
          0% {
            transform: translate3d(-2.5%, 0, 0);
          }
          50% {
            transform: translate3d(2.5%, -1.2%, 0);
          }
          100% {
            transform: translate3d(-2.5%, 0, 0);
          }
        }

        .cloudTop {
          position: absolute;
          left: -20%;
          top: -18vh;
          width: 140%;
          height: 40vh;
          opacity: 0.22;
          filter: blur(14px);
          background: radial-gradient(circle at 10% 60%, rgba(255, 255, 255, 0.18) 0 26%, transparent 27%),
            radial-gradient(circle at 28% 40%, rgba(255, 255, 255, 0.14) 0 30%, transparent 31%),
            radial-gradient(circle at 55% 55%, rgba(255, 255, 255, 0.14) 0 34%, transparent 35%),
            radial-gradient(circle at 80% 45%, rgba(255, 255, 255, 0.16) 0 30%, transparent 31%);
          animation: cloudTopDrift 46s ease-in-out infinite;
          transform: translate3d(0, 0, 0);
        }

        @keyframes cloudTopDrift {
          0% {
            transform: translate3d(1.5%, 0, 0);
          }
          50% {
            transform: translate3d(-1.5%, 1%, 0);
          }
          100% {
            transform: translate3d(1.5%, 0, 0);
          }
        }

        .grain {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          background-size: 260px 260px;
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .cloudLayer,
          .cloudTop {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
