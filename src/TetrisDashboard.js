import React, { Component } from 'react';
import './App.css';
import * as Model from './models/model';
import TetrisContext from './TetrisContext';

import GameView from './layouts/GameView';

class TetrisDashboard extends React.Component {

  componentDidMount() {
      // ThemeContext value is this.props.theme
      setInterval(() => this.props.context.state.update(),1000);
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
