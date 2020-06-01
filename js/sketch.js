// images
let backgroundImage, virusRed, virusGreen, virusYellow, energyOrb, virusHover, virusConnected;

// game state variables
const config = [[[79.28833365440369, 88.22730779647824], [1, 4]], [[197.68749177455902, 95.93496322631833], [0, 2, 3, 26]], [[211.6304486989975, 180.8819532394409], [1, 3, 20, 21]], [[166.34999215602875, 152.72182822227475], [2, 4, 1, 5, 26]], [[112.37981915473938, 129.22832965850827], [3, 0, 5, 8]], [[74.16576147079468, 174.33843612670896], [4, 6, 7, 3]], [[82.72433280944824, 236.50465011596677], [5, 7, 18]], [[131.9815218448639, 194.11579370498654], [6, 5]], [[126.50677561759949, 273.2753813266754], [4, 9, 17]], [[54.98400330543518, 294.05317306518555], [8, 10, 11]], [[120.9574043750763, 324.6306538581848], [9, 11, 15, 17]], [[73.72549176216125, 355.17597794532776], [10, 12, 9, 13]], [[30.714809894561768, 396.1895763874054], [11, 13, 16]], [[77.29107141494751, 434.9778950214386], [12, 14, 11]], [[91.1339819431305, 494.1072076559067], [13, 15]], [[141.0607099533081, 453.0397415161133], [14, 16, 10, 17, 29]], [[115.48012495040894, 393.35251450538635], [15, 17, 12, 30, 31]], [[177.19504237174988, 311.41716837882996], [16, 18, 8, 28, 10, 15]], [[233.42975974082947, 290.6355321407318], [17, 19, 6, 28, 36, 38]], [[234.78959500789642, 229.51835989952085], [18, 20, 26, 21, 38, 36, 22]], [[177.2245466709137, 237.18771934509275], [19, 2]], [[254.93180751800537, 80.17495870590207], [2, 22, 19, 27, 26]], [[283.36331248283386, 243.42701435089108], [21, 23, 41, 19]], [[320.1661705970764, 210.79430580139157], [22, 24, 25, 41]], [[351.3471782207489, 141.43613576889035], [23, 25, 40]], [[404.43155169487, 176.95230841636655], [24, 26, 23, 40, 65]], [[292.338490486145, 135.04955768585202], [19, 27, 21, 1, 3, 25]], [[334.77938175201416, 87.12170124053952], [26, 21]], [[225.72293877601624, 340.6172454357147], [18, 29, 17]], [[185.47376990318298, 376.7219692468643], [28, 30, 15, 31]], [[238.96095156669617, 416.2771463394165], [29, 31, 33, 16, 34]], [[197.27666676044464, 441.22566878795624], [30, 32, 16, 29]], [[243.0451363325119, 479.4919401407242], [31]], [[280.5963456630707, 437.10595965385437], [30, 34]], [[309.0588450431824, 390.59407114982605], [33, 35, 36, 37, 68, 30]], [[253.52224707603455, 371.15628123283386], [34, 36, 69]], [[302.7951419353485, 338.5284900665283], [35, 37, 38, 18, 19, 65, 34]], [[361.1138164997101, 352.37300992012024], [36, 34]], [[312.4402165412903, 287.8298819065094], [36, 39, 65, 19, 18]], [[368.313193321228, 218.06941032409665], [38, 40, 49]], [[401.36218070983887, 89.8421764373779], [39, 24, 25, 44]], [[358.8511347770691, 275.0798523426056], [22, 42, 23]], [[415.7636761665344, 269.4519519805908], [41, 43, 65, 66, 64]], [[496.5744912624359, 191.44008159637448], [42, 44, 48, 47]], [[440.31476974487305, 130.93022108078], [43, 45, 40]], [[478.0555069446564, 83.07907581329343], [44, 46, 47]], [[574.2412805557251, 151.05626583099362], [45, 47, 50, 77]], [[577.7947306632996, 90.5634522438049], [46, 48, 43, 45]], [[499.365359544754, 134.24653410911557], [47, 49, 43]], [[554.1536211967468, 215.4958605766296], [48, 50, 39, 57, 77, 58]], [[640.9101486206055, 132.30684995651242], [49, 51, 46, 77]], [[696.4277029037476, 161.45757436752316], [50, 52, 56]], [[743.6474561691284, 126.7139673233032], [51, 53]], [[749.8816847801208, 244.78215575218198], [52, 54, 55, 60, 57]], [[771.436333656311, 182.97377824783322], [53, 55]], [[705.464243888855, 210.80551147460935], [54, 53]], [[643.6655521392822, 190.6339883804321], [51, 57, 77, 58, 61]], [[664.4713282585144, 250.34446120262143], [56, 58, 60, 53, 49]], [[640.2179002761841, 298.9586651325226], [57, 59, 81, 56, 49]], [[724.9395847320557, 344.80223655700684], [58, 62, 85]], [[704.7508358955383, 288.52588534355164], [57, 53]], [[767.9299116134644, 310.7602059841156], [56, 85]], [[661.740779876709, 349.63459372520447], [59, 63, 82, 78, 86]], [[593.6998724937439, 360.7419043779373], [62, 64, 79, 77]], [[512.4266743659973, 330.88163137435913], [63, 65, 42, 73, 75]], [[384.0332329273224, 312.84282207489014], [64, 66, 25, 38, 36, 42]], [[416.65351390838623, 355.8712065219879], [65, 67, 42, 75]], [[368.7324523925781, 400.3486394882202], [66, 68, 73, 71]], [[384.00980830192566, 456.52297735214233], [67, 69, 34]], [[333.32061767578125, 446.7865437269211], [68, 70, 35]], [[389.5716965198517, 507.93342888355255], [69, 71]], [[434.0248703956604, 469.7690814733505], [70, 72, 67]], [[493.04452538490295, 451.0364145040512], [71, 73, 84, 83]], [[426.3489544391632, 408.6521327495575], [72, 74, 67, 75, 64]], [[483.2802712917328, 388.49051892757416], [73, 75, 79, 80]], [[461.38936281204224, 261.97359561920166], [74, 76, 78, 66, 73, 64]], [[516.8806314468384, 247.2937166690826], [75, 77]], [[588.1461501121521, 288.55294585227966], [76, 46, 79, 63, 49, 50, 56]], [[537.5060439109802, 298.3169913291931], [75, 62]], [[531.2051773071289, 367.6852345466614], [74, 80, 77, 63]], [[543.7009334564209, 412.80867755413055], [79, 81, 83, 84, 74]], [[593.9648747444153, 428.49445939064026], [80, 82, 83, 58]], [[638.7962102890015, 411.40798330307007], [81, 62]], [[561.7501735687256, 463.4853810071945], [80, 72, 81, 85]], [[458.0411911010742, 519.6644276380539], [80, 72, 85]], [[735.8551025390625, 436.99919283390045], [84, 59, 61, 83]], [[697.120726108551, 403.07257175445557], [62]]];
const initialstate = [-2, 1, 0, 0, -3, 2, 2, -1, 2, -4, 1, 1, 8, 8, 2, 5, -4, 0, 1, -3, 1, 8, 0, 2, 1, 8, 1, 0, 2, 0, -1, -1, 6, 0, 1, 1, 8, 1, 0, -2, -5, 2, -1, -3, 8, 2, 0, -1, 2, 0, -2, 0, 0, 0, -9, 0, 0, 0, 5, 0, 7, 1, 7, -3, 2, 8, 2, 7, 8, -5, 0, 1, 0, 0, 0, 2, 0, -1, 0, 0, 0, 1, 0, 2, 1, 8, 7];
let currentstate = [];
let moves = [];
let action = 1; // 1 = GIVE to neighbors // -1 = TAKE from neighbours
let mode = 0; // 0 = normal gameplay // 1 = affect only single node (to setup the board initially)

// variables for animation
let animFrom; //node index
let animTo = []; //node index list
let animStep;
let animAction;

// UI elements
let actionButton = new Button("🠄 🦠 🠆", 0, 0, 100, 40);
let undoButton = new Button("⤺ Undo", 101, 0, 100, 40);
let resetButton = new Button("↺ Reset", 202, 0, 100, 40);
let modeButton = new Button("⏸", 678, 0, 40, 40);
let fulscreenButton = new Button("🔳", 719, 0, 40, 40);
let helpButton = new Button("[ℹ]", 760, 0, 40, 40);

// stats
let Money = 0;
let Edges = 0;
let Vertices = 0;
let Genus;
let Winnable;


// prefetch images
function preload() {
  backgroundImage = loadImage('images/hall.jpg');
  virusRed = loadImage('images/virus_red.png');
  virusGreen = loadImage('images/virus_green.png');
  virusYellow = loadImage('images/virus_yellow.png');
  energyOrb = loadImage('images/energy.png');
  virusHover = loadImage('images/hover.png')
  virusConnected = loadImage('images/connected.png')
}

// initialize canvas
function setup() {
  let cnv = createCanvas(800, 600);
  cnv.parent('game-canvas');
  frameRate(30);
  textFont('Monospace', 16);
  textAlign(CENTER, CENTER);
  stroke(color(250, 220, 150, 255));
  strokeWeight(2);
  currentstate = initialstate;
  clacStats();
  drawBG();
  drawNodes();
  drawUI();
}

// display hover effects
function mouseMoved() {

  drawBG()
  for (const [i, node] of config.entries()) {
    if (dist(node[0][0], node[0][1], mouseX, mouseY) < 15) {
      image(virusHover, node[0][0]-23, node[0][1]-23, 46, 46);
      for (const connectednode of node[1]) {
        image(virusConnected, config[connectednode][0][0]-23, config[connectednode][0][1]-23, 46, 46);
      }
    }
  }
  drawNodes();
  drawUI();

}

// check for user input
function mouseClicked() {

  //when a node is clicked, pass its index and action to move()
  for (const [i, node] of config.entries()) {
    if (dist(node[0][0], node[0][1], mouseX, mouseY) < 15) {
      move(i, action);
    }
  }

  //action (GIVE or TAKE) button clicked?
  if (actionButton.clicked()) {
    action *= -1;
    actionButton.text = (action == 1 ? "🠄 🦠 🠆" : "🠆 🦠 🠄");
  }

  //undo button clicked?
  if (undoButton.clicked() && moves.length != 0) {
    undo();
  }

  //reset button clicked?
  if (resetButton.clicked()) {
    reset();
  }

  //mode button clicked?
  if (modeButton.clicked()) {
    mode = (mode + 1) % 2;
    moves = [];
    modeButton.text = (mode == 1 ? "▶" : "⏸");
  }

  //fullscreen button clicked?
  if (fulscreenButton.clicked()) {
    fullscreen(!fullscreen());
  }

  //help button clicked?
  if (helpButton.clicked()) {
    alert("TODO");
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
  if (mode == 0) { //, if in play mode

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
  }
}

// to draw connections between nodes.
function drawBG() {

  image(backgroundImage, 0, 0);
  for (const node of config) {
    push();
    noFill();
    strokeWeight(2);
    for (const edge of node[1]) {
      line(node[0][0], node[0][1], config[edge][0][0], config[edge][0][1]);
    }
    pop();
  }

}

// update each node (color and text)
function drawNodes() {

  for (const [i, value] of currentstate.entries()) {

    push();
    if (value < 0) {
      fill(color(255, 255, 200));
      image(virusRed, config[i][0][0] - 20, config[i][0][1] - 20, 40, 40);
    } else if (value > 0) {
      image(virusGreen, config[i][0][0] - 20, config[i][0][1] - 20, 40, 40);
    } else {
      image(virusYellow, config[i][0][0] - 20, config[i][0][1] - 20, 40, 40);
    }
    //ellipse(config[i][0][0], config[i][0][1], 30);

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
  modeButton.show();
  helpButton.show();
  fulscreenButton.show();
  fill(color(255, 255, 200));
  text(moves.length + " moves", 60, 580);
  text("Genus = " + Genus, 180, 580);
  text("Money = " + Money, 320, 580);
  text("Winnable? " + (Money>=0?(Winnable?'Yes':'Maybe'):'No'), 470, 580);
  pop();

}

// calculate stats
function clacStats() {
  for (const [i, node] of config.entries()) {
    Money += initialstate[i];
    Edges += node[1].length;
  }
  Edges /= 2;
  Vertices = config.length;
  Genus = Edges - Vertices + 1;
  Winnable = (Money >= Genus);
}

// Button Class
function Button(_text, _x, _y, _w, _h) {

  this.text = _text;
  this.x = _x;
  this.y = _y;
  this.w = _w;
  this.h = _h;

  this.show = function() {
    rect(this.x, this.y, this.w, this.h);
    text(this.text, this.x + this.w / 2, this.y + this.h / 2);
  }

  this.clicked = function() {
    return (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h);
  }

}

// animation loop
function draw() {
  if (animTo.length) {
    drawBG();
    push();
    noStroke();
    animStep = (frameCount - fc) / 10;
    if (animAction == -1) {
      animStep = 1 - animStep; // reverse direction
    }
    if ((animStep >= 1) || (animStep <= 0)) { // stop animating once finished
      animTo = [];
    }
    for (const _animTo of animTo) {
      let x = lerp(config[animFrom][0][0], config[_animTo][0][0], animStep);
      let y = lerp(config[animFrom][0][1], config[_animTo][0][1], animStep);
      image(energyOrb, x - 10, y - 10, 20, 20);
    }
    pop();
    drawNodes();
    drawUI();
  }
}
