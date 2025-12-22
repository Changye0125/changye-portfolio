"use client";

import React from "react";

function SwordConnect() {
  return (
    <a
      href="mailto:cchen90@stevens.edu"
      className="group relative inline-flex items-center gap-2 select-none"
      aria-label="Connect me"
      title="Connect me"
    >
      {/* Sword SVG: sheath + blade (hover -> blade slides out) */}
      <span className="relative h-9 w-[132px]">
        <svg
          viewBox="0 0 220 60"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* sheath */}
          <path
            d="M20 30 C55 18, 95 18, 128 30 C95 42, 55 42, 20 30 Z"
            className="fill-white/10 stroke-white/20"
          />
          {/* hilt */}
          <path
            d="M140 20 L152 20 L158 30 L152 40 L140 40 Z"
            className="fill-white/10 stroke-white/25"
          />
          {/* blade */}
          <g className="origin-left transition-transform duration-300 ease-out group-hover:translate-x-[22px]">
            <path
              d="M150 30 L210 30"
              className="stroke-emerald-200/80"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M206 24 L214 30 L206 36"
              className="stroke-emerald-200/80"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* glint */}
            <path
              d="M168 22 L176 30 L168 38"
              className="stroke-white/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </span>

      <span className="text-xs tracking-[0.32em] text-white/70 group-hover:text-emerald-200">
        CONNECT ME
      </span>
    </a>
  );
}

function Hamburger() {
  return (
    <button
      type="button"
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur hover:bg-white/10"
      aria-label="Menu"
      title="Menu"
      onClick={() => alert("下一步做侧边菜单 Drawer")}
    >
      <span className="absolute h-[2px] w-5 bg-white/70 transition group-hover:w-6 -translate-y-[6px]" />
      <span className="absolute h-[2px] w-5 bg-white/70 transition group-hover:w-6" />
      <span className="absolute h-[2px] w-5 bg-white/70 transition group-hover:w-6 translate-y-[6px]" />
    </button>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* 背景：宣纸夜色 + 水墨雾 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b1a] via-[#08142a] to-[#04060d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(255,255,255,0.07),transparent_50%),radial-gradient(ellipse_at_85%_75%,rgba(255,255,255,0.06),transparent_55%)] blur-[2px]" />

        {/* 云雾层：纯 CSS 漂移（不需要素材也能先跑） */}
        <div className="mist mist-1" />
        <div className="mist mist-2" />
        <div className="mist mist-3" />

        <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.55))]" />
      </div>

      {/* 右上角：剑 + 汉堡 */}
      <header className="fixed right-4 top-4 z-50 flex items-center gap-3">
        <SwordConnect />
        <Hamburger />
      </header>

      {/* 正中：两行大字 */}
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

          <p className="mt-6 text-sm tracking-[0.32em] text-white/60">
            XIANXIA-STYLE PORTFOLIO · NEXT.JS · 2D MOTION
          </p>
        </div>
      </section>

      {/* 全局样式（先写在这里，下一步我会让你挪到 globals.css） */}
      <style jsx global>{`
        .mist {
          position: absolute;
          inset: -30%;
          background: radial-gradient(
              ellipse at 20% 40%,
              rgba(255, 255, 255, 0.10),
              transparent 55%
            ),
            radial-gradient(
              ellipse at 70% 30%,
              rgba(255, 255, 255, 0.08),
              transparent 52%
            ),
            radial-gradient(
              ellipse at 50% 75%,
              rgba(255, 255, 255, 0.06),
              transparent 55%
            );
          filter: blur(10px);
          opacity: 0.55;
          animation: mistDrift linear infinite;
          transform: translate3d(0, 0, 0);
        }
        .mist-1 {
          animation-duration: 28s;
        }
        .mist-2 {
          opacity: 0.42;
          animation-duration: 36s;
          animation-direction: reverse;
        }
        .mist-3 {
          opacity: 0.35;
          animation-duration: 44s;
        }

        @keyframes mistDrift {
          0% {
            transform: translate3d(-2%, 0, 0);
          }
          50% {
            transform: translate3d(2%, -1.5%, 0);
          }
          100% {
            transform: translate3d(-2%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mist {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
