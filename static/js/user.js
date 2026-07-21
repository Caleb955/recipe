const colors = ["#87cefa", "#d3d3d3", "#90ee90", "#ffa07a"];

const colorPicker = Math.floor(Math.random() * colors.length);

const colorElement = document.querySelector(".js-color-picker");

colorElement.value = colors[colorPicker];
