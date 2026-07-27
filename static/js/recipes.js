function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);
}

async function loadRecipes() {
  let recipes = await fetch("/get-recipes").then((response) => {
    return response.json();
  });

  console.log(recipes);

  const grid = document.getElementById("recipeGrid");
  const modalBody = document.getElementById("modalBody");
  const recipeModal = new bootstrap.Modal(
    document.getElementById("recipeModal"),
  );

  recipes.forEach((r, i) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="binder"><span></span><span></span><span></span></div>
      <div class="card-photo" style="background-image:url(${r.image})"></div>
      <div class="card-body">
        <span class="card-tag">${escapeHtml(r.category)}</span>
        <h3 class="card-title">${escapeHtml(r.title)}</h3>
        <div class="card-meta">${escapeHtml(r.time_string)} · Serves ${escapeHtml(r.servings)}</div>
      </div>
    `;
    const open = () => openRecipe(i);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") open();
    });
    grid.appendChild(card);
  });

  function openRecipe(index) {
    const r = recipes[index];

    modalBody.innerHTML = `
      <div class="modal-banner" style="background-image:url('${r.image}')"></div>
      <div class="modal-inner">
        <span class="card-tag">${escapeHtml(r.category)}</span>
        <h2>${escapeHtml(r.title)}</h2>
        <div class="card-meta">${escapeHtml(r.time_string)} · Serves ${escapeHtml(r.servings)}</div>
        <div class="modal-columns">
          <div>
            <h3>Ingredients</h3>
            <ul class="ingredient-list">
              ${r.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </div>
          <div>
            <h3>Method</h3>
            <ol class="steps-list">
              ${r.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
            </ol>
          </div>
        </div>
      </div>
    `;
    recipeModal.show();
  }
}

loadRecipes();
