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
