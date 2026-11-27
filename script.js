const filters = document.querySelector("#skill-filters");
const skillItems = document.querySelectorAll("#skill-list li");
filters.hidden = false;

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

const copyEmail = document.querySelector("#copy-email");
const copyStatus = document.querySelector("#copy-status");
if (navigator.clipboard?.writeText) {
  document.querySelector("#copy-email-row").hidden = false;
  copyEmail.addEventListener("click", async () => {
    const address = document.querySelector("#contact .email").textContent.trim();
    try {
      await navigator.clipboard.writeText(address);
      copyStatus.textContent = "Email copied.";
    } catch {
      copyStatus.textContent = "Copy the address from the email link.";
    }
  });
}
