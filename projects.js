{
  const work = document.querySelector("#projects");
  const scene = work.querySelector(".project-scene");
  const viewport = work.querySelector(".project-window");
  const track = work.querySelector(".projects-grid");
  const cards = [...track.querySelectorAll(".project")];
  const filters = document.querySelector("#project-filters");
  const buttons = [...filters.querySelectorAll("button")];
  const count = document.querySelector("#project-count");
  const position = document.querySelector("#project-position");
  const hint = document.querySelector("#project-hint");
  const experience = document.querySelector("#experience");
  const allowMotion = matchMedia("(prefers-reduced-motion: no-preference)");
  let visible = cards;
  let distance = 0;
  let frames = [];
  let center = 0;
  let slide = 0;
  let peek = 0;
  let front = -1;
  let pending = 0;
  let selected = -1;
  let previousY = scrollY;
  let returning = false;

  function setTrackHeight() {
    work.style.setProperty("--project-height", `${scene.offsetHeight + (returning ? 0 : distance)}px`);
  }

  function setReturnPass(active) {
    returning = active;
    setTrackHeight();
  }

  function followScroll() {
    pending = 0;
    const y = scrollY;
    const start = y + work.getBoundingClientRect().top;
    const end = start + distance;
    if (!returning && y < previousY && previousY >= end - 1 && y < end && y >= start) {
      // Removing the runway preserves the viewport at the last card during upward travel.
      setReturnPass(true);
      window.scrollTo({ top: y - distance, behavior: "instant" });
    } else if (returning && y > previousY && previousY <= start && y >= start) {
      setReturnPass(false);
    }
    paint();
  }

  function place(frame, x, y, scale) {
    frame.card.style.setProperty("--card-x", `${center - frame.left + x}px`);
    frame.card.style.setProperty("--card-y", `${y}px`);
    frame.card.style.setProperty("--card-scale", scale);
  }

  function paint() {
    previousY = scrollY;
    if (!distance) return;
    const offset = returning ? distance : Math.min(distance, Math.max(0, -work.getBoundingClientRect().top));
    const index = frames.findLastIndex(frame => frame.offset <= offset + .5);
    const current = frames[index];
    const next = frames[index + 1];
    const progress = next ? Math.max(0, (offset - current.offset) / (next.offset - current.offset)) : 0;
    const eased = progress * progress * (3 - 2 * progress);
    place(current, -eased * slide, 0, 1 - eased * .03);
    if (next) place(next, (1 - eased) * peek, (1 - eased) * 20, .925 + eased * .075);
    if (index !== front) {
      for (const card of cards) {
        card.classList.toggle("is-project-front", card === current.card);
        card.classList.toggle("is-project-next", card === next?.card);
      }
      front = index;
    }
    const nearest = index + (eased > .55 ? 1 : 0);
    if (nearest !== selected) {
      position.textContent = `${nearest + 1} / ${visible.length}`;
      selected = nearest;
    }
    const instruction = returning ? "" : distance - offset < 1 ? "Scroll down for the next section" : "Scroll down to browse projects";
    if (hint.textContent !== instruction) hint.textContent = instruction;
  }

  function layout() {
    const canPin = allowMotion.matches && visible.length > 1;
    work.classList.toggle("has-project-motion", canPin);
    distance = canPin ? Math.max(0, track.offsetWidth - viewport.clientWidth) : 0;
    if (scene.offsetHeight > innerHeight + 1) distance = 0;
    if (distance) {
      const width = visible[0].offsetWidth;
      center = (viewport.clientWidth - width) / 2;
      slide = center + width + 24;
      peek = width * .0375 + 12;
      frames = visible.map((card, i) => {
        const left = card.offsetLeft;
        const offset = i === 0 ? 0 : i === visible.length - 1 ? distance : Math.round(left - center);
        return { card, left, offset };
      });
      front = -1;
      setTrackHeight();
    } else {
      returning = false;
      work.classList.remove("has-project-motion");
      work.style.removeProperty("--project-height");
    }
    position.hidden = hint.hidden = !distance;
    selected = -1;
    paint();
  }

  function filterProjects(button) {
    const group = button.dataset.projectFilter;
    for (const option of buttons) option.setAttribute("aria-pressed", String(option === button));
    for (const card of cards) card.hidden = group !== "all" && !card.dataset.projectGroups.split(" ").includes(group);
    visible = cards.filter(card => !card.hidden);
    count.textContent = visible.length === cards.length ? `${cards.length} projects` : `${visible.length} of ${cards.length} projects`;
    layout();
  }

  function linkedProject() {
    return cards.find(card => `#${card.id}` === location.hash);
  }

  function revealProject(card) {
    if (!distance) {
      card.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }
    if (returning) setReturnPass(false);
    const { offset } = frames.find(frame => frame.card === card);
    window.scrollTo({ top: scrollY + work.getBoundingClientRect().top + offset, behavior: "instant" });
    paint();
  }

  function followHash() {
    const target = linkedProject();
    if (!target) return;
    if (target.hidden) filterProjects(buttons[0]);
    revealProject(target);
  }

  filters.hidden = false;
  for (const button of buttons) {
    button.addEventListener("click", () => {
      if (button.getAttribute("aria-pressed") === "true") return;
      returning = false;
      filterProjects(button);
      if (linkedProject()?.hidden) history.replaceState(history.state, "", "#projects");
      work.scrollIntoView({ behavior: "instant", block: "start" });
      paint();
    });
  }

  window.addEventListener("scroll", () => {
    if (distance && !pending) pending = requestAnimationFrame(followScroll);
  }, { passive: true });
  window.addEventListener("resize", layout);
  allowMotion.addEventListener("change", layout);
  new ResizeObserver(layout).observe(scene);
  window.addEventListener("hashchange", followHash);
  document.addEventListener("click", event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (anchor.hash === "#experience") {
      event.preventDefault();
      if (location.hash !== anchor.hash) history.pushState(history.state, "", anchor.hash);
      experience.focus({ preventScroll: true });
      experience.scrollIntoView({ behavior: "instant", block: "start" });
      paint();
    } else if (anchor.hash === location.hash && linkedProject()) {
      event.preventDefault();
      followHash();
    }
  });
  track.addEventListener("focusin", event => {
    const card = event.target.closest(".project");
    if (!card || !distance || !event.target.matches(":focus-visible")) return;
    const { left, right } = event.target.getBoundingClientRect();
    const bounds = viewport.getBoundingClientRect();
    if (card !== frames[front].card || left < bounds.left || right > bounds.right) revealProject(card);
  });

  const dialog = document.querySelector("#project-dialog");
  if (typeof dialog.showModal === "function") {
    const title = dialog.querySelector("#project-dialog-title");
    const intro = dialog.querySelector(".case-intro");
    const kind = dialog.querySelector(".case-kind");
    const art = dialog.querySelector(".case-art");
    const tags = dialog.querySelector(".case-tags");
    const details = dialog.querySelector(".case-details");
    const links = dialog.querySelector(".case-links");
    let opener;

    for (const card of cards) {
      const cover = card.querySelector(".project-art-link");
      const button = card.querySelector(".project-open");
      const projectName = card.querySelector("h3").textContent;
      const study = card.querySelector(".case-study");

      function openStudy(trigger) {
        opener = trigger;
        title.textContent = projectName;
        kind.textContent = study.dataset.projectKind;
        intro.textContent = card.querySelector(".project-body > p").textContent;
        art.replaceChildren(cover.querySelector("img").cloneNode(true));
        tags.innerHTML = card.querySelector(".tags").innerHTML;
        details.replaceChildren(study.content.cloneNode(true));
        links.replaceChildren(...Array.from(card.querySelectorAll(".project-links a"), link => link.cloneNode(true)));
        dialog.showModal();
        dialog.scrollTop = 0;
      }

      button.setAttribute("aria-label", `Case study for ${projectName}`);
      button.hidden = false;
      button.addEventListener("click", () => openStudy(button));
      cover.addEventListener("click", event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        openStudy(cover);
      });
      cover.setAttribute("aria-label", `Open case study for ${projectName}`);
      cover.setAttribute("aria-haspopup", "dialog");
    }

    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => opener?.focus({ preventScroll: true }));
  }

  layout();
  if (linkedProject()) window.addEventListener("load", followHash, { once: true });
}
