async function loadRecipe() {
  const url = new URL(window.location);

  const recipe = await fetch(
    `/recipe_detail?id=${url.searchParams.get("id")}`,
  ).then((response) => {
    return response.json();
  });

  console.log(recipe);

  const containerElement = document.querySelector(".js-container");

  containerElement.innerHTML = `
            <div
              class="modal-banner"
              style="background-image: url(&quot;${recipe.image_url}&quot;)"
            ></div>
            <div class="modal-inner">
              <span class="card-tag">${recipe.category}</span>
              <h2>${recipe.title}</h2>
              <div class="card-meta">${recipe.time} · Serves ${recipe.servings}</div>
              <div class="modal-columns">
                <div>
                  <h3>Ingredients</h3>
                  <ul class="ingredient-list">
                    ${recipe.ingredients
                      .map(
                        (item) => `
                    <li>${item}</li>
                    `,
                      )
                      .join("")}
                  </ul>
                </div>
                <div>
                  <h3>Method</h3>
                  <ol class="steps-list">
                    ${recipe.steps
                      .map(
                        (step) => `
                    <li>${step}</li>
                    `,
                      )
                      .join("")}
                  </ol>
                </div>
              </div>
            </div>
  `;
}

loadRecipe();
