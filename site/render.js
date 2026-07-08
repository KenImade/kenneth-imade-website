// ============================================================================
// Small render helpers shared by every page. Pure functions, no state.
// ============================================================================

function projectHref(project) {
  return project.caseStudy ? `project.html?slug=${project.slug}` : 'work.html';
}

function postHref(post) {
  return post.sections || post.paragraphs ? `post.html?slug=${post.slug}` : 'writing.html';
}

function renderProjectRow(p) {
  const badge = p.caseStudy ? '<span class="chip-accent">case study</span>' : '';
  const tags = p.tags.map(t => `<span class="chip">${t}</span>`).join('');
  return `
    <a href="${projectHref(p)}" class="row">
      <div>
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
          <h3 style="font-family:var(--font-display); font-size:21px; font-weight:600; margin:0; letter-spacing:-0.01em;">${p.title}</h3>
          ${badge}
        </div>
        <p style="margin:0 0 12px; font-size:15px; line-height:1.55; color:var(--color-text-soft); max-width:560px;">${p.blurb}</p>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">${tags}</div>
      </div>
      <div style="font-family:var(--font-mono); font-size:12px; color:var(--color-text-softest); white-space:nowrap; padding-top:4px;">${p.year} &rarr;</div>
    </a>`;
}

function renderPostRow(post) {
  return `
    <a href="${postHref(post)}" class="row" style="grid-template-columns:1fr auto;">
      <div>
        <div style="font-size:16px; font-weight:500; margin-bottom:4px;">${post.title}</div>
        <div style="font-size:13.5px; color:var(--color-text-softer);">${post.blurb}</div>
      </div>
      <div style="font-family:var(--font-mono); font-size:12px; color:var(--color-text-softest); white-space:nowrap;">${post.date}</div>
    </a>`;
}
