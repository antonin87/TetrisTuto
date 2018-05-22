import React, { Component } from 'react';
import './App.css';
import * as Model from './models/model';
import * as Mousetrap from 'mousetrap';
import TetrisContext from './TetrisContext';

import GameView from './layouts/GameView';

class TetrisDashboard extends React.Component {

  componentDidMount() {
    const gameState = this.props.context.state;
      setInterval(() => gameState.tick(),300);
      // Bind rotation
      Mousetrap.bind('space', () => {
        gameState.rotate();
          return false;
      });
      Mousetrap.bind('left', () => {
        gameState.left();
          return false;
      });
      Mousetrap.bind('right', () => {
        gameState.right();
          return false;
      });
  }

  render(){
    const {children} = this.props;
    return (
      <div>
      <div>{children}</div>
      </div>
    );
  }
};

export default props => (
  <TetrisContext.Consumer>
  {context => (
    <TetrisDashboard {...props} context={context} >
      <GameView game={context.state.game} />
    </TetrisDashboard>
  )}
  </TetrisContext.Consumer>
);
