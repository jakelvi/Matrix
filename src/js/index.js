/**
 @type {HTMLCanvasElement}
 */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "#0aff0a");
gradient.addColorStop(1, "#FFD700");

class Symbol {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXY";
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = "";
    this.canvasHeight = canvasHeight;
  }
  draw(context) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.99) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}

class Effect {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
    console.log(this.symbols);
  }
  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }

  resize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 20;
const nextFrame = 1000 / fps;
let timer = 0;

const animate = (timeStampe) => {
  const deltaTime = timeStampe - lastTime;
  lastTime = timeStampe;
  if (timer > nextFrame) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.textAlign = "center";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient; //"#0aff0a";
    ctx.font = effect.fontSize + "px monospace";
    effect.symbols.forEach((symbol) => {
      symbol.draw(ctx);
    });
    timer = 0;
  } else {
    timer += deltaTime;
  }

  requestAnimationFrame(animate);
};
animate(0);

window.addEventListener("resize", function () {
  canvas.width = this.window.innerWidth;
  canvas.height = this.window.innerHeight;
  effect.resize(canvas.width, canvas.height);
});
