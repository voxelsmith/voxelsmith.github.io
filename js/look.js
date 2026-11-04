(function () {
  var root = document.documentElement;
  var themeButton = document.querySelector(".theme-toggle");

  function paintThemeButton() {
    if (!themeButton) return;
    var light = root.getAttribute("data-theme") === "light";
    themeButton.setAttribute("aria-pressed", light ? "true" : "false");
    themeButton.textContent = light ? "Dark" : "Light";
    themeButton.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
  }

  if (!root.getAttribute("data-theme")) root.setAttribute("data-theme", "light");
  paintThemeButton();
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      paintThemeButton();
    });
  }

  var toggle = document.querySelector(".nav-toggle");
  var bar = document.querySelector(".topbar");
  if (toggle && bar) {
    toggle.addEventListener("click", function () {
      var open = bar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var grid = document.getElementById("game-grid");
  if (!grid) return;

  var cat = "all";
  var tag = "all";
  var empty = document.getElementById("empty-note");

  function apply() {
    var shown = 0;
    grid.querySelectorAll(".game-card").forEach(function (card) {
      var okCat = cat === "all" || card.getAttribute("data-cat") === cat;
      var tags = (card.getAttribute("data-tags") || "").split(" ");
      var okTag = tag === "all" || tags.indexOf(tag) !== -1;
      var visible = okCat && okTag;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (empty) empty.hidden = shown !== 0;
  }

  function bind(selector, kind) {
    document.querySelectorAll(selector).forEach(function (button) {
      button.addEventListener("click", function () {
        document.querySelectorAll(selector).forEach(function (other) {
          other.setAttribute("aria-pressed", "false");
        });
        button.setAttribute("aria-pressed", "true");
        if (kind === "cat") cat = button.getAttribute("data-filter");
        else tag = button.getAttribute("data-tag");
        apply();
      });
    });
  }

  bind("[data-filter]", "cat");
  bind("[data-tag]", "tag");
})();
