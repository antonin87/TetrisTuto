import React, { Component } from "react";
import { render } from "react-dom";
import TetrisDashboard from './TetrisDashboard';
import TetrisContext from './TetrisContext';
import TetrisProvider from './TetrisProvider';

class App extends Component {
  render() {
    return (
      <TetrisProvider>
        <div className="App">
          <TetrisDashboard />
        </div>
      </TetrisProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
