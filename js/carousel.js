(() => {
  const carousels = document.querySelectorAll("[data-carousel]");
  carousels.forEach((root) => {
    const track = root.querySelector("[data-carousel-track]");
    const prev = root.querySelector("[data-carousel-prev]");
    const next = root.querySelector("[data-carousel-next]");
    if (!track || !prev || !next) return;
    let index = 0;
    const slides = Array.from(track.children);
    const go = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(${-index * 100}%)`;
      track.style.transition = "transform 220ms ease";
    };
    prev.addEventListener("click", () => go(index - 1));
    next.addEventListener("click", () => go(index + 1));
  });
})();
