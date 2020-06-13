// images
let backgroundImage, virusRed, virusGreen, virusYellow, energyOrb, virusHover, virusConnected, arrow;

// sounds
let plop, plopAlt, suck, suckAlt, bgm;

// game state variables
let config = [];
let initialstate = [];
let currentstate = [];
let moves = [];
let action = 1; // 1 = GIVE to neighbors // -1 = TAKE from neighbours
let mode = 0; // 0 = normal gameplay // 1 = affect only single node (to setup the board initially)
let inputConfig;
let mute = 1;
let debug = 0;

// variables for animation
let animFrom; //node index
let animTo = []; //node index list
let animStep;
let animAction;

// colors
let lightColor, darkColor;

// UI elements
let actionButton = new Button("‹ ⊙ ›", 0, 0, 100, 40);
let undoButton = new Button("⤺ Undo", 101, 0, 100, 40);
let resetButton = new Button("↺ Reset", 202, 0, 100, 40);
let solveButton = new Button("Solve", 303, 0, 100, 40);
let modeButton = new Button("⏸", 596, 0, 40, 40);
let muteButton = new Button("M", 637, 0, 40, 40);
let fullscreenButton = new Button("🔳", 678, 0, 40, 40);
let viewCodeButton = new Button("</>", 719, 0, 40, 40)
let helpButton = new Button("[ℹ]", 760, 0, 40, 40);

// stats
let Money, Edges, Vertices, Genus, Winnable;


// prefetch images
function preload() {
  backgroundImage = loadImage('images/hall.jpg');
  virusRed = loadImage('images/virus_red.png');
  virusGreen = loadImage('images/virus_green.png');
  virusYellow = loadImage('images/virus_yellow.png');
  energyOrb = loadImage('images/energy.png');
  virusHover = loadImage('images/hover.png')
  virusConnected = loadImage('images/connected.png')
  arrow = loadImage('images/arrow.png')
  soundFormats('ogg');
  plop = loadSound('sound/plop.ogg');
  plopAlt = loadSound('sound/plopalt.ogg');
  suck = loadSound('sound/suck.ogg');
  suckAlt = loadSound('sound/suckalt.ogg');
  bgm = loadSound('sound/bgm.ogg');
}

// initialize canvas
function setup() {
  let cnv = createCanvas(800, 600);
  cnv.parent('game-canvas');
  readInput();
  frameRate(30);
  imageMode(CENTER);
  textFont('Monospace', 16);
  textAlign(CENTER, CENTER);
  lightColor = color(255, 255, 200);
  darkColor = color(39, 48, 53);
  strokeWeight(3);
  masterVolume(0.3);
  bgm.playMode('restart');
  currentstate = initialstate;
  moves = [];
  calcStats();
  drawBG();
  drawNodes();
  drawUI();
  if (mute == 0) {
    bgm.loop();
  }
}

// reads inputs
function readInput() {
  inputConfig = JSON.parse(select('#gamestate').value());
  config = inputConfig.config;
  initialstate = inputConfig.initialstate;
}

// start a new game with different config
function resetup() {
  setup();
  document.getElementById('gamestate-presets').selectedIndex = 0;
  setDownloadURL();
}

// display hover effects
function mouseMoved() {

  drawBG();
  drawOverlays();
  drawNodes();
  drawUI();

}

// check for user input
function mouseClicked() {

  // when a node is clicked, pass its index and action to move()
  for (const [i, node] of config.entries()) {
    if (dist(node[0][0], node[0][1], mouseX, mouseY) < 18) {
      move(i, action);
      playSound(action);
    }
  }

  // action (GIVE or TAKE) button clicked?
  if (actionButton.clicked()) {
    action *= -1;
    actionButton.text = (action == 1 ? "‹ ⊙ ›" : "› ⊙ ‹");
  }

  // undo button clicked?
  if (undoButton.clicked() && moves.length != 0) {
    undo();
  }

  // reset button clicked?
  if (resetButton.clicked()) {
    reset();
  }

  // solve button clicked?
  if (solveButton.clicked()) {
    for (let [i, val] of currentstate.entries()) {
      if (val < 0) {
        move(i, -1);
      }
    }
  }

  // mode button clicked?
  // 1 = Edit mode: to make changes to board
  // 0 = Play mode
  if (modeButton.clicked()) {
    mode = (mode + 1) % 2;
    modeButton.text = (mode == 1 ? "▶" : "⏸");

    // append the changes to DOM
    if (mode == 0) {
      select('#gamestate').value('{"config":' + JSON.stringify(config, null, 2) + ',"initialstate":' + JSON.stringify(initialstate) + '}');
      resetup();
    }

  }

  // mute button clicked?
  if (muteButton.clicked()) {
    mute = (mute+1)%2;
    if (mute==1) {
      bgm.pause();
    } else {
      bgm.loop();
    }
  }

  // fullscreen button clicked?
  if (fullscreenButton.clicked()) {
    // fullscreen(!fullscreen());
    // toggleFullscreen();
  }

  // help button clicked?
  if (helpButton.clicked()) {
    location.hash = ''
    location.hash = '#info'
  }

  // code button clicked?
  if (viewCodeButton.clicked()) {
    window.open('https://github.com/aryan02420/theVirusGame', '_blank');
  }

  drawUI();

}

// undo last action
function undo() {
  let lastmove = moves.pop();
  move(lastmove[0], -lastmove[1]);
  moves.pop();
}

// reset board / start over
function reset() {
  let num = moves.length;
  for (let i = num - 1; i >= 0; i--) {
    undo();
  }
}

// main game mechanic
// takes node index and action and changes data accordingly
function move(_node, _action) {
  if (mode == 0) { // if in play mode

    // calculate new state
    currentstate[_node] -= _action * config[_node][1].length;
    for (const edge of config[_node][1]) {
      currentstate[edge] += _action;
    }

    // animate
    animFrom = _node; //index of current node
    animTo = config[_node][1]; //indices of connected nodes
    animAction = _action;
    fc = frameCount;

    // add current move to the moves list
    let currentmove = [_node, _action];
    moves.push(currentmove);

  } else { // if in edit mode
    currentstate[_node] -= _action;
    calcStats();
    mouseMoved();
  }
}

// click sound effects
function playSound(_action) {
  let alt = random();
  if (action == 1) {
    if (alt >= 0.8) {
      plopAlt.play();
    } else {
      plop.play()
    }
  }
  if (action == -1) {
    if (alt >= 0.8) {
      suckAlt.play();
    } else {
      suck.play()
    }
  }
}

// draw bg and connections between nodes.
function drawBG() {

  image(backgroundImage, 400, 300);
  for (const node of config) {
    push();
    lightColor.setAlpha(80)
    stroke(lightColor);
    noFill();
    for (const edge of node[1]) {
      line(node[0][0], node[0][1], config[edge][0][0], config[edge][0][1]);
    }
    pop();
  }

}

// draw arrows and hover effect
function drawOverlays() {
  for (const [i, node] of config.entries()) {
    let x1 = node[0][0];
    let y1 = node[0][1];
    if (dist(x1, y1, mouseX, mouseY) < 18) {
      if (mode == 0) {
        for (const connectednode of node[1]) {
          let x2 = config[connectednode][0][0];
          let y2 = config[connectednode][0][1];
          let angle = Math.atan2(y2 - y1, x2 - x1) + (action == -1 ? PI : 0);
          let x3 = (action == 1 ? x1 : x2) + 29 * cos(angle);
          let y3 = (action == 1 ? y1 : y2) + 29 * sin(angle);
          // let x3 = x1 + action*30*cos(angle);
          // let y3 = y1 + action*30*sin(angle);
          imageAdv(arrow, x3, y3, 10, 10, angle);
          image(virusConnected, x2, y2, 48, 48);
        }
      }
      image(virusHover, node[0][0], node[0][1], 48, 48);
    }
  }
}

// update each node (color and text)
function drawNodes() {

  for (const [i, value] of currentstate.entries()) {

    push();
    if (value < 0) {
      fill(color(255, 255, 200));
      image(virusRed, config[i][0][0], config[i][0][1], 40, 40);
    } else if (value > 0) {
      image(virusGreen, config[i][0][0], config[i][0][1], 40, 40);
    } else {
      image(virusYellow, config[i][0][0], config[i][0][1], 40, 40);
    }

    if (debug) {
      push();
      fill(255);
      text(i.toString(), config[i][0][0] - 18, config[i][0][1] - 18);
      pop();
    }
    noStroke();
    text(value.toString(), config[i][0][0], config[i][0][1]);
    pop();

  }

}

// update ui elements (button, status, stats, etc)
function drawUI() {

  push();
  noStroke();
  actionButton.show();
  undoButton.show();
  resetButton.show();
  solveButton.show();
  modeButton.show();
  muteButton.show();
  helpButton.show();
  fullscreenButton.show();
  viewCodeButton.show();
  lightColor.setAlpha(255);
  fill(lightColor);
  let statusText = "";
  statusText += moves.length + " moves";
  statusText += "    ";
  statusText += "Genus = " + Math.round(Genus);
  statusText += "    ";
  statusText += "Money = " + Money;
  statusText += "    ";
  statusText += "Winnable? " + (Money >= 0 ? (Winnable ? 'Yes' : 'Maybe') : 'No');
  statusText += "    ";
  statusText += Math.floor(frameRate()) + " fps";
  statusText += "    ";
  text(statusText, 400, 580);
  pop();

}

// calculate stats
function calcStats() {
  Money = 0;
  Edges = 0;
  Vertices = 0;
  for (const [i, node] of config.entries()) {
    Money += initialstate[i];
    Edges += node[1].length;
  }
  Edges /= 2;
  Vertices = config.length;
  Genus = Edges - Vertices + 1;
  Winnable = (Money >= Genus);
}

// FIXME
// toggle fullscreen from w3schools
function toggleFullscreen() {
  let element = document.getElementById("defaultCanvas0");
  if (!document.fullscreenElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
  } else {
    element = document.fullscreenElement();
    if (element.exitFullscreen) {
      element.exitFullscreen();
    } else if (element.mozCancelFullScreen) {
      /* Firefox */
      element.mozCancelFullScreen();
    } else if (element.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitExitFullscreen();
    } else if (element.msExitFullscreen) {
      /* IE/Edge */
      element.msExitFullscreen();
    }
  }
}

// Button Class
function Button(_text, _x, _y, _w, _h) {

  this.text = _text;
  this.x = _x;
  this.y = _y;
  this.w = _w;
  this.h = _h;

  this.show = function() {
    push();
    fill(this.clicked() ? 200 : 230);
    rect(this.x, this.y, this.w, this.h);
    fill(darkColor);
    text(this.text, this.x + this.w / 2, this.y + this.h / 2);
    pop();
  }

  this.clicked = function() {
    return (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h);
  }

}

// function to draw images with rotation
function imageAdv(_img, _cx, _cy, _w, _h, _angle) {
  push();
  translate(_cx, _cy);
  rotate(_angle);
  image(_img, 0, 0, _w, _h);
  pop();
}

// animation
function animate() {
  if (animTo.length) {
    drawBG();
    push();
    noStroke();
    animStep = (frameCount - fc) / 10;
    if (animAction == -1) {
      animStep = 1 - animStep; // reverse direction
    }
    for (const _animTo of animTo) {
      let x = lerp(config[animFrom][0][0], config[_animTo][0][0], animStep);
      let y = lerp(config[animFrom][0][1], config[_animTo][0][1], animStep);
      image(energyOrb, x, y, 16, 16);
    }
    pop();
    drawNodes();
    drawUI();
    if ((animStep >= 1) || (animStep <= 0)) { // stop animating once finished
      animTo = [];
      mouseMoved();
    }
  }
}

function draw() {
  animate();
}
