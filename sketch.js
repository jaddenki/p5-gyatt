
let R = "#ff0000";
let G = "#00ff00";
let B = "#0000ff"
let W = 255;
let BL = 0;
let fillColor = BL;
let amount = 100;
let animations = []; 
let current; 
let switch_time = 5000; 
let last = 0; 



let state = [];
let gyattState = [];
let cols = 3;
let rows = 3;
let w, h;
let font;



let mouseOverY;
let mouseOverX;

let max = 9;




function preload() {
  font = loadFont('fonts/Helvetica-Bold.ttf');

}
function setup() {
  createCanvas(500,500);
  textFont(font);
  textSize(170);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  frameRate(30);
  animations = [gyatt, count, truchet];
  current = random(animations);
  switch(current){
    case count:
      countSetup();
      rectMode(CENTER);
      break;
    case gyatt:
      rectMode(CORNER);
      gyattSetup();
      break;
    case truchet:
      rectMode(CENTER);
  }
}

function draw() {
    if (millis() - last > switch_time) {
      last = millis();
      current = random(animations); 
  switch(current){
    case count:
      rectMode(CENTER);
      ellipseMode(CENTER);
      countSetup();
      break;
    case gyatt:
      rectMode(CORNER);
      gyattSetup();
      break;
    case truchet:
      rectMode(CENTER);
      ellipseMode(CENTER);
      break;
    default:
      rectMode(CENTER);
      ellipseMode(CENTER);
      break;
  }
      background(W);
    }

  current();
}

function worms() {
  let r = 0;
  let g = map(mouseX, 0, width, 50, 150); 
  let b = map(mouseY, 0, height, 200, 255);

  let gyatt = map(mouseX, 0, 500, 10, 50);
  let gridSize = gyatt;
  stroke(r,g,b);
  noFill();
  translate(-10,-10);
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let offsetX = noise(x * 0.05, y * 0.05, frameCount * 0.01) * gridSize * 2 - gridSize;
      let offsetY = noise(x * 0.05 + 100, y * 0.05 + 100, frameCount * 0.01) * gridSize * 2 - gridSize;
      ellipse(x + offsetX+ gyatt , y + offsetY + gyatt, 1, 1);
    }
  }
}

  function truchet() {
    if (frameCount % 2 != 0) return;
    background(B); 
    fill(W); 
    rectMode(CENTER);
    noStroke();
  
    let menge = int(1 + mouseX * 0.1);
    let abstand = width / menge;
  
    translate(abstand / 2, abstand / 2);
    for (let i = 0; i < menge; i++) {
      for (let j = 0; j < menge; j++) {
        let x = i * abstand;
        let y = j * abstand;
        let w = abstand;
        let h = abstand;
  
        if (random(1) < 0.5) {
          ellipse(x, y, w, h);
        } else {
          if (random(1) < 0.5) {
            let mag = w / 2;
            let x1 = 0;
            let x2 = mag;
            let x3 = -mag;
            let y1 = -mag;
            let y2 = mag;
            let y3 = mag;
            push();
            translate(x, y);
            triangle(x1, y1, x2, y2, x3, y3);
            pop();
          } else {
            push();
            translate(x, y);
            rect(0, 0, w, h);
            pop();
          }
        }
      }
    }
  }  
function dafuq() {
  background(BL);
  fill(W);
  rectMode(CENTER);
  
  let tilesX = map(mouseX, 0,500,1,10);
  let tilesY = map(mouseX, 0, 500, 1, 10);
  
  let tileW = width/tilesX;
  let tileH = height/tilesY;

  translate(tileW/2, tileH/2);
  for (let i = 0; i < tilesX; i++) {
    for (let j = 0; j < tilesY; j++) {
      if (i % 2 == 0  && j % 2 == 0) {
      ellipse(i*tileW, j*tileH, tileW, tileH);
      } else if (j % 2 == 1 || i % 3 == 1){
        triangle(i*tileW-tileW/2, j*tileH-tileH/2,i*tileW+tileW/2, j*tileH+tileH/2,i*tileW+tileW/2, j*tileH-tileH/2);
      } else {
        rect(i*tileW, j*tileH, tileW, tileH);
      }
    }
  }

}

 
function toilet() {
let freq = 2.2;
let mag = width*0.55;
let spacing = 20;
let tilesY = 20;
let tileY = height/tilesY;
for (let i = 0; i<tileY; i++) {
  fill(B);
  stroke(W);
  let wave = sin(radians(frameCount) * freq);
  let y = height / 2 - (tilesY - 1) * spacing + i * spacing;
  rectMode(CENTER);

  push();
  translate(width/2 + wave * mag,(height/2 * i+ y)/tilesY); // change anchor point to center
  rotate(radians(wave * 180));
  rect(0,i*tileY, 20, 20);
  pop();
}


}

function circleOverload() {
  background(W);
  fill(BL);
  translate(width/2, height/2);
  for (let i = 0; i<=amount; i++) {
    let y = map(i, 0, amount, -height*0.6, height*0.6);
    let x = map(sin(radians((frameCount + (i*4)))), -1, 1, -width*0.4, width*0.4);
    push();
    translate(x, y);
    ellipse(0, 0, 10, 10); 
    pop();    
  }
}

function countSetup() {
  w = width/cols;
  h = height/rows;

  for (let x = 0; x < cols; x++) {
    state[x] = [];
    for (let y = 0; y < rows; y++) {
      state[x][y] = 0;
    }
  }
  rectMode(CENTER);
}
function count() {
 background(W);
  noStroke();

  mouseOverX = int(map(mouseX, 0, width, 0, cols));
  mouseOverY = int(map(mouseY, 0, height, 0, rows));

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      push();
      translate(x*w, y*h);
      if (mouseOverX == x && mouseOverY == y) {

        fill(B);
        rect(w/2, h/2, w, h);
        fill(W);
      } else {
        fill(W);
        rect(w/2, h/2, w, h);
        fill(B);
      }
      text(state[x][y], w/2, h*0.45);
      pop();
    }
  }

  fill(W);
  if (mouseIsPressed) {
    ellipse(mouseX, mouseY, 30, 30);
  } else {
    ellipse(mouseX, mouseY, 40, 40);
  }

}

function gyattSetup() {
    let tilesX = 5;
    let tilesY = 5;
  
    state = [tilesX];
  
    for (let x = 0; x < tilesX; x++) {
      state[x] = [];
      for (let y = 0; y < tilesY; y++) {
        state[x][y] = false;
      }
    }
    rectMode(CORNER);
  }
  
  function gyatt() {
    background(B);
    let tilesX = 5;
    let tilesY = 5;
    let tileW = width / tilesX;
    let tileH = height / tilesY;
    mouseOverX = Math.floor(map(mouseX, 0, width, 0, tilesX));
    mouseOverY = Math.floor(map(mouseY, 0, height, 0, tilesY));
    ellipseMode(CORNER);
    noStroke();
    for (let x = 0; x < tilesX; x++) {
      for (let y = 0; y < tilesY; y++) {
        if (mouseOverX == x && mouseOverY == y) {
          fill(B);
        } else {
          fill(W);
        }
        if (state[x][y] == false) {
          rect(x * tileW, y * tileH, tileW, tileH);
        } else {
          ellipse(x * tileW, y * tileH, tileW, tileH);
        }
      }
    }
  }






function mouseReleased() {
  if (state[mouseOverX][mouseOverY] < max) {
    state[mouseOverX][mouseOverY]++;
  } else {
    state[mouseOverX][mouseOverY] = 0;
  }
}