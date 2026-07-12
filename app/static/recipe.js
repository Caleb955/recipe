  // ---- In your app, this array is what Flask/Postgres would give you ----
  // e.g. rendered server-side with Jinja, or fetched from an API route as JSON.
  const recipes = [
    {
      title: "Skillet Margherita Pizza",
      category: "Dinner",
      time: "35 min",
      servings: 4,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      ingredients: ["1 pizza dough ball", "1/2 cup tomato sauce", "150g fresh mozzarella", "Fresh basil leaves", "2 tbsp olive oil"],
      steps: ["Preheat oven to 250°C with a skillet inside.", "Stretch dough to fit the skillet.", "Spread sauce, tear mozzarella over top.", "Bake 8–10 min until blistered, top with basil."]
    },
    {
      title: "Creamy Garlic Pasta",
      category: "Dinner",
      time: "25 min",
      servings: 2,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
      ingredients: ["200g spaghetti", "4 garlic cloves, sliced", "200ml cream", "50g parmesan", "Black pepper"],
      steps: ["Boil pasta until al dente, reserve 1/2 cup water.", "Soften garlic in butter over low heat.", "Add cream, simmer 3 min.", "Toss in pasta, parmesan, and pasta water until glossy."]
    },
    {
      title: "Fluffy Buttermilk Pancakes",
      category: "Breakfast",
      time: "20 min",
      servings: 3,
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
      ingredients: ["1.5 cups flour", "1 cup buttermilk", "1 egg", "2 tbsp sugar", "1 tsp baking powder"],
      steps: ["Whisk dry ingredients together.", "Whisk in buttermilk and egg until just combined.", "Cook 1/4 cup portions on a hot griddle, 2 min per side."]
    },
    {
      title: "Roasted Veg Grain Bowl",
      category: "Lunch",
      time: "40 min",
      servings: 2,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
      ingredients: ["1 cup cooked quinoa", "1 sweet potato, cubed", "1 cup chickpeas", "Tahini dressing", "Handful greens"],
      steps: ["Roast sweet potato and chickpeas at 200°C for 25 min.", "Assemble quinoa, greens, roasted veg in a bowl.", "Drizzle with tahini dressing."]
    },
    {
      title: "Smash Burger",
      category: "Dinner",
      time: "20 min",
      servings: 2,
      image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80",
      ingredients: ["250g ground beef", "2 burger buns", "2 slices cheddar", "Onion, thinly sliced", "Burger sauce"],
      steps: ["Form loose balls, smash onto a hot pan.", "Season, flip after 90 sec, add cheese.", "Toast buns, build with sauce and onion."]
    },
    {
      title: "Weeknight Tomato Soup",
      category: "Lunch",
      time: "30 min",
      servings: 4,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      ingredients: ["800g canned tomatoes", "1 onion, diced", "2 cups stock", "1/4 cup cream", "Basil"],
      steps: ["Soften onion, add tomatoes and stock.", "Simmer 15 min, blend until smooth.", "Stir in cream, finish with basil."]
    }
  ];

  const grid = document.getElementById("recipeGrid");
  const modalBody = document.getElementById("modalBody");
  const recipeModal = new bootstrap.Modal(document.getElementById("recipeModal"));

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
    card.addEventListener("keydown", e => { if (e.key === "Enter") open(); });
    grid.appendChild(card);
  });

  function openRecipe(index){
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
              ${r.ingredients.map(item => `<li>${item}</li>`).join("")}
            </ul>
          </div>
          <div>
            <h3>Method</h3>
            <ol class="steps-list">
              ${r.steps.map(step => `<li>${step}</li>`).join("")}
            </ol>
          </div>
        </div>
      </div>
    `;
    recipeModal.show();
  }