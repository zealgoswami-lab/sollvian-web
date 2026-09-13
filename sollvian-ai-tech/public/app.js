const NAV = [
  { id: "home", label: "Home", hint: "Where the line starts" },
  { id: "product", label: "Product", hint: "The five systems" },
  { id: "contact", label: "Contact", hint: "Talk to us" },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderRail(root, variant) {
  const hero = variant === "hero";
  root.innerHTML = `
    <nav class="rail ${hero ? "rail-hero" : ""}" aria-label="${hero ? "Site sections" : "On this page"}">
      <ol class="rail-list">
        ${NAV.map((item, index) => `
          <li class="rail-item">
            <button class="rail-btn" type="button" data-id="${item.id}">
              <span class="dot" aria-hidden="true"></span>
              <span>
                <span class="rail-label">${item.label}</span>
                ${hero ? `<span class="rail-hint">${item.hint}</span>` : ""}
              </span>
            </button>
          </li>
        `).join("")}
      </ol>
    </nav>
  `;
  root.querySelectorAll(".rail-btn").forEach((button) => {
    button.addEventListener("click", () => scrollToSection(button.dataset.id));
  });
}

function setActive(id) {
  document.querySelectorAll(".rail-btn").forEach((button) => {
    const on = button.dataset.id === id;
    button.classList.toggle("is-active", on);
    if (on) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });
}

function watchSections() {
  const sections = NAV.map((item) => document.getElementById(item.id)).filter(Boolean);
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActive(visible.target.id);
    },
    { rootMargin: "-28% 0px -55% 0px", threshold: [0.15, 0.35, 0.55] },
  );
  sections.forEach((section) => observer.observe(section));
}

function setupMenu() {
  const menu = document.getElementById("menu");
  const openBtn = document.getElementById("menu-open");
  const closeBtns = menu.querySelectorAll("[data-close-menu]");
  const list = document.getElementById("menu-list");

  list.innerHTML = NAV.map((item, index) => `
    <button class="menu-link" type="button" data-id="${item.id}" data-close-menu>
      <span class="menu-num">${index + 1}</span>
      <span>
        <strong>${item.label}</strong>
        <span style="display:block;color:#94a3b8;font-size:12px">${item.hint}</span>
      </span>
    </button>
  `).join("");

  const setOpen = (open) => {
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", open ? "false" : "true");
  };

  openBtn.addEventListener("click", () => setOpen(true));
  menu.querySelectorAll("[data-close-menu]").forEach((node) => {
    node.addEventListener("click", (event) => {
      const id = event.currentTarget.dataset.id;
      if (id) scrollToSection(id);
      setOpen(false);
    });
  });
}

async function setupForm() {
  const form = document.getElementById("contact-form");
  const ok = document.getElementById("form-ok");
  const err = document.getElementById("form-err");
  const submit = document.getElementById("form-submit");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      interest: String(data.get("interest") ?? "").trim(),
      note: String(data.get("note") ?? "").trim(),
    };

    ok.classList.add("hidden");
    err.classList.add("hidden");

    if (!payload.name || !payload.email || !payload.note) {
      err.textContent = "Name, email, and a short note are required.";
      err.classList.remove("hidden");
      return;
    }

    submit.disabled = true;
    submit.textContent = "Sending…";
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("failed");
      ok.classList.remove("hidden");
      form.reset();
    } catch {
      err.textContent = "The note did not go through. Try again in a moment.";
      err.classList.remove("hidden");
    } finally {
      submit.disabled = false;
      submit.textContent = "Send the note";
    }
  });
}

document.querySelectorAll("[data-rail]").forEach((root) => {
  renderRail(root, root.dataset.rail);
});
document.getElementById("talk")?.addEventListener("click", () => scrollToSection("contact"));
document.getElementById("brand")?.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToSection("home");
});
setupMenu();
setupForm();
watchSections();
setActive("home");
