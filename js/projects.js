(async () => {
  const featuredEl = document.getElementById("featured-projects");
  const gridEl = document.getElementById("projects-grid");
  const filterEl = document.getElementById("project-filter");

  let data;
  try {
    const res = await fetch("/data/projects.json", { cache: "no-store" });
    data = await res.json();
  } catch (e) {
    const msg = `<div class="card"><p class="muted">Could not load /data/projects.json</p></div>`;
    if (featuredEl) featuredEl.innerHTML = msg;
    if (gridEl) gridEl.innerHTML = msg;
    return;
  }

  const cardHtml = (p) => `
    <article class="card">
      <img class="project-media" src="${p.heroImage}" alt="${p.title} screenshot" loading="lazy" />
      <h3 style="margin:12px 0 6px 0;">${p.title}</h3>
      <p class="muted" style="margin:0 0 12px 0;">${p.summary}</p>
      <ul class="pill-row" style="margin-bottom:12px;">
        ${(p.tags || []).slice(0,4).map(t => `<li class="pill">${t}</li>`).join("")}
      </ul>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        <a class="btn btn-solid" href="${p.href}">Details</a>
        ${p.repo ? `<a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noreferrer">Repo</a>` : ""}
      </div>
    </article>
  `;

  const projects = data.projects || [];

  if (featuredEl) {
    const featuredIds = new Set(data.featured || []);
    const featured = projects.filter(p => featuredIds.has(p.id)).slice(0, 6);
    featuredEl.innerHTML = featured.map(cardHtml).join("") || `<div class="card"><p class="muted">No featured projects yet.</p></div>`;
  }

  const renderAll = (query = "") => {
    if (!gridEl) return;
    const q = query.trim().toLowerCase();
    const filtered = !q ? projects : projects.filter(p => (p.tags || []).some(t => String(t).toLowerCase().includes(q)) || p.title.toLowerCase().includes(q));
    gridEl.innerHTML = filtered.map(cardHtml).join("") || `<div class="card"><p class="muted">No projects match that filter.</p></div>`;
  };

  if (gridEl) renderAll();
  if (filterEl) filterEl.addEventListener("input", (e) => renderAll(e.target.value));
})();
