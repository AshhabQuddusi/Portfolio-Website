(() => {
  const launch = document.querySelector("#terminal-launch");
  const terminal = document.querySelector("#portfolio-terminal");
  const title = document.querySelector("#terminal-title");
  const close = document.querySelector("#terminal-close");
  const output = document.querySelector("#terminal-output");
  const form = document.querySelector("#terminal-form");
  const input = document.querySelector("#terminal-command");
  const drawing = terminal.closest(".drawing");
  const art = drawing.querySelector("img");
  const email = document.querySelector("#contact .email");
  const github = document.querySelector('.social-links a[href^="https://github.com/"]');
  const resume = document.querySelector(".resume-button");

  function setOpen(open) {
    drawing.classList.toggle("terminal-active", open);
    launch.setAttribute("aria-expanded", String(open));
    art.hidden = launch.hidden = open;
    terminal.hidden = !open;
    (open ? title : launch).focus();
  }

  function paragraph(text, className) {
    const node = document.createElement("p");
    node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function link(text, href, target) {
    const node = document.createElement("a");
    node.textContent = text;
    node.href = href;
    if (target === "_blank") {
      node.target = target;
      node.rel = "noopener";
    }
    return node;
  }

  function projectLinks() {
    const list = document.createElement("ul");
    document.querySelectorAll("#projects .project").forEach((project) => {
      const title = project.querySelector("h3").textContent.trim();
      const source = project.querySelector(".project-links a");
      const item = document.createElement("li");
      item.append(project.id ? link(title, "#" + project.id) : link(title, source.href, source.target));
      list.append(item);
    });
    return list;
  }

  const commands = new Map([
    ["help", () => paragraph("Try work, about, skills, contact, resume, github, or clear.")],
    ["work", projectLinks],
    ["about", () => link("About Ashhab Quddusi", "#story")],
    ["skills", () => link("Browse technical skills", "#skills")],
    ["contact", () => link(email.textContent.trim(), email.href)],
    ["resume", () => link("Open résumé (PDF)", resume.href, resume.target)],
    ["github", () => link("AshhabQuddusi on GitHub", github.href, github.target)],
  ]);

  function run(rawCommand) {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    input.value = "";
    if (command === "clear") {
      output.replaceChildren(paragraph("Terminal cleared. Type a command or choose one above."));
    } else {
      const result = commands.get(command);
      output.replaceChildren(
        paragraph("$ " + command, "terminal-echo"),
        result ? result() : paragraph("Unknown command. Try help."),
      );
    }
    output.scrollTop = 0;
  }

  launch.hidden = false;
  launch.addEventListener("click", () => setOpen(true));
  close.addEventListener("click", () => setOpen(false));
  terminal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      setOpen(false);
    }
  });
  terminal.querySelectorAll("[data-command]").forEach((button) => {
    button.addEventListener("click", () => run(button.dataset.command));
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    run(input.value);
    input.focus();
  });
})();
