import React from 'react';
import Piece from '../components/Piece.jsx';
import Square from '../components/Square.jsx';
import RubbleView from './RubbleView.jsx';

const GameView = (props) => {
  console.log(props);
  return(
    <div className='game-view' style={{ width: props.game.rows*25, height: props.game.cols*25 }}>
      <Piece piece={props.game.fallingPiece} />
      <RubbleView rubble={props.game.rubble} />
    </div>
  );
}

export default GameView;
