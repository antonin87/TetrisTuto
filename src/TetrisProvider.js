import React, { Component } from 'react';
import TetrisContext from './TetrisContext';
import * as Model from './models/model';
import * as Mousetrap from 'mousetrap';

class TetrisProvider extends Component {
  state = {
    game: new Model.Game(),
    tick: () =>
        this.setState({game: this.state.game.tick()}),
    rotate: () =>
      this.setState({game: this.state.game.rotate()}),
    left: () =>
      this.setState({game: this.state.game.left()}),
    right: () =>
      this.setState({game: this.state.game.right()}),
    }
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
