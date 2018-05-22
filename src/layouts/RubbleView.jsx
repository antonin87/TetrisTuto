import React from 'react';
import Piece from '../components/Piece.jsx';
import Square from '../components/Square.jsx';

const RubbleView = (props) => {
  return(

    <div>
      {props.rubble.map((sq, index) => <Square key={index} row={sq.row} col={sq.col} />)}
    </div>
  );
}

export default RubbleView;
