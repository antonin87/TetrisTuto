import React from 'react';
import Square from './Square.jsx';
const Piece = (props) => {
  return(
    <div>
      {props.piece.points().map((sq, index) => <Square key={index} row={sq.row} col={sq.col} />)}
    </div>
  );
};
export default Piece;
