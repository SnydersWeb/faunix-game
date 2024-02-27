import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Canvas from './components/Canvas';

class App extends Component {
  constructor(props) {
    super(props);
    this.keyDown = this.keyDown.bind(this);
  }
  
  keyDown(command) {
    if(/shoot/.test(command)) {
      console.log(`Apps.Js - shoot!: ${command}`);
    } else if(/right|left|none/.test(command)) {
      this.props.moveShip(command);
    } else {
      console.log(`Apps.Js - unknown: ${command}`);
    }
  }

  render() {
    window.onkeydown = (e) => {
      switch (e.key) {
        case "d":
        case "ArrowRight":
          this.keyDown("right");
          break;
        case "a":
        case "ArrowLeft":
          this.keyDown("left");
          break;
        case " ":
          this.keyDown("shoot");
          break;
        default:
          break;
      }
    };
    
    window.onkeyup = (e) => {
      switch (e.key) {
        case "d":
        case "ArrowRight":
          this.keyDown("none");
          break;
        case "a":
        case "ArrowLeft":
          this.keyDown("none");
          break;
        default:
          break;
      }
    };

    return (
      <div className="App">
        <Canvas 
          gameState={this.props.gameState}
          startGame={this.props.startGame}
        />
      </div>
    );
  }

}

App.propTypes = {
  gameState: PropTypes.shape({
    started: PropTypes.bool.isRequired,
    shipPosition: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    shipMoving: PropTypes.oneOf(['left', 'right', 'none']).isRequired,
    pylonMoveFactor: PropTypes.number,
    pylonMoveIn: PropTypes.bool,    
    shipFire: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  moveShip: PropTypes.func.isRequired,
  shoot: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default App;