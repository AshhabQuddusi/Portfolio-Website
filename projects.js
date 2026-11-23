{
  const work = document.getElementById("projects");
  const cards = [...work.querySelectorAll(".project")];
  const filters = document.getElementById("project-filters");
  const count = document.getElementById("project-count");
  const filterButtons = [...filters.querySelectorAll("button")];

  function filterProjects(button) {
    const group = button.dataset.projectFilter;
    let visible = 0;
    filterButtons.forEach((option) => option.setAttribute("aria-pressed", String(option === button)));
    cards.forEach((card) => {
      card.hidden = group !== "all" && !card.dataset.projectGroups.split(" ").includes(group);
      if (!card.hidden) visible++;
    });
    count.textContent = visible === cards.length
      ? cards.length + " projects"
      : visible + " of " + cards.length + " projects";
  }

  function linkedProject() {
    return cards.find((card) => "#" + card.id === location.hash);
  }

  filters.hidden = false;
  filterButtons.forEach((button) => button.addEventListener("click", () => {
    filterProjects(button);
    if (linkedProject()?.hidden) history.replaceState(history.state, "", "#projects");
  }));

  window.addEventListener("hashchange", () => {
    const target = linkedProject();
    if (target?.hidden) {
      filterProjects(filterButtons[0]);
      target.scrollIntoView();
    }
  });

  const dialog = document.getElementById("project-dialog");
  if (typeof dialog.showModal === "function") {
    const title = dialog.querySelector("#project-dialog-title");
    const intro = dialog.querySelector(".case-intro");
    const kind = dialog.querySelector(".case-kind");
    const art = dialog.querySelector(".case-art");
    const tags = dialog.querySelector(".case-tags");
    const details = dialog.querySelector(".case-details");
    const links = dialog.querySelector(".case-links");
    let opener;

    cards.forEach((card) => {
      const cover = card.querySelector(".project-art-link");
      const projectName = card.querySelector("h3").textContent;
      const artwork = cover.querySelector(".project-art");
      const wrapper = document.createElement("div");
      wrapper.className = "project-cover";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "project-open";
      button.setAttribute("aria-label", "Case study for " + projectName);
      button.setAttribute("aria-haspopup", "dialog");
      button.setAttribute("aria-controls", dialog.id);

      const label = document.createElement("span");
      label.className = "project-open-label";
      label.textContent = "Case study";
      label.setAttribute("aria-hidden", "true");
      button.append(label);
      wrapper.append(artwork, button);
      cover.replaceWith(wrapper);

      button.addEventListener("click", () => {
        const study = card.querySelector(".case-study");
        opener = button;
        title.textContent = projectName;
        kind.textContent = study.dataset.projectKind;
        intro.textContent = card.querySelector(".project-body > p").textContent;
        art.replaceChildren(artwork.cloneNode(true));
        tags.innerHTML = card.querySelector(".tags").innerHTML;
        details.replaceChildren(study.content.cloneNode(true));
        links.innerHTML = card.querySelector(".project-links").innerHTML;
        dialog.showModal();
        dialog.scrollTop = 0;
      });
    });

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => opener?.focus({ preventScroll: true }));
  }
}
