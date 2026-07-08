// ============================================================================
// SITE CONTENT — edit this file to update the portfolio.
// No HTML editing required for normal updates. See MAINTENANCE.md for guides.
// ============================================================================

const CONTENT = {
  profile: {
    name: "Kenneth Imade",
    statusLine: "status: probably deploying something on a friday",
    heroHeadline: [
      "I build the backend",
      "so the frontend gets",
      "all the compliments.",
    ],
    heroSub:
      "Backend, infrastructure, and data engineer. I like systems that stay up at 3am, pipelines that don't lie to you, and naming things well — two out of three, most days.",
    aboutParagraphs: [
      "I'm Kenneth — a backend, infrastructure, and data engineer who's happiest turning a tangle of services into something that just quietly works. Recent focus: distributed data pipelines, observability that people actually trust, and making on-call less of a personality trait.",
      "Outside of terminals: I collect bad puns, decent coffee, and strong opinions about tabs vs. spaces (spaces, obviously).",
    ],
    skills: ["Go", "Python", "PostgreSQL", "Kafka", "Kubernetes", "Terraform", "AWS", "gRPC", "Redis", "Airflow"],
    contactHeadline: "Let's fix something together.",
    contactSub: "Open to backend & infra roles — also open to arguing about database indices.",
    socials: {
      github: "https://github.com/KenImade",
      linkedin: "https://www.linkedin.com/in/kenneth-imade/",
      email: "kenneth.imade@yahoo.com",
    },
  },

  // Add a new project by adding another object to this array.
  // `slug` becomes the URL: project.html?slug=your-slug
  // Omit `caseStudy` for a project that just shows on the list with no detail page.
  projects: [
    {
      slug: "ledger-pipeline",
      title: "Ledger Pipeline",
      blurb:
        "Rebuilt a batch ETL job that took 6 hours into a streaming pipeline that takes 6 minutes, then spent a week convincing people it wasn't lying.",
      tags: ["Kafka", "Flink", "Postgres"],
      year: "2025",
      caseStudy: {
        readTime: "5 min read",
        headline: "Ledger Pipeline: from a 6-hour batch job to a 6-minute stream",
        subhead:
          "A nightly ETL job was the single scariest part of our stack. Here's how it became a boring, reliable stream — and why \"boring\" was the whole point.",
        stats: [
          { value: "6h → 6min", label: "processing latency" },
          { value: "70%", label: "fewer on-call pages" },
          { value: "1 batch", label: "blast radius on failure" },
        ],
        sections: [
          {
            heading: "The problem",
            paragraphs: [
              "Every night at 2am, a single Python script pulled a day's worth of transaction records, transformed them, and loaded them into the warehouse. It took six hours. If it failed at hour five, we found out at 8am — usually from someone in finance, not from us.",
              "It wasn't slow because the data was big. It was slow because it was one job doing everything sequentially, with no way to reprocess just the part that broke.",
            ],
          },
          {
            heading: "What changed",
            paragraphs: [
              "We moved ingestion onto Kafka, so records show up as they happen instead of arriving in one nightly dump. A Flink job handles transforms in small, replayable steps and writes into Postgres continuously.",
              "The biggest win wasn't speed — it was that a failure now affects minutes of data, not a full day, and reprocessing one bad batch doesn't mean re-running everything since midnight.",
            ],
          },
          {
            heading: "The hard part",
            paragraphs: [
              "Convincing finance that \"eventually consistent, but consistent within six minutes\" was actually better than \"consistent once a day, if nothing broke.\" That took more diagrams than the actual migration did.",
            ],
          },
          {
            heading: "Result",
            paragraphs: [
              "Data now lands in minutes instead of hours, on-call pages dropped sharply, and the team can reprocess a single bad batch without touching the rest of the day. The old script is gone. Nobody misses it.",
            ],
          },
        ],
      },
    },
    {
      slug: "service-mesh-migration",
      title: "Service Mesh Migration",
      blurb:
        "Moved 40+ internal services onto a proper mesh without a single all-hands apology email. Write-up coming soon.",
      tags: ["Kubernetes", "Envoy", "gRPC"],
      year: "2024",
      // no caseStudy yet -> links to work.html instead of a detail page
    },
    {
      slug: "query-cache-layer",
      title: "Query Cache Layer",
      blurb:
        "Shaved p99 latency on the hottest read path by 70% with a cache that actually invalidates correctly. Write-up coming soon.",
      tags: ["Redis", "Go", "Observability"],
      year: "2023",
    },
    {
      slug: "warehouse-access-layer",
      title: "Warehouse Access Layer",
      blurb:
        "A permissions layer over the data warehouse so analysts stopped emailing IT to ask 'can I see this table.' Write-up coming soon.",
      tags: ["SQL", "Python", "RBAC"],
      year: "2023",
    },
    {
      slug: "deploy-pipeline-rewrite",
      title: "Deploy Pipeline Rewrite",
      blurb:
        "Cut deploy time from 25 minutes to 4 by fixing the parts everyone was scared to touch. Write-up coming soon.",
      tags: ["CI/CD", "Docker", "Terraform"],
      year: "2022",
    },
  ],

  // Add a new post by adding another object to this array.
  // `slug` becomes the URL: post.html?slug=your-slug
  posts: [
    {
      slug: "idempotency-is-a-love-language",
      title: "Idempotency is a love language",
      blurb: "On designing APIs that forgive you for retrying.",
      date: "Jun 2026",
      readTime: "6 min read",
      subhead:
        "On designing APIs that forgive you for retrying — and why the kindest thing your service can do is not care how many times it's asked.",
      paragraphs: [
        "Somewhere around 3am, a request times out. The client doesn't know if it succeeded. So it does the only sane thing it can: it tries again. Now the question isn't \"did this work\" — it's \"what happens when it works twice.\"",
        "Most outages I've been paged for weren't caused by a request failing. They were caused by a request succeeding *twice*.",
      ],
      sections: [
        {
          heading: "The retry is not the enemy",
          paragraphs: [
            "Networks are unreliable and that's fine — that's what retries are for. The mistake is treating retries as an edge case instead of the default shape of every request. If \"this arrives exactly once\" is a load-bearing assumption anywhere in your system, it will eventually collapse under you.",
            "The fix isn't \"retry less.\" It's designing endpoints that genuinely don't mind being asked twice.",
          ],
        },
        {
          heading: "What actually works",
          paragraphs: [
            "Client-generated idempotency keys, stored alongside the result of the first successful attempt. The second request with the same key doesn't redo the work — it just hands back what already happened. Boring, cheap, and it turns \"did that go through?\" from a support ticket into a non-event.",
            "The part people skip: deciding how long you keep that record around, and what happens if the same key shows up with a *different* payload. Both need an answer before this ships, not after the first weird bug report.",
          ],
        },
        {
          heading: "The takeaway",
          paragraphs: [
            "Idempotency is a promise you make to every caller: \"ask me as many times as you need to — I've got you.\" Once a system keeps that promise, retries stop being scary, and 3am pages get a lot quieter.",
          ],
        },
      ],
    },
    {
      slug: "on-call-rotation",
      title: "The on-call rotation nobody wants to own",
      blurb: "How we made incident response boring (a compliment).",
      date: "Feb 2026",
      // no body yet -> links to writing.html instead of a detail page
    },
    {
      slug: "backfilling-a-data-lake",
      title: "Notes on backfilling a data lake without crying",
      blurb: "Mostly true story.",
      date: "Oct 2025",
    },
    {
      slug: "retry-logic",
      title: "Why your retry logic is making things worse",
      blurb: "A short case against retrying blindly, with graphs.",
      date: "Jul 2025",
    },
    {
      slug: "schema-migrations",
      title: "Schema migrations without the group chat panic",
      blurb: "A checklist I wish I'd had two jobs ago.",
      date: "Mar 2025",
    },
    {
      slug: "best-dashboard",
      title: "The best dashboard is the one nobody has to open",
      blurb: "Alerting philosophy, mildly opinionated.",
      date: "Dec 2024",
    },
  ],
};
