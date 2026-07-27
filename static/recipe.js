async function loadRecipes() {
  const recipes = await fetch("/get-recipes").then(r => r.json());
  const grid = document.getElementById("recipeGrid");
  const filterBar = document.getElementById("categoryFilter");
  const modalBody = document.getElementById("modalBody");
  const recipeModal = new bootstrap.Modal(document.getElementById("recipeModal"));

  let activeCategory = "All";

  function renderCards() {
    grid.innerHTML = "";
    const visible = activeCategory === "All"
      ? recipes
      : recipes.filter(r => r.category === activeCategory);

    visible.forEach((r) => {
      const card = document.createElement("article");
      card.className = "recipe-card";
      card.tabIndex = 0;
      card.innerHTML = `
        <div class="binder"><span></span><span></span><span></span></div>
        <div class="card-photo" style="background-image:url('${r.image}')"></div>
        <div class="card-body">
          <span class="card-tag">${r.category}</span>
          <h3 class="card-title">${r.title}</h3>
          <div class="card-author">by ${r.uploader}</div>
          <div class="card-meta">${r.time_string} · ${r.servings}</div>
        </div>
      `;
      const open = () => openRecipe(r);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter") open(); });
      grid.appendChild(card);
    });
  }

  function renderFilters() {
    const categories = ["All", ...new Set(recipes.map(r => r.category))];
    filterBar.innerHTML = "";
    categories.forEach((category) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-pill" + (category === activeCategory ? " active" : "");
      btn.textContent = category;
      btn.addEventListener("click", () => {
        activeCategory = category;
        filterBar.querySelectorAll(".category-pill").forEach(el => el.classList.remove("active"));
        btn.classList.add("active");
        renderCards();
      });
      filterBar.appendChild(btn);
    });
  }

  function openRecipe(r) {
    modalBody.innerHTML = `
      <div class="modal-banner" style="background-image:url('${r.image}')"></div>
      <div class="modal-inner">
        <span class="card-tag">${r.category}</span>
        <h2>${r.title}</h2>
        <div class="card-author">by ${r.uploader}</div>
        <div class="card-meta">${r.time_string} · ${r.servings}</div>
        <div class="modal-columns">
          <div>
            <h3>Ingredients</h3>
            <ul class="ingredient-list">${r.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
          </div>
          <div>
            <h3>Method</h3>
            <ol class="steps-list">${r.steps.map(s => `<li>${s}</li>`).join("")}</ol>
          </div>
        </div>
      </div>
    `;
    recipeModal.show();
  }

  renderFilters();
  renderCards();
}
loadRecipes();
