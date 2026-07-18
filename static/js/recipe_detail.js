async function loadRecipe() {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  console.log(id);

  const recipe = await fetch(
    `/recipe_detail?id=${parent(url.searchParams.get("id"))}`,
  ).then((response) => {
    return response.json();
  });

  console.log(recipe);

  //   const containerElement = document.querySelector(".js-container");

  //   containerElement.innerHTML = `
  //           <div
  //             class="modal-banner"
  //             style="background-image: url(&quot;${r.image}&quot;)"
  //           ></div>
  //           <div class="modal-inner">
  //             <span class="card-tag">${r.category}</span>
  //             <h2>${r.title}</h2>
  //             <div class="card-meta">${r.time} · Serves ${r.servings}</div>
  //             <div class="modal-columns">
  //               <div>
  //                 <h3>Ingredients</h3>
  //                 <ul class="ingredient-list">
  //                   ${r.ingredients
  //                     .map(
  //                       (item) => `
  //                   <li>${item}</li>
  //                   `,
  //                     )
  //                     .join("")}
  //                 </ul>
  //               </div>
  //               <div>
  //                 <h3>Method</h3>
  //                 <ol class="steps-list">
  //                   ${r.steps
  //                     .map(
  //                       (step) => `
  //                   <li>${step}</li>
  //                   `,
  //                     )
  //                     .join("")}
  //                 </ol>
  //               </div>
  //             </div>
  //           </div>
  //         `;
}
loadRecipe();