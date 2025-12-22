import Image from "next/image";

type Project = {
  name: string;
  tagline: string;
  bullets: string[];
  tags: string[];
  image?: string;
  ppt?: string;
  link?: string;
  privateNote?: string;
};

// —— 仙侠风：流萤（固定坐标，非随机，不会 hydration mismatch）
const FIREFLIES = [
  { left: "8%", top: "18%", size: 6, dur: 10, delay: 0.2, op: 0.55 },
  { left: "18%", top: "42%", size: 4, dur: 12, delay: 1.1, op: 0.45 },
  { left: "30%", top: "26%", size: 5, dur: 11, delay: 0.6, op: 0.5 },
  { left: "46%", top: "14%", size: 3, dur: 9, delay: 1.6, op: 0.35 },
  { left: "60%", top: "30%", size: 6, dur: 13, delay: 0.4, op: 0.55 },
  { left: "72%", top: "20%", size: 4, dur: 10, delay: 2.1, op: 0.42 },
  { left: "84%", top: "38%", size: 5, dur: 12, delay: 0.9, op: 0.5 },
  { left: "14%", top: "72%", size: 5, dur: 14, delay: 1.8, op: 0.45 },
  { left: "40%", top: "76%", size: 4, dur: 12, delay: 2.4, op: 0.35 },
  { left: "66%", top: "70%", size: 6, dur: 15, delay: 1.2, op: 0.5 },
  { left: "86%", top: "78%", size: 4, dur: 13, delay: 0.7, op: 0.35 },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-200/25 bg-emerald-200/10 px-3 py-1 text-xs text-emerald-100/90 backdrop-blur">
      {children}
    </span>
  );
}

function TagChip({ children }: { children: React.ReactNode }) {
  // 标签：弱信息，别像按钮
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
      {children}
    </span>
  );
}

function PrimaryButton(props: React.ComponentProps<"a">) {
  // 仙侠青玉主按钮：一眼可点
  return (
    <a
      {...props}
      className={[
        "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold",
        "bg-gradient-to-b from-emerald-100 via-emerald-200 to-emerald-400 text-[#041012]",
        "shadow-[0_18px_55px_rgba(0,0,0,0.35)]",
        "transition hover:-translate-y-0.5 hover:brightness-[1.03] active:translate-y-0",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function SecondaryButton(props: React.ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={[
        "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold",
        "border border-white/15 bg-white/8 text-white hover:bg-white/12",
        "backdrop-blur transition hover:-translate-y-0.5 active:translate-y-0",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function ActionButton(
  props: React.ComponentProps<"a"> & { variant?: "primary" | "ghost" }
) {
  const v = props.variant ?? "ghost";
  const base =
    "inline-flex h-10 items-center justify-center rounded-full px-4 text-xs font-semibold transition hover:-translate-y-0.5 active:translate-y-0";
  const cls =
    v === "primary"
      ? "bg-gradient-to-b from-emerald-100 via-emerald-200 to-emerald-400 text-[#041012] shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
      : "border border-white/15 bg-white/8 text-white hover:bg-white/12 backdrop-blur";

  const { variant, className, ...rest } = props;
  return <a {...rest} className={[base, cls, className ?? ""].join(" ")} />;
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs uppercase tracking-[0.38em] text-emerald-100/55">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-2xl font-semibold text-white md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-sm leading-6 text-white/65 md:text-base">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function ImageOrPlaceholder({
  src,
  alt,
  aspectClassName,
}: {
  src?: string;
  alt: string;
  aspectClassName: string;
}) {
  if (!src?.trim()) {
    return (
      <div
        className={[
          "relative overflow-hidden rounded-2xl border border-white/10",
          aspectClassName,
        ].join(" ")}
      >
        {/* 仙侠占位：青玉光 + 紫雾 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(110,231,183,0.28),transparent_58%),radial-gradient(circle_at_80%_28%,rgba(167,139,250,0.20),transparent_60%),radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(0,0,0,0.22))]" />
        <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-white/70 backdrop-blur">
          NFL 图稍后补上 / Coming soon
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-white/10",
        aspectClassName,
      ].join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 92vw, 600px"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/35" />
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const hasPpt = !!p.ppt?.trim();
  const hasLink = !!p.link?.trim();
  const hasAnyLink = hasPpt || hasLink;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-[0_26px_90px_rgba(0,0,0,0.45)] backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.08]">
      <div className="p-4">
        <ImageOrPlaceholder src={p.image} alt={p.name} aspectClassName="aspect-[16/10]" />
      </div>

      <div className="px-5 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-white">{p.name}</h3>
            <p className="mt-1 text-sm text-white/70">{p.tagline}</p>
          </div>

          {!hasAnyLink ? (
            <span className="shrink-0 rounded-full border border-white/12 bg-black/25 px-3 py-1 text-xs text-white/70">
              {p.privateNote ?? "Private"}
            </span>
          ) : null}
        </div>

        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {p.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-200/70" />
              <span className="leading-6">{b}</span>
            </li>
          ))}
        </ul>

        {/* Links / Tech 分区：按钮 vs 标签一眼区分 */}
        <div className="mt-5">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">Links</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {hasLink ? (
              <ActionButton href={p.link} target="_blank" rel="noopener noreferrer" variant="primary">
                Open Demo
              </ActionButton>
            ) : null}
            {hasPpt ? (
              <ActionButton href={p.ppt} target="_blank" rel="noopener noreferrer">
                Slides / PDF
              </ActionButton>
            ) : null}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">Tech</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <TagChip key={t}>{t}</TagChip>
            ))}
          </div>
        </div>
      </div>

      {/* 仙侠灵光 */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-emerald-300/12 blur-3xl opacity-0 transition group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-28 -bottom-40 h-72 w-72 rounded-full bg-violet-300/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
    </article>
  );
}

export default function Home() {
  const name = "Changye Chen";
  const title = "Engineering Management • Data & ML • Portfolio";
  const email = "cchen90@stevens.edu";
  const github = "https://github.com/Changye0125";
  const linkedin = "https://www.linkedin.com"; // 换成你自己的
  const resume = "/Changye_Resume.pdf";

  const projects: Project[] = [
    {
      name: "NFL Play-by-Play ML Pipeline",
      tagline: "Leakage-free modeling + interpretable win-probability signals.",
      bullets: [
        "Built a leakage-free feature pipeline using recent-form matchup trends.",
        "Benchmarked classifiers with cross-validation (ROC-AUC ≈ 0.637).",
        "Used SHAP to explain predictions for stakeholder-ready interpretation.",
      ],
      tags: ["Python", "pandas", "scikit-learn", "XGBoost", "SHAP"],
      image: "", // 先空：仙侠占位图
      ppt: "/EM624%20-%20Predicting%20NFL%20Game%20Outcomes.pptx",
      link: "https://colab.research.google.com/drive/1cXyP8DP4dS2wa59tvASfKJl5-3Zb9NL6?usp=sharing",
    },
    {
      name: "EEG / iEEG Data Standardization Pipeline",
      tagline: "Unified schema + metadata + QA for training readiness.",
      bullets: [
        "Converted raw formats (MAT/EDF/BDF) into a unified HDF5 schema.",
        "Standardized channels via 10–20 mapping and consistent resampling rules.",
        "Delivered QA checks + manifests + train/val/test splits.",
      ],
      tags: ["Python", "Data Engineering", "HDF5", "QA"],
      image: "",
      ppt: "",
      link: "",
      privateNote: "Private lab repo (available upon request)",
    },
    {
      name: "Monte Carlo Simulation (Risk / Strategy)",
      tagline: "Compare 4th-down policies with confidence intervals.",
      bullets: [
        "Estimated transition/scoring parameters from historical play-by-play data.",
        "Simulated outcomes under conservative/balanced/aggressive policies.",
        "Reported 95% CIs to make risk–reward trade-offs explicit.",
      ],
      tags: ["Monte Carlo", "Simulation", "Analytics", "CI"],
      image: "/montecarlo_16x10_1600w.webp",
      ppt: "/SYS611_TermProject_NFL4thDown_MonteCarlo.pdf",
      link: "https://colab.research.google.com/drive/1FrYON171XMlLIq9T_8V8JcveaYF7LTzh?usp=sharing",
    },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* 仙侠背景：靛青夜 + 青玉灵光 + 云雾 + 流萤 */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b1a] via-[#08142a] to-[#04060d]" />
        {/* jade + violet glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(110,231,183,0.22),transparent_55%),radial-gradient(circle_at_82%_20%,rgba(167,139,250,0.16),transparent_58%),radial-gradient(circle_at_50%_65%,rgba(255,255,255,0.06),transparent_60%)]" />
        {/* ink-wash mist */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,255,255,0.09),transparent_48%),radial-gradient(ellipse_at_20%_72%,rgba(255,255,255,0.07),transparent_52%),radial-gradient(ellipse_at_85%_80%,rgba(255,255,255,0.06),transparent_55%)] blur-[2px]" />
        {/* bottom fog */}
        <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.55))]" />

        {/* fireflies */}
        <div className="absolute inset-0">
          {FIREFLIES.map((f, i) => (
            <span
              key={i}
              className="firefly absolute rounded-full"
              style={{
                left: f.left,
                top: f.top,
                width: f.size,
                height: f.size,
                opacity: f.op,
                animationDuration: `${f.dur}s`,
                animationDelay: `${f.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/10 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#top" className="text-sm font-semibold tracking-[0.28em] text-emerald-50 hover:text-emerald-200">
            CHANGYE
          </a>
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-emerald-200" href="#projects">Projects</a>
            <a className="hover:text-emerald-200" href="#capabilities">Capabilities</a>
            <a className="hover:text-emerald-200" href="#process">Process</a>
            <a className="hover:text-emerald-200" href="#contact">Contact</a>
          </nav>
          <a
            href="#projects"
            className="md:hidden rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold text-white hover:bg-white/12"
          >
            View Projects
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* HERO */}
        <section className="grid min-h-[92svh] grid-cols-1 items-center gap-10 py-12 md:grid-cols-2 md:py-16">
          {/* Left */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Available for internships / projects</Badge>
              <Badge>Hoboken, NJ</Badge>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] md:text-6xl">
              <span className="bg-gradient-to-b from-emerald-100 via-white to-violet-100 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>

            <p className="mt-3 text-lg text-white/70 md:text-xl">{title}</p>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/72">
              I build <span className="text-emerald-100">reproducible</span>,{" "}
              <span className="text-emerald-100">leakage-free</span> ML pipelines and{" "}
              <span className="text-emerald-100">decision simulations</span> that stakeholders can trust.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <TagChip>Leakage-free</TagChip>
              <TagChip>Interpretability</TagChip>
              <TagChip>Monte Carlo + CI</TagChip>
              <TagChip>Data QA / schemas</TagChip>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href={`mailto:${email}`}>Email me</PrimaryButton>
              <SecondaryButton href="#projects">View projects</SecondaryButton>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <a className="hover:text-emerald-200" href={github} target="_blank" rel="noreferrer">
                GitHub →
              </a>
              <a className="hover:text-emerald-200" href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn →
              </a>
              <a className="hover:text-emerald-200" href={resume}>
                Resume →
              </a>
            </div>
          </div>

          {/* Right photo */}
          <div className="mx-auto w-full max-w-[520px]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(110,231,183,0.18),transparent_58%),radial-gradient(circle_at_85%_22%,rgba(167,139,250,0.14),transparent_62%)]" />
              <div className="relative p-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src="/me_4x5_1600w.webp"
                    alt="Portrait of Changye Chen"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 92vw, 520px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/45" />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-3 backdrop-blur">
                    <p className="text-xs text-white/60">Focus</p>
                    <p className="mt-1 text-sm font-semibold text-white">Data + ML</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-3 backdrop-blur">
                    <p className="text-xs text-white/60">Style</p>
                    <p className="mt-1 text-sm font-semibold text-white">Reproducible</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-3 backdrop-blur">
                    <p className="text-xs text-white/60">Output</p>
                    <p className="mt-1 text-sm font-semibold text-white">Metrics</p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-white/55">
                  Stevens M.Eng candidate • Decision-focused analytics • Stakeholder-ready deliverables
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-24 py-14">
          <SectionTitle
            eyebrow="CASE STUDIES"
            title="Projects that read like results"
            desc="Links are actionable buttons; Tech are informational chips (visually separated)."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="scroll-mt-24 py-14">
          <SectionTitle
            eyebrow="WHAT I DO"
            title="Capabilities"
            desc="Explainable, reproducible, measurable delivery."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: "Modeling & Evaluation",
                desc: "Leakage-safe design, robust validation, interpretability (SHAP), clean reporting.",
                chips: ["CV / AUC", "Calibration", "SHAP"],
              },
              {
                title: "Data Engineering & QA",
                desc: "Schema, harmonization, metadata, integrity checks, consistent preprocessing.",
                chips: ["HDF5", "Metadata", "Automated QA"],
              },
              {
                title: "Simulation & Risk",
                desc: "Monte Carlo with confidence intervals to compare policies and quantify risk.",
                chips: ["Monte Carlo", "CI", "Policy Comparison"],
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_26px_90px_rgba(0,0,0,0.45)] backdrop-blur"
              >
                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{c.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.chips.map((x) => (
                    <TagChip key={x}>{x}</TagChip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="scroll-mt-24 py-14">
          <SectionTitle
            eyebrow="HOW I WORK"
            title="A simple, repeatable delivery process"
            desc="Built for clarity and stakeholder confidence."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-4">
            {[
              { n: "01", t: "Define decision + metric", d: "Clarify success criteria and what to optimize." },
              { n: "02", t: "Build pipeline + QA", d: "Make data consistent, validated, reproducible." },
              { n: "03", t: "Model/simulate + validate", d: "Compare baselines, quantify uncertainty, avoid leakage." },
              { n: "04", t: "Deliver + next actions", d: "Write-up + visuals + recommendations you can act on." },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_26px_90px_rgba(0,0,0,0.45)] backdrop-blur"
              >
                <p className="text-xs font-semibold tracking-[0.3em] text-white/55">{s.n}</p>
                <h3 className="mt-3 text-base font-semibold text-white">{s.t}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="scroll-mt-24 py-14">
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.06] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur md:p-10">
            <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-emerald-300/12 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-violet-300/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-balance text-2xl font-semibold text-white md:text-3xl">
                Let’s build something measurable.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
                If you need ML evaluation, data pipelines, or simulation-driven decisions, I can help you move fast with clean outputs.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href={`mailto:${email}`}>Email me</PrimaryButton>
                <SecondaryButton href={resume}>Download resume</SecondaryButton>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/70">
                <span className="text-white/50">Contact:</span>
                <a className="hover:text-emerald-200" href={`mailto:${email}`}>{email}</a>
                <a className="hover:text-emerald-200" href={github} target="_blank" rel="noreferrer">GitHub</a>
                <a className="hover:text-emerald-200" href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>

          <footer className="py-10 text-center text-xs text-white/45">
            © {new Date().getFullYear()} {name}
          </footer>
        </section>
      </main>

      {/* firefly styles */}
      <style jsx global>{`
        .firefly {
          background: radial-gradient(circle, rgba(236, 253, 245, 0.95), rgba(110, 231, 183, 0.55), rgba(0, 0, 0, 0) 70%);
          filter: drop-shadow(0 0 10px rgba(110, 231, 183, 0.45));
          animation-name: fireflyFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes fireflyFloat {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          40% { transform: translate3d(18px, -22px, 0) scale(1.08); }
          70% { transform: translate3d(-14px, 14px, 0) scale(0.96); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .firefly { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
