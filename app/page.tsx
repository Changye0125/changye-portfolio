import Image from "next/image";

type Project = {
  name: string;
  tagline: string;
  bullets: string[];
  tags: string[];
  image?: string; // /public 下的路径
  ppt?: string;
  link?: string;
  privateNote?: string;
  featured?: boolean;
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 backdrop-blur">
      {children}
    </span>
  );
}

function PrimaryButton(props: React.ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={[
        "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold",
        "bg-white text-black hover:bg-white/90",
        "shadow-[0_18px_50px_rgba(0,0,0,0.45)]",
        "transition active:scale-[0.99]",
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
        "border border-white/15 bg-white/5 text-white hover:bg-white/10",
        "backdrop-blur transition active:scale-[0.99]",
        props.className ?? "",
      ].join(" ")}
    />
  );
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
      <p className="text-xs uppercase tracking-[0.38em] text-white/55">{eyebrow}</p>
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(251,191,36,0.20),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.18))]" />
        <div className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white/70 backdrop-blur">
          Image coming soon
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
    <article
      className={[
        "group relative overflow-hidden rounded-3xl border border-white/10",
        "bg-white/[0.04] backdrop-blur",
        "shadow-[0_25px_90px_rgba(0,0,0,0.55)]",
        "transition hover:-translate-y-1 hover:bg-white/[0.06]",
      ].join(" ")}
    >
      <div className="p-4">
        <ImageOrPlaceholder
          src={p.image}
          alt={p.name}
          aspectClassName="aspect-[16/10]"
        />
      </div>

      <div className="px-5 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-white">{p.name}</h3>
            <p className="mt-1 text-sm text-white/70">{p.tagline}</p>
          </div>

          {!hasAnyLink ? (
            <span className="shrink-0 rounded-full border border-white/12 bg-black/30 px-3 py-1 text-xs text-white/65">
              {p.privateNote ?? "Private"}
            </span>
          ) : null}
        </div>

        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {p.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/55" />
              <span className="leading-6">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {hasLink ? (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              Demo / Link
            </a>
          ) : null}

          {hasPpt ? (
            <a
              href={p.ppt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              Slides / PDF
            </a>
          ) : null}
        </div>
      </div>

      {/* subtle glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-32 -bottom-40 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl opacity-0 transition group-hover:opacity-100" />
    </article>
  );
}

export default function Home() {
  const name = "Changye Chen";
  const title = "Engineering Management • Data & ML • Portfolio";
  const email = "cchen90@stevens.edu";
  const github = "https://github.com/Changye0125";
  const linkedin = "https://www.linkedin.com"; // 你后面换成自己的
  const resume = "/Changye_Resume.pdf";

  const projects: Project[] = [
    {
      name: "NFL Play-by-Play ML Pipeline",
      tagline: "Leakage-free modeling + interpretable win-probability signals.",
      bullets: [
        "Built a leakage-free feature pipeline using recent-form matchup trends.",
        "Benchmarked multiple classifiers with cross-validation (ROC-AUC ≈ 0.637).",
        "Used SHAP to explain predictions for stakeholder-ready interpretation.",
      ],
      tags: ["Python", "pandas", "scikit-learn", "XGBoost", "SHAP"],
      image: "/me_4x5_1600w.webp", // 先空着 -> 自动显示高级占位图
      ppt: "/EM624%20-%20Predicting%20NFL%20Game%20Outcomes.pptx",
      link: "https://colab.research.google.com/drive/1cXyP8DP4dS2wa59tvASfKJl5-3Zb9NL6?usp=sharing",
      featured: true,
    },
    {
      name: "EEG / iEEG Data Standardization Pipeline",
      tagline: "Unified schema + metadata + QA for foundation-model training readiness.",
      bullets: [
        "Converted heterogeneous raw formats (MAT/EDF/BDF) into a unified HDF5 schema.",
        "Standardized channel layouts via 10–20 mapping and consistent resampling rules.",
        "Delivered QA checks + reproducible manifests + train/val/test splits.",
      ],
      tags: ["Python", "Data Engineering", "HDF5", "QA"],
      image: "", // 你晚点放一张 pipeline/QA 图就行
      ppt: "",
      link: "",
      privateNote: "Private lab repo (available upon request)",
    },
    {
      name: "Monte Carlo Simulation (Risk / Strategy)",
      tagline: "Compare 4th-down decision policies with confidence intervals.",
      bullets: [
        "Estimated transition/scoring parameters from historical play-by-play data.",
        "Simulated game outcomes under conservative/balanced/aggressive policies.",
        "Reported 95% CIs to make risk–reward trade-offs explicit.",
      ],
      tags: ["Monte Carlo", "Simulation", "Analytics", "CI"],
      image: "/images/montecarlo.webp",
      ppt: "/SYS611_TermProject_NFL4thDown_MonteCarlo.pdf",
      link: "https://colab.research.google.com/drive/1FrYON171XMlLIq9T_8V8JcveaYF7LTzh?usp=sharing",
    },
  ];

  return (
    <div className="min-h-screen bg-[#05070c] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_85%_25%,rgba(251,191,36,0.14),transparent_45%),radial-gradient(circle_at_55%_80%,rgba(168,85,247,0.14),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.0)_22%,rgba(0,0,0,0.70))]" />
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/25 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#top" className="text-sm font-semibold tracking-[0.28em] text-white/90 hover:text-white">
            CHANGYE
          </a>
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#projects">Projects</a>
            <a className="hover:text-white" href="#capabilities">Capabilities</a>
            <a className="hover:text-white" href="#process">Process</a>
            <a className="hover:text-white" href="#contact">Contact</a>
          </nav>
          <a
            href="#projects"
            className="md:hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
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
              <Pill>Available for internships / projects</Pill>
              <Pill>Hoboken, NJ</Pill>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] md:text-6xl">
              <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>
            <p className="mt-3 text-lg text-white/70 md:text-xl">{title}</p>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/70">
              I build <span className="text-white">reproducible</span>,{" "}
              <span className="text-white">leakage-free</span> ML pipelines and{" "}
              <span className="text-white">decision simulations</span> that stakeholders can trust.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Leakage-free modeling</Pill>
              <Pill>Interpretability (SHAP)</Pill>
              <Pill>Monte Carlo + CI</Pill>
              <Pill>Data QA / schemas</Pill>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href={`mailto:${email}`}>Email me</PrimaryButton>
              <SecondaryButton href="#projects">View projects</SecondaryButton>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <a className="hover:text-white" href={github} target="_blank" rel="noreferrer">
                GitHub →
              </a>
              <a className="hover:text-white" href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn →
              </a>
              <a className="hover:text-white" href={resume}>
                Resume →
              </a>
            </div>
          </div>

          {/* Right: Photo card */}
          <div className="mx-auto w-full max-w-[520px]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(251,191,36,0.14),transparent_55%)]" />
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
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/40" />
                </div>

                {/* overlay info bar */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3 backdrop-blur">
                    <p className="text-xs text-white/60">Focus</p>
                    <p className="mt-1 text-sm font-semibold text-white">Data + ML</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3 backdrop-blur">
                    <p className="text-xs text-white/60">Style</p>
                    <p className="mt-1 text-sm font-semibold text-white">Reproducible</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3 backdrop-blur">
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
            desc="One image per project, three bullet takeaways, and direct links to demos/slides."
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
            desc="The work I do is designed to be explainable, reproducible, and measurable."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                title: "Modeling & Evaluation",
                desc: "Leakage-safe feature design, robust validation, interpretability (e.g., SHAP) and clear reporting.",
                chips: ["CV / AUC", "Calibration", "SHAP"],
              },
              {
                title: "Data Engineering & QA",
                desc: "Schema design, dataset harmonization, metadata manifests, integrity checks, and consistent preprocessing rules.",
                chips: ["HDF5", "Metadata", "Automated QA"],
              },
              {
                title: "Simulation & Risk",
                desc: "Monte Carlo simulation with confidence intervals to compare policies and make risk–reward trade-offs explicit.",
                chips: ["Monte Carlo", "CI", "Policy Comparison"],
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_90px_rgba(0,0,0,0.5)]"
              >
                <h3 className="text-base font-semibold text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{c.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.chips.map((x) => (
                    <span
                      key={x}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {x}
                    </span>
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
            desc="Designed for speed, clarity, and stakeholder confidence."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-4">
            {[
              { n: "01", t: "Define decision + metric", d: "Clarify what “better” means and what to optimize." },
              { n: "02", t: "Build pipeline + QA", d: "Make data consistent, validated, and reproducible." },
              { n: "03", t: "Model/simulate + validate", d: "Compare baselines, quantify uncertainty, avoid leakage." },
              { n: "04", t: "Deliver + next actions", d: "Write-up + visuals + recommendations you can act on." },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_25px_90px_rgba(0,0,0,0.5)]"
              >
                <p className="text-xs font-semibold tracking-[0.3em] text-white/50">{s.n}</p>
                <h3 className="mt-3 text-base font-semibold text-white">{s.t}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="scroll-mt-24 py-14">
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.65)] md:p-10">
            <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />

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
                <a className="hover:text-white" href={`mailto:${email}`}>{email}</a>
                <a className="hover:text-white" href={github} target="_blank" rel="noreferrer">GitHub</a>
                <a className="hover:text-white" href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>

          <footer className="py-10 text-center text-xs text-white/45">
            © {new Date().getFullYear()} {name}
          </footer>
        </section>
      </main>
    </div>
  );
}
