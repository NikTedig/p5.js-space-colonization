function Tree(showLeaves) {
  this.leaves = [];
  this.branches = [];
  
  for (let X = 0; X < 500; X++) {
    this.leaves.push(new Leaf());
  }
  
  let pos = createVector(width / 2, height);
  let dir = createVector(0, -1);
  let root = new Branch(null, pos, dir, 1);
  
  this.branches.push(root);
  
  let current = root;
  
  let found = false;
  
  while (!found) {
    for (let X = 0; X < this.leaves.length; X++) {
      let d = p5.Vector.dist(current.pos, this.leaves[X].pos);
      if (d < max_dist) {
        found = true;
      }
    }
    
    if (!found) {
      let branch = current.next();
      current = branch;
      this.branches.push(current);
    }
  }
  
  this.grow = function() {
    for (let X = 0; X < this.leaves.length; X++) {
      let leaf = this.leaves[X];
      
      let closestBranch = null;
      let record = 100000000;
      
      for (let Y = 0; Y < this.branches.length; Y++) {
        
        let branch = this.branches[Y];
        let d = p5.Vector.dist(leaf.pos, branch.pos);
        
        if (d < min_dist) {
          leaf.reached = true;
          closestBranch = null;
          break;
        } else if (d > max_dist) {
          
        } else if (closestBranch === null || d < record) {
          closestBranch = branch;
          record = d;
        }
        
      }
      
      if (closestBranch !== null) {
        
        let newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
        newDir.normalize();
        closestBranch.dir.add(newDir);
        closestBranch.count++;
        
      }
      
      for (let X = this.leaves.length - 1; X > -1; X--) {
        if (this.leaves[X].reached) {
          this.leaves.splice(X, 1);
        }
      }
      
      for (let X = this.branches.length - 1; X > -1; X--) {
        let branch = this.branches[X];
        if (branch.count > 0) {
          branch.dir.div(branch.count + 1);
          let newBranch = branch.next();
          
          this.branches.push(newBranch);
        }
        
        branch.reset();
      }
    }
  }
  
  this.show = function() {
    if (SHOW_LEAVES) {
      for (let X = 0; X < this.leaves.length; X++) {
        this.leaves[X].show();
      }
    }
    
    for (let X = 0; X < this.branches.length; X++) {
      this.branches[X].show();
    }
  }
}