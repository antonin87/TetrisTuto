export class Point {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
  add(newPoint){
    return new Point(this.row - 1 + newPoint.row, this.col - 1 + newPoint.col);
  }
  fallOne(){
    return new Point(this.row + 1, this.col);
  }
}

export class Shape {
  constructor(name, rotator) {
    this.name = name;
    this.rotator = rotator;
  }
  pointsRotated(rotation){
    return this.rotator(rotation)
  }
}

export class Piece {
  constructor(shape, offset = new Point(1, 10)) {
    this.shape = shape;
    this.offset = offset;
    this.rotation = 'N';
  }
  points() {
    return this.shape.pointsRotated(this.rotation).map((point, ix) => {
      return point.add(this.offset);
    })
  }

  maxRow(){
    return Math.max.apply(null, this.points().map(point => point.row));
  }
  maxCol(){
    return Math.max.apply(null, this.points().map(point => point.col));
  }
  rotation(){
    this.rotation = Piece.rotations()[(Piece.rotations().indexOf(this.rotation)+1) % 4];
  }
  static rotations() {
    return ['N','E','S','W'];
  }
}

export class Game {
  constructor(){
    this.rows = 15;
    this.cols = 20;
    this.rubble = [];
    this.startAsPiece();
  }
  tick(){
    this.fallingPiece.offset = this.fallingPiece.offset.fallOne();
    if(this.fallingPiece.maxRow() >= this.rows) {
      this.convertToRubble();
    }
    return this;
  }
  convertToRubble(){
    this.rubble = this.rubble.concat(this.fallingPiece.points());
    this.startAsPiece();
  }
  startAsPiece(){
    this.fallingPiece = new Piece(shapes.selectRandom());
  }
  rotate(){
    this.fallingPiece.rotate();
    return this;
  }

}

/*

*/
export var shapes = {
  'O': new Shape('O', rotation => [new Point(1,1),new Point(1,2), new Point(2,1),new Point(2,2)]),
  'I': new Shape('I', rotation => {
  switch (rotation) {
    case 'N': return [new Point(1,1), new Point(2,1),new Point(3,1), new Point(4,1)];
    case 'E': return [new Point(2,1), new Point(2,2),new Point(2,3), new Point(2,4)];
    case 'S': return [new Point(1,1), new Point(2,1),new Point(3,1), new Point(4,1)];
    case 'W': return [new Point(2,1), new Point(2,2),new Point(2,3), new Point(2,4)];
  }
}),
  'T': new Shape('T', rotation => {
      switch (rotation) {
        case 'N': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(1,3)];
        case 'E': return [new Point(1,2), new Point(2,2),new Point(3,2), new Point(2,1)];
        case 'S': return [new Point(1,2), new Point(2,1),new Point(2,2), new Point(2,3)];
        case 'W': return [new Point(1,1), new Point(2,1),new Point(3,1), new Point(2,2)];
      }
  }),
  'L': new Shape('L', rotation => {
    switch (rotation) {
      case 'N': return [new Point(1,1), new Point(2,1), new Point(1,2), new Point(1,3)];
      case 'E': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(3,2)];
      case 'S': return [new Point(1,3), new Point(2,1), new Point(2,2), new Point(2,3)];
      case 'W': return [new Point(1,1), new Point(2,1), new Point(3,1), new Point(3,2)];
    }
  }),
  'Z': new Shape('Z', rotation => {
    switch (rotation) {
      case 'N': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(2,3)];
      case 'E': return [new Point(1,2), new Point(2,2),new Point(2,1), new Point(3,1)];
      case 'S': return [new Point(1,1), new Point(1,2), new Point(2,2), new Point(2,3)];
      case 'W': return [new Point(1,2), new Point(2,2),new Point(2,1), new Point(3,1)];
    }
  })
}

shapes.selectRandom = function() {
  var index = Math.floor(Math.random()*1000000%5);
  return shapes[Object.keys(shapes)[index]];
}
