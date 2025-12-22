import Image from "next/image";

type Project = {
  name: string;
  tagline: string;
  bullets: string[];
  tags: string[];
  image?: string; // /public 下路径：/images/xxx.webp
  ppt?: string;
  link?: string;
  privateNote?: string;
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-200/25 bg-amber-200/10 px-3 py-1 text-xs text-amber-100/90 backdrop-blur">
      {children}
    </span>
  );
}

function TagChip({ children }: { children: React.ReactNode }) {
  // 标签：更“弱”，避免像按钮
  return (
    <span className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
      {children}
    </span>
  );
}

function PrimaryButton(props: React.ComponentProps<"a">) {
  // 统一按钮标准：高度、圆角、字重、阴影、hover
  return (
    <a
      {...props}
      className={[
        "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold",
        "bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 text-[#2b0612]",
        "shadow-[0_18px_55px_rgba(0,0,0,0.35)]",
        "transition hover:-translate-y-0.5 hover:brightness-[1.02] active:translate-y-0",
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

function ActionButton(props: React.ComponentProps<"a"> & { variant?: "primary" | "ghost" }) {
  // 项目卡里的按钮：跟标签拉开差距，保持统一标准
  const v = props.variant ?? "ghost";
  const base =
    "inline-flex h-10 items-center justify-center rounded-full px-4 text-xs font-semibold transition hover:-translate-y-0.5 active:translate-y-0";
  const cls =
    v === "primary"
      ? "bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 text-[#2b0612] shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
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
      <p className="text-xs uppercase tracking-[0.38em] text-amber-100/60">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-2xl font-semibold text-amber-50 md:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-sm leading-6 text-amber-50/70 md:text-base">{desc}</p>
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,215,170,0.35),transparent_58%),radial-gradient(circle_at_80%_25%,rgba(255,120,150,0.22),transparent_60%),radial-gradient(circle_at_45%_85%,rgba(255,255,255,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(0,0,0,0.20))]" />
        <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs text-white/70 backdrop-blur">
          NFL image coming soon
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
            <h3 className="text-base font-semibold text-amber-50">{p.name}</h3>
            <p className="mt-1 text-sm text-amber-50/70">{p.tagline}</p>
          </div>

          {!hasAnyLink ? (
            <span className="shrink-0 rounded-full border border-white/12 bg-black/25 px-3 py-1 text-xs text-white/70">
              {p.privateNote ?? "Private"}
            </span>
          ) : null}
        </div>

        <ul className="mt-4 space-y-2 text-sm text-amber-50/75">
          {p.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-200/70" />
              <span className="leading-6">{b}</span>
            </li>
          ))}
        </ul>

        {/* 把“按钮区”和“标签区”明确分开 */}
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

      {/* warm glow (圣诞广告那种金红氛围) */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl opacity-0 transition group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-28 -bottom-40 h-72 w-72 rounded-full bg-rose-300/12 blur-3xl opacity-0 transition group-hover:opacity-100" />
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
      image: "", // 先空：自动显示“有趣的占位图”
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
      image: "", // 你晚点放一张 pipeline 图即可
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
      image: "/images/montecarlo.webp",
      ppt: "/SYS611_TermProject_NFL4thDown_MonteCarlo.pdf",
      link: "https://colab.research.google.com/drive/1FrYON171XMlLIq9T_8V8JcveaYF7LTzh?usp=sharing",
    },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* 背景：莓红/酒红渐变 + 金色光晕 + 闪点（不再黑白） */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3c0a14] via-[#520f1d] to-[#240611]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(255,215,170,0.14),transparent_34%),radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,195,113,0.18),rgba(255,255,255,0)_55%),linear-gradient(240deg,rgba(255,105,105,0.14),rgba(255,255,255,0)_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,0.62)_100%)]" />
      </div>

      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/10 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#top" className="text-sm font-semibold tracking-[0.28em] text-amber-50 hover:text-amber-200">
            CHANGYE
          </a>
          <nav className="hidden items-center gap-6 text-sm text-amber-50/70 md:flex">
            <a className="hover:text-amber-200" href="#projects">Projects</a>
            <a className="hover:text-amber-200" href="#capabilities">Capabilities</a>
            <a className="hover:text-amber-200" href="#process">Process</a>
            <a className="hover:text-amber-200" href="#contact">Contact</a>
          </nav>
          <a
            href="#projects"
            className="md:hidden rounded-full border border-amber-200/30 bg-white/5 px-4 py-2 text-xs font-semibold text-amber-50 hover:bg-white/10"
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
              <span className="bg-gradient-to-b from-[#ffe8a3] via-[#fff2c8] to-[#f2c96a] bg-clip-text text-transparent">
                {name}
              </span>
            </h1>

            <p className="mt-3 text-lg text-amber-50/75 md:text-xl">{title}</p>

            <p className="mt-6 max-w-xl text-base leading-7 text-amber-50/78">
              I build <span className="text-amber-100">reproducible</span>,{" "}
              <span className="text-amber-100">leakage-free</span> ML pipelines and{" "}
              <span className="text-amber-100">decision simulations</span> that stakeholders can trust.
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

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-amber-50/75">
              <a className="hover:text-amber-200" href={github} target="_blank" rel="noreferrer">
                GitHub →
              </a>
              <a className="hover:text-amber-200" href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn →
              </a>
              <a className="hover:text-amber-200" href={resume}>
                Resume →
              </a>
            </div>
          </div>

          {/* Right photo */}
          <div className="mx-auto w-full max-w-[520px]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,215,170,0.22),transparent_58%),radial-gradient(circle_at_85%_25%,rgba(255,120,150,0.16),transparent_62%)]" />
              <div className="relative p-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src="/images/me.webp"
                    alt="Portrait of Changye Chen"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 92vw, 520px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/40" />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-3 backdrop-blur">
                    <p className="text-xs text-amber-50/60">Focus</p>
                    <p className="mt-1 text-sm font-semibold text-amber-50">Data + ML</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-3 backdrop-blur">
                    <p className="text-xs text-amber-50/60">Style</p>
                    <p className="mt-1 text-sm font-semibold text-amber-50">Reproducible</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-3 backdrop-blur">
                    <p className="text-xs text-amber-50/60">Output</p>
                    <p className="mt-1 text-sm font-semibold text-amber-50">Metrics</p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-amber-50/55">
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
            desc="Buttons and tags are visually separated: links are actionable; tech chips are informational."
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
            desc="Explainable, reproducible, and measurable delivery."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: "Modeling & Evaluation",
                desc: "Leakage-safe feature design, robust validation, interpretability (SHAP), clear reporting.",
                chips: ["CV / AUC", "Calibration", "SHAP"],
              },
              {
                title: "Data Engineering & QA",
                desc: "Schema design, harmonization, metadata manifests, integrity checks, consistent preprocessing.",
                chips: ["HDF5", "Metadata", "Automated QA"],
              },
              {
                title: "Simulation & Risk",
                desc: "Monte Carlo simulation with confidence intervals to compare policies and quantify risk.",
                chips: ["Monte Carlo", "CI", "Policy Comparison"],
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-[0_26px_90px_rgba(0,0,0,0.45)] backdrop-blur"
              >
                <h3 className="text-base font-semibold text-amber-50">{c.title}</h3>
                <p className="mt-3 text-sm leading-6 text-amber-50/70">{c.desc}</p>
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
                <p className="text-xs font-semibold tracking-[0.3em] text-amber-50/55">{s.n}</p>
                <h3 className="mt-3 text-base font-semibold text-amber-50">{s.t}</h3>
                <p className="mt-3 text-sm leading-6 text-amber-50/70">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="scroll-mt-24 py-14">
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.06] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur md:p-10">
            <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-amber-300/14 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-rose-300/12 blur-3xl" />

            <div className="relative">
              <h2 className="text-balance text-2xl font-semibold text-amber-50 md:text-3xl">
                Let’s build something measurable.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-amber-50/70 md:text-base">
                If you need ML evaluation, data pipelines, or simulation-driven decisions, I can help you move fast with clean outputs.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href={`mailto:${email}`}>Email me</PrimaryButton>
                <SecondaryButton href={resume}>Download resume</SecondaryButton>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-amber-50/75">
                <span className="text-amber-50/55">Contact:</span>
                <a className="hover:text-amber-200" href={`mailto:${email}`}>{email}</a>
                <a className="hover:text-amber-200" href={github} target="_blank" rel="noreferrer">GitHub</a>
                <a className="hover:text-amber-200" href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>

          <footer className="py-10 text-center text-xs text-amber-50/50">
            © {new Date().getFullYear()} {name}
          </footer>
        </section>
      </main>
    </div>
  );
}
