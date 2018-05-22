class Point {
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

export default Point;
