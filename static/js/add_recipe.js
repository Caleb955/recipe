const uploadElement = document.querySelector(".js-upload-recipe");

uploadElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const data = Object.fromEntries(formData);

  console.log(data);

  // you can send data to the backend from this point the object is stored on the data variable
});
