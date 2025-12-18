export default function Home() {
  const name = "Changye Chen";
  const title = "Engineering Management • Data & ML • Portfolio";
  const email = "cchen90@stevens.edu";
  const github = "https://github.com/Changye0125";
  const linkedin = "https://www.linkedin.com";
  const resume = "/Changye_Resume.pdf";

  const projects: Project[] = [
    {
      name: "NFL Play-by-Play ML Pipeline",
      desc: "P",
      tags: ["Python", "pandas", "scikit-learn", "XGBoost"],
      // 这个文件要在 public/ 里，且文件名为：EM624 - Predicting NFL Game Outcomes.pptx
      ppt: "/EM624%20-%20Predicting%20NFL%20Game%20Outcomes.pptx",
      link: "https://colab.research.google.com/drive/1cXyP8DP4dS2wa59tvASfKJl5-3Zb9NL6?usp=sharing",
    },
    {
      name: "EEG / iEEG Data Standardization Pipeline",
      desc: "Convert MAT/EDF/BDF → standardized formats + metadata + QA checks.",
      tags: ["Python", "Data Engineering", "QA"],
      ppt: "",
      link: "",
      privateNote: "Private lab repo (available upon request)",
    },
    {
      name: "Monte Carlo Simulation (Risk / Strategy)",
      desc: "Fourth-down decision-making under uncertainty requires an explicit trade-off between expected points and downside risk. Key transition and scoring parameters were estimated from historical play-by-play data, and a game-level Monte Carlo simulation was developed to compare conservative, balanced, and aggressive fourth-down policies with 95% confidence intervals. Results suggested that more aggressive policies yield a modest increase in scoring on average, but substantially increase fourth-down attempts and turnover-on-downs exposure, making the risk–reward trade-off explicit.",
      tags: ["Simulation", "Monte Carlo", "Analytics"],
      // 这个文件要在 public/ 里
      ppt: "/SYS611_TermProject_NFL4thDown_MonteCarlo.pdf",
      link: "https://colab.research.google.com/drive/1FrYON171XMlLIq9T_8V8JcveaYF7LTzh?usp=sharing",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <header className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Available for internships / projects
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {name}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">{title}</p>
          </div>

          <p className="max-w-2xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            I’m a Master’s student at Stevens Institute of Technology, focused on
            engineering management and applied analytics. I build practical
            data/ML pipelines and turn messy data into decisions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${email}`}
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Email me
            </a>
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              GitHub
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              LinkedIn
            </a>
            <a
              href={resume}
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Resume
            </a>
          </div>
        </header>

        {/* Sections */}
        <section className="mt-14 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-sm font-semibold">Focus</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              ML modeling, evaluation, and end-to-end pipelines that are
              reproducible and easy to explain.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-sm font-semibold">Stack</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Python • pandas • scikit-learn • XGBoost • SQL • Excel • Git
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-sm font-semibold">What I’m building</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Portfolio-ready projects and case studies with clean write-ups and
              metrics.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              (click to add links later)
            </span>
          </div>

          <div className="mt-5 grid gap-4">
            {projects.map((p) => {
              const hasPpt = !!p.ppt?.trim();
              const hasLink = !!p.link?.trim();
              const hasAnyLink = hasPpt || hasLink;

              return (
                <div
                  key={p.name}
                  className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    {/* Left */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold">{p.name}</h3>

                        {!hasAnyLink && (
                          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-300">
                            {p.privateNote ?? "Private"}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {p.desc}
                      </p>
                    </div>

                    {/* Right: PPT / Link buttons + tags */}
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      {hasPpt && (
                        <a
                          href={p.ppt}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
                          title="Open PPT"
                        >
                          PPT
                        </a>
                      )}

                      {hasLink && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
                          title="Open Link"
                        >
                          Link
                        </a>
                      )}

                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-black dark:text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-zinc-200 pt-8 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} {name}
            </span>
            <span>
              Contact:{" "}
              <a
                className="underline hover:text-zinc-900 dark:hover:text-zinc-50"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
