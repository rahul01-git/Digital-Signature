const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");
const downloadBtn = document.getElementById("downloadBtn");

let size = 1;
let x;
let y;
colorEl.value = "black";
let currentColor = colorEl.value;
let isClicked = false;

canvas.addEventListener("mousedown", (e) => {
  isClicked = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", () => {
  isClicked = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isClicked) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    ctx.beginPath();
    ctx.arc(x2, y2, size, 0, Math.PI * 2);
    ctx.fillStyle = currentColor;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = size * 2;
    ctx.stroke();
    x = x2;
    y = y2;
  }
});

function updateSize() {
  sizeEl.innerText = size;
}

function downloadImage() {
  const dataURL = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = "mySign.jpeg";
  a.click();
}

increaseBtn.addEventListener("click", () => {
  size += 1;
  if (size > 20) size = 20;
  updateSize();
});

decreaseBtn.addEventListener("click", () => {
  size -= 1;
  if (size < 1) size = 1;
  updateSize();
});

colorEl.addEventListener("change", (e) => {
  currentColor = e.target.value;
});

clearEl.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

downloadBtn.addEventListener("click", downloadImage);
