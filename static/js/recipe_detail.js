async function loadRecipe() {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  console.log(id);

  const recipe = await fetch(
    `/get_recipe?id=${url.searchParams.get("id")}`,
  ).then((response) => {
    return response.json();
  });

  console.log(recipe);

  const containerElement = document.querySelector(".js-container");

  containerElement.innerHTML = `
    <div class="modal-content recipe-modal-content">
          <button type="button" class="modal-close-btn js-modal-close" data-bs-dismiss="modal" aria-label="Close">
            ×
          </button>
          <div id="modalBody">
      <div class="modal-banner" style="background-image:url(${recipe.image_url})"></div>
      <div class="modal-inner">
        <span class="card-tag">${recipe.category}</span>
        <h2>${recipe.title}</h2>
        <div class="card-meta">${recipe.time_string} · ${recipe.servings}</div>
        <div class="modal-columns">
          <div>
            <h3>Ingredients</h3>
            <ul class="ingredient-list">
              ${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
          </div>
          <div>
            <h3>Method</h3>
            <ol class="steps-list">
              <li>Whisk dry ingredients together.</li><li>Whisk in buttermilk and egg until just combined.</li><li>Cook 1/4 cup portions on a hot griddle, 2 min per side.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
        </div>
  `;

  document.querySelector(".js-modal-close").addEventListener("click", () => {
    window.location.href = "/";
  });
}

loadRecipe();
