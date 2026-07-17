const recipeElement = document.querySelector(".js-recipe-carousel");

async function loadRecipes() {
  let indexRecipeHTML = "";

  const recipes = await fetch("/get-recipes").then((response) => {
    return response.json();
  });

  recipes.forEach((r) => {
    indexRecipeHTML += `
      <div class="recipe-element js-recipe-element">
        <div class="card shadow-sm">
            <img
              class="bd-placeholder-img card-img-top"
              src="${r.image_url}"
              alt="banner"
              height="225"
              width="100%"
              style="object-fit: cover"
            />

            <div class="card-body">
              <div class="card-carte mb-2 d-flex justify-content-between">
                <div class="card-carte-name border border-1 px-2 fit-data">
                  <small>${r.category}</small>
                </div>

                <div class="card-ratings">
                  <i
                    class="fa-solid fa-star"
                    style="color: rgb(255, 212, 59)"
                  ></i>
                  <span>4.8</span>
                  <span>(271)</span>
                </div>
              </div>

              <div>
                <h4 class="card-title fs-5">
                  ${r.title}
                </h4>
                <p class="card-text text-truncate-2">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <div
                  class="d-flex justify-content-between align-items-center mt-auto"
                >
                  <small class="text-body-secondary">7-11-26</small>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
  });

  recipeElement.innerHTML = indexRecipeHTML;

  document.querySelectorAll(".js-recipe-element").forEach((element) => {
    element.addEventListener("click", () => {
      window.location.href = "/recipe_detail";
    });
  });
}

loadRecipes();
