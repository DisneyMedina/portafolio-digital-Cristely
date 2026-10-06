const sections = ["inicio", "datos", "ev1", "ev2", "ev3", "ev4", "ev5", "ev6"];

const nav = document.querySelectorAll(".nav-links a");
const progress = document.querySelector(".progress");
const pageLabel = document.querySelector("[data-page-label]");
const prevBtn = document.querySelector("[data-prev]");
const nextBtn = document.querySelector("[data-next]");

function currentIndex() {
  const y = window.scrollY + 120;
  let idx = 0;
  sections.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= y) idx = i;
  });
  return idx;
}

function updateUI() {
  const idx = currentIndex();
  nav.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${sections[idx]}`);
  });
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${Math.min(100, (window.scrollY / max) * 100)}%`;
  if (pageLabel) pageLabel.textContent = `${Math.max(idx, 1)} / ${sections.length - 1}`;
}

function go(step) {
  const idx = Math.min(sections.length - 1, Math.max(0, currentIndex() + step));
  document.getElementById(sections[idx])?.scrollIntoView({ behavior: "smooth" });
}

prevBtn?.addEventListener("click", () => go(-1));
nextBtn?.addEventListener("click", () => go(1));
window.addEventListener("scroll", updateUI, { passive: true });
updateUI();

document.querySelectorAll(".qa-item button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const open = item.classList.contains("open");
    item.parentElement.querySelectorAll(".qa-item").forEach((el) => el.classList.remove("open"));
    if (!open) item.classList.add("open");
  });
});

document.querySelectorAll(".rule").forEach((rule) => {
  rule.addEventListener("click", () => rule.classList.toggle("open"));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") go(1);
  if (e.key === "ArrowLeft") go(-1);
});
