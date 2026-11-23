const root = document.documentElement;
const menu = document.querySelector("#primary-nav");
const menuButton = document.querySelector("#menu-button");
const filters = document.querySelector("#skill-filters");
const skillItems = document.querySelectorAll("#skill-list li");
const mobile = matchMedia("(max-width: 52rem)");
root.classList.add("js");
menuButton.hidden = filters.hidden = false;

function setMenu(open) {
  menu.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}
menuButton.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.classList.contains("is-open")) {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest(".masthead") && menu.classList.contains("is-open")) setMenu(false);
});
mobile.addEventListener("change", () => setMenu(false));

filters.addEventListener("click", (event) => {
  const selected = event.target.closest("button[data-filter]");
  if (!selected) return;
  const group = selected.dataset.filter;
  filters.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button === selected));
  });
  let count = 0;
  skillItems.forEach((skill) => {
    skill.hidden = group !== "all" && skill.dataset.group !== group;
    if (!skill.hidden) count++;
  });
  document.querySelector("#skill-status").textContent = count + " skills shown.";
});

const sectionLinks = Array.from(menu.querySelectorAll('a[href^="#"]'));
const sections = sectionLinks.map((link) => document.querySelector(link.hash));
function markCurrentSection() {
  let current = -1;
  const readingLine = Math.min(innerHeight * .35, 240);
  sections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= readingLine) current = index;
  });
  if (window.scrollY + innerHeight >= document.documentElement.scrollHeight - 2) current = sections.length - 1;
  sectionLinks.forEach((link, index) => {
    if (index === current) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
let scheduled = false;
function scheduleSectionUpdate() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => { markCurrentSection(); scheduled = false; });
}
addEventListener("scroll", scheduleSectionUpdate, { passive: true });
addEventListener("resize", scheduleSectionUpdate);
markCurrentSection();
