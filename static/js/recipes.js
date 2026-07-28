/**
 * recipes.js
 * Frontend logic for the recipes listing page.
 * - Fetches all recipes from the /get-recipes endpoint (JSON).
 * - Dynamically creates recipe cards in a grid layout.
 * - Each card, when clicked (or Enter key), opens a modal with the recipe's details.
 * - Uses Bootstrap 5 for modal and styling.
 * - Utility function escapeHtml prevents XSS when inserting user-generated content.
 */
function escapeHtml(str) {
  // Escape HTML special characters to prevent XSS
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&",
    "<": "<",
    ">": ">",
    '"': """,
    "'": "'",
  })[c]);
}

/**
 * Fetch recipes from the backend and populate the grid.
 * Also sets up modal behavior for viewing recipe details.
 */
async function loadRecipes() {
  // GET request to /get-recipes returns JSON array of recipe objects
  let recipes = await fetch("/get-recipes").then((response) => {
    return response.json();
  });

  console.log(recipes); // Debug: view fetched recipes in console

  // Grab DOM elements we will manipulate
  const grid = document.getElementById("recipeGrid"); // Container for recipe cards
  const modalBody = document.getElementById("modalBody"); // Body of the modal
  const recipeModal = new bootstrap.Modal(
    document.getElementById("recipeModal") // Bootstrap modal instance
  );

  // Loop through each recipe and create a card element
  recipes.forEach((r, i) => {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.tabIndex = 0; // Make card focusable for keyboard accessibility
    card.innerHTML = `
      <div class="binder"><span></span><span></span><span></span></div>
      <div class="card-photo" style="background-image:url(${r.image})"></div>
      <div class="card-body">
        <span class="card-tag">${escapeHtml(r.category)}</span>
        <h3 class="card-title">${escapeHtml(r.title)}</h3>
        <div class="card-meta">${escapeHtml(r.time_string)} · Serves ${escapeHtml(r.servings)}</div>
      </div>
    `;
    // Closure to capture the current index for the openRecipe function
    const open = () => openRecipe(i);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") open();
    });
    grid.appendChild(card);
  });

  /**
   * Populate and show the modal with details of the selected recipe.
   * @param {number} index - Index of the recipe in the recipes array
   */
  function openRecipe(index) {
    const r = recipes[index];

    // Set modal body HTML with recipe image and details
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
    recipeModal.show(); // Show the Bootstrap modal
  }
}

// Initial load of recipes when the script runs
loadRecipes();