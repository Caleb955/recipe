const colors = [
  "#87cefa",
  "#d3d3d3",
  "#90ee90",
  "#ffa07a",
  "#ffb6c1",
  "#f0e68c",
  "#dda0dd",
  "#ff69b4",
  "#00ced1",
  "#ff4500",
];

const colorPicker = Math.floor(Math.random() * colors.length);

const colorElement = document.querySelector(".js-color-picker");

colorElement.value = colors[colorPicker];
