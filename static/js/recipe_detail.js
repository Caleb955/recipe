  async function loadRecipe() {
  const url = new URL(window.location);
  const recipe = await fetch(`/get_recipe?id=${url.searchParams.get("id")}`).then(r => r.json());

  const containerElement = document.querySelector(".js-container");
  containerElement.innerHTML = `
    <div class="modal-banner" style="background-image: url('${recipe.image_url}')"></div>
    <div class="modal-inner">
      <span class="card-tag">${recipe.category}</span>
      <h2>${recipe.title}</h2>
      <div class="card-meta">${recipe.time_string} · Serves ${recipe.servings}</div>
      <div class="modal-columns">
        <div>
          <h3>Ingredients</h3>
          <ul class="ingredient-list">${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
        </div>
        <div>
          <h3>Method</h3>
          <ol class="steps-list">${recipe.steps.map(s => `<li>${s}</li>`).join("")}</ol>
        </div>
      </div>
    </div>
  `;
console.log(recipe);
}
loadRecipe();