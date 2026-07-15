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

  // Build the feed
  recipes.forEach((r, i) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.tabIndex = 0; // keyboard-focusable, since it's not a real <a>/<button>
    card.innerHTML = `
      <div class="binder"><span></span><span></span><span></span></div>
      <div class="card-photo" style="background-image:url('${r.image}')"></div>
      <div class="card-body">
        <span class="card-tag">${r.category}</span>
        <h3 class="card-title">${r.title}</h3>
        <div class="card-meta">${r.time} · Serves ${r.servings}</div>
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
        <span class="card-tag">${r.category}</span>
        <h2>${r.title}</h2>
        <div class="card-meta">${r.time} · Serves ${r.servings}</div>
        <div class="modal-columns">
          <div>
            <h3>Ingredients</h3>
            <ul class="ingredient-list">
              ${r.ingredients.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div>
            <h3>Method</h3>
            <ol class="steps-list">
              ${r.steps.map((step) => `<li>${step}</li>`).join("")}
            </ol>
          </div>
        </div>
      </div>
    `;
    recipeModal.show();
  }
}

loadRecipes();
