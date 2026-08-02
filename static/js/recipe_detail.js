  function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);
}

  async function loadRecipe() {
  const url = new URL(window.location);
  const recipe = await fetch(`/get_recipe?id=${url.searchParams.get("id")}`).then(r => r.json());

  const containerElement = document.querySelector(".js-container");
  containerElement.innerHTML = `
    <div class="modal-banner" style="background-image: url('${recipe.image}')"></div>
    <div class="modal-inner">
      <span class="card-tag">${escapeHtml(recipe.category)}</span>
      <h2>${escapeHtml(recipe.title)}</h2>
      <button class="like-btn" data-id="${recipe.id}">
        <i class="fa-${recipe.liked ? 'solid' : 'regular'} fa-heart"></i>
      </button>      
      <div class="card-meta">${escapeHtml(recipe.time_string)} · Serves ${escapeHtml(recipe.servings)}</div>
      <div class="modal-columns">
        <div>
          <h3>Ingredients</h3>
          <ul class="ingredient-list">${recipe.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
        </div>
        <div>
          <h3>Method</h3>
          <ol class="steps-list">${recipe.steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol>
        </div>
      </div>
    </div>
  `;
  document.querySelector('.like-btn').addEventListener('click', async (e) => {
    const res = await fetch(`/toggle-like/${recipe.id}`, { method: 'POST' });
    if (res.status === 401) { window.location.href = '/login'; return; }
    const data = await res.json();
    e.currentTarget.querySelector('i').className = data.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
  });
console.log(recipe);
}
loadRecipe();