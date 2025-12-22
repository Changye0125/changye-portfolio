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
      <span className="relative h-10 w-[180px]">
        <svg
          viewBox="0 0 360 90"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* 鞘 */}
          <path
            d="M22 45 C70 18, 160 18, 205 45 C160 72, 70 72, 22 45 Z"
            className="fill-white/10 stroke-white/25"
            strokeWidth="2"
          />
          {/* 鞘尖 */}
          <path
            d="M20 45 C14 40, 14 50, 20 45 Z"
            className="fill-white/10 stroke-white/25"
            strokeWidth="2"
          />
          {/* 护手 */}
          <path
            d="M214 36 L234 36 L240 45 L234 54 L214 54 Z"
            className="fill-white/10 stroke-white/25"
            strokeWidth="2"
          />
          {/* 剑柄 */}
          <path
            d="M240 32 L266 32 L280 45 L266 58 L240 58 Z"
            className="fill-white/10 stroke-white/25"
            strokeWidth="2"
          />
          {/* 缠绕 */}
          <path
            d="M246 38 L268 52"
            className="stroke-white/18"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M246 52 L268 38"
            className="stroke-white/18"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* 穗子 */}
          <path
            d="M278 58 C286 66, 296 72, 306 78"
            className="stroke-emerald-200/50"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 剑身：hover 出鞘 */}
          <g className="transition-transform duration-300 ease-out group-hover:translate-x-[42px]">
            <path
              d="M234 45 L338 45"
              className="stroke-emerald-200/85"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* 高光 */}
            <path
              d="M248 42 L328 42"
              className="stroke-white/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* 剑尖 */}
            <path
              d="M334 36 L350 45 L334 54"
              className="stroke-emerald-200/85"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* 寒光一闪 */}
            <path
              d="M290 28 L304 45 L290 62"
              className="stroke-white/28 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* 淡淡灵气光晕（不用复杂 gradient） */}
        <span className="pointer-events-none absolute -inset-2 rounded-full opacity-0 blur-xl transition duration-300 group-hover:opacity-100 bg-emerald-400/15" />
      </span>

      <span className="text-xs tracking-[0.34em] text-white/70 group-hover:text-emerald-200">
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
        "fixed inset-0 z-[60] transition",
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
          "border-l border-white/12 bg-[#070b1a]/75 backdrop-blur-xl",
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
              className="block rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white/80 hover:bg-white/[0.10] hover:text-emerald-200 transition"
            >
              {t}
            </a>
          ))}
        </nav>

        <div className="px-5 pt-2 pb-6 text-xs text-white/55">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="text-white/70">Quick links</div>
            <div className="mt-3 space-y-2">
              <a className="block hover:text-emerald-200" href="mailto:cchen90@stevens.edu">
                cchen90@stevens.edu
              </a>
              <a
                className="block hover:text-emerald-200"
                href="https://github.com/Changye0125"
                target="_blank"
                rel="noreferrer"
              >
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

function CloudBand({ variant }: { variant: "far" | "mid" | "near" }) {
  // 纯 SVG 云团：比复杂 CSS gradient 更稳（Vercel 不炸）
  return (
    <div className={`cloud cloud-${variant}`} aria-hidden="true">
      <svg viewBox="0 0 1200 260" className="h-full w-full" fill="none">
        <defs>
          <filter id="blur">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <g filter="url(#blur)">
          {/* 云团（多椭圆叠加） */}
          <ellipse cx="120" cy="170" rx="180" ry="70" fill="white" fillOpacity="0.35" />
          <ellipse cx="270" cy="160" rx="220" ry="85" fill="white" fillOpacity="0.32" />
          <ellipse cx="460" cy="175" rx="240" ry="90" fill="white" fillOpacity="0.30" />
          <ellipse cx="660" cy="160" rx="260" ry="92" fill="white" fillOpacity="0.28" />
          <ellipse cx="860" cy="178" rx="240" ry="88" fill="white" fillOpacity="0.30" />
          <ellipse cx="1030" cy="165" rx="210" ry="80" fill="white" fillOpacity="0.32" />

          {/* 云底铺一层，避免断裂 */}
          <rect x="0" y="160" width="1200" height="120" fill="white" fillOpacity="0.18" />
        </g>
      </svg>
    </div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main id="top" className="relative min-h-screen overflow-hidden text-white">
      {/* 背景底色 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b1a] via-[#08142a] to-[#04060d]" />
        {/* 淡淡宣纸雾 */}
        <div className="absolute inset-0 opacity-60 bg-gradient-to-b from-white/10 via-transparent to-black/30" />

        {/* 云层（3层不同速度/高度/模糊） */}
        <CloudBand variant="far" />
        <CloudBand variant="mid" />
        <CloudBand variant="near" />

        {/* 底部暗角 */}
        <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-b from-transparent to-black/60" />
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

      <Drawer open={open} onClose={() => setOpen(false)} />

      {/* 正中两行大字 */}
      <section className="grid min-h-screen place-items-center px-6">
        <div className="text-center">
          <h1 className="text-balance text-5xl font-semibold leading-[1.02] md:text-7xl drop-shadow-2xl">
            <span className="block bg-gradient-to-b from-emerald-100 via-white to-violet-100 bg-clip-text text-transparent">
              Make It Work.
            </span>
            <span className="mt-2 block bg-gradient-to-b from-emerald-100 via-white to-violet-100 bg-clip-text text-transparent">
              Make It Scale.
            </span>
          </h1>

          <p className="mt-6 text-xs tracking-[0.34em] text-white/60">
            XIANXIA LANDING · 2D CLOUD MOTION
          </p>

          <div className="mt-10 flex justify-center gap-3">
            <a
              href="#projects"
              className="inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold
                         bg-emerald-200 text-[#041012]
                         shadow-[0_18px_55px_rgba(0,0,0,0.35)]
                         transition hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
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

      {/* 锚点占位 */}
      <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-xl font-semibold text-white">Projects</h2>
        <p className="mt-3 text-white/70 text-sm leading-6">
          下一步：项目卡片做成“玉牌/卷轴”风格。
        </p>
      </section>

      <section id="about" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-xl font-semibold text-white">About</h2>
        <p className="mt-3 text-white/70 text-sm leading-6">
          下一步：道途简介 + 技能符箓。
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
    </main>
  );
}
