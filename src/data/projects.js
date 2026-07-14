// ============================================================================
// PROJECTS — one object per project.
// `slug` becomes the URL: project.html?slug=your-slug
// Omit `caseStudy` for a project that just shows on the list with no detail page.
// ============================================================================

export const projects = [
  {
    slug: "eia-etl-script",
    title: "EIA ETL Script",
    blurb:
      "Built a Python ETL Script that extracts power generation data from the EIA API and saves it as CSV.",
    tags: ["Python", "uv", "requests", "pandas"],
    year: "2026",
    liveUrl: "",
    repoUrl: "https://github.com/KenImade/eia-etl-script",
  },
  {
    slug: "url-shortener",
    title: "URL Shortener",
    blurb:
      "A clean, containerized URL shortener in Go with a pluggable storage layer, click analytics, and rate limiting.",
  tags: ["Go", "Docker", "PostgreSQL"],
  year: "2026",
  liveUrl: "",
  repoUrl: "https://github.com/KenImade/url-shortener",
  },
  {
    slug: "gradconnect",
    title: "GradConnect",
    blurb:
      "A platform for graduates and students in Nigeria to search for information about graduate roles and internships.",
  tags: ["Go", "NextJS", "PostgreSQL"],
  year: "2026",
  liveUrl: "https://gradconnect.ng/",
  repoUrl: "https://github.com/KenImade/gradconnect-api",
  },
  {
    slug: "task-queue",
    title: "Task Queue",
    blurb:
      "A dependency-free task queue in Go. Jobs submitted over REST return immediately while a pool of worker goroutines " +
      "processes them in the background, with exponential-backoff retries and a shutdown path that drains in-flight work " +
      "rather than dropping it.",
    tags: ["Go", "task-queue", "worker-pool", "concurrency", "goroutines channels", "rest-api", "graceful shutdown"],
    year: "2026",
    liveUrl: "",
    repoUrl: "https://github.com/KenImade/taskqueue",
  },
];