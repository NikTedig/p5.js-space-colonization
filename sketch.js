let tree;
let max_dist = 100;
let min_dist = 10;

const SHOW_LEAVES = false;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  tree = new Tree();
}

function mousePressed() {
  tree = new Tree();
}

function draw() {
  background(0);
  tree.show();
  tree.grow();
}