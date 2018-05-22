export class Point {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
  add(newPoint){
    return new Point(this.row - 1 + newPoint.row, this.col - 1 + newPoint.col);
  }

  sameAs(point){
      return (this.row === point.row && this.col === point.col)
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
  minCol(){
    return Math.min.apply(null, this.points().map(point => point.col));
  }
  rotate(){
    const rotations = Piece.rotations();
    this.rotation = rotations[(rotations.indexOf(this.rotation)+1) % 4];
  }
  unRotate(){
    const rotations = Piece.rotations();
    this.rotation = rotations[(rotations.indexOf(this.rotation)-1) % 4];
  }
  left(){
    this.offset = new Point(this.offset.row, this.offset.col - 1);
  }
  right(){
    this.offset = new Point(this.offset.row, this.offset.col + 1);
  }
  fallOne() {
    this.offset = new Point(this.offset.row+1, this.offset.col);
  }
  liftOne() {
    this.offset = new Point(this.offset.row-1, this.offset.col);
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
  tick() {
    this.fallingPiece.fallOne();

    if (this.fallingPiece.maxRow() == this.rows) {
      this.convertToRubble();
      return this;
    }
    const nextPos = this.fallingPiece.points().map(p => new Point(p.row+1,p.col));
    if (nextPos.some(p => this.rubble.some(r => r.sameAs(p)))) {
      this.convertToRubble();
    };
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
    this.transactionDo(
      () => this.fallingPiece.rotate(),
      () => this.fallingPiece.unRotate()
    );
    return this;
  }
  left(){
    this.transactionDo(
      () => this.fallingPiece.left(),
      () => this.fallingPiece.right()
    );
    return this;
  }
  right(){
    this.transactionDo(
      () => this.fallingPiece.right(),
      () => this.fallingPiece.left()
    );
    return this;
  }
  fallingPieceIsOutOfBounds() {
    return (this.fallingPiece.maxRow() > this.rows)
          ||(this.fallingPiece.minCol() < 1)
          || (this.fallingPiece.maxCol() > this.cols)
  }

  fallingPieceOverLapsRubble(){
    this.fallingPiece.points()
      .some(p => this.rubble
      .some(r => r.sameAs(p)));
  }

  transactionDo(thing, compensation){
    thing();
    if(this.fallingPieceIsOutOfBounds() || this.fallingPieceOverLapsRubble()) {
      compensation();
    }

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
      case 'S': return [new Point(2,1), new Point(1,2), new Point(2,2), new Point(1,3)];
      case 'W': return [new Point(1,2), new Point(2,2),new Point(2,1), new Point(3,1)];
    }
  })
}

shapes.selectRandom = function() {
  var index = Math.floor(Math.random()*1000000%5);
  return shapes[Object.keys(shapes)[index]];
}
