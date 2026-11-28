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

  // The page keeps its native scroll. Only this sticky section translates its track.
  function paint() {
    previousY = scrollY;
    if (!distance) return;
    const offset = returning ? distance : Math.min(distance, Math.max(0, -work.getBoundingClientRect().top));
    track.style.setProperty("--project-offset", `-${offset}px`);
    const center = offset + viewport.clientWidth / 2;
    let nearest = 0;
    for (let i = 1; i < visible.length; i++) {
      if (center < visible[i].offsetLeft) break;
      nearest = i;
    }
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
      setTrackHeight();
    } else {
      returning = false;
      work.classList.remove("has-project-motion");
      work.style.removeProperty("--project-height");
      track.style.removeProperty("--project-offset");
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
    const centerOffset = card.offsetLeft + (card.offsetWidth - viewport.clientWidth) / 2;
    const offset = Math.max(0, Math.min(distance, centerOffset));
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
    const { left, right } = card.getBoundingClientRect();
    const bounds = viewport.getBoundingClientRect();
    if (left < bounds.left || right > bounds.right) revealProject(card);
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
