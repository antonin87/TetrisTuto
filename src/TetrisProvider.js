import React, { Component } from 'react';
import TetrisContext from './TetrisContext';
import * as Model from './models/model';

class TetrisProvider extends Component {
  state = {
    game: new Model.Game(),
    update: () =>
        this.setState({game: this.state.game.tick()})
    };
  render() {
    return (
      <TetrisContext.Provider
        value={{
          state: this.state,
        }}
      >
        {this.props.children}
      </TetrisContext.Provider>
    );
  }
}

export default TetrisProvider;
