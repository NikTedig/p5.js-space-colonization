function Branch(parent, pos, dir, generation) {
  this.pos = pos;
  this.parent = parent;
  this.dir = dir;
  this.origDir = this.dir.copy();
  this.count = 0;
  
  this.generation = generation;
  
  this.reset = function() {
    this.dir = this.origDir.copy();
    this.count = 0;
  }
  
  this.next = function() {
    //let newDir = this.dir.mult(2);
    let nextPos = p5.Vector.add(this.pos, this.dir);
    let nextBranch = new Branch(this.pos, nextPos, this.dir.copy(), this.generation + 1);
    return nextBranch;
  }
  
  this.show = function() {
    if (parent !== null) {
      stroke(generation / 5, 100, 100);
      strokeWeight(7 - generation / 100);
      line(this.pos.x, this.pos.y, this.parent.x, this.parent.y);
    }
  }
}