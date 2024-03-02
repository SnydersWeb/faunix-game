import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Canvas from './components/Canvas';
import { storeCanvas } from './utils/functions';
import { widthHeightRatio, updateInterval } from './utils/constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.keyDown = this.keyDown.bind(this);
  }

  componentDidMount() {
    const self = this;
    setInterval(() => {
        self.props.moveObjects();
    }, updateInterval);
    window.onresize = () => {
      const cnv = document.getElementById('fauxnix-canvas');
      const { innerHeight } = window;
      const canvasHeight = innerHeight;
      const canvasWidth = canvasHeight * widthHeightRatio;
      storeCanvas({
          x: canvasWidth,
          y: canvasHeight
      });
      cnv.style.width = `${canvasWidth}px`;
      cnv.style.height = `${canvasHeight}px`;
    };
    window.onresize();
  }

  keyDown(command) {
    if (/shoot/.test(command)) {
      this.props.shoot(command);
    } else if (/right|left|none/.test(command)) {
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
    shipFire: PropTypes.arrayOf(PropTypes.shape({
      position: PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
      }).isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
    birds: PropTypes.arrayOf(PropTypes.shape({
        position: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }).isRequired,
        id: PropTypes.number.isRequired,
        fltDir: PropTypes.oneOf(['left', 'right']).isRequired,
        status: PropTypes.oneOf(['normal', 'flee', 'enter', 'struck', 'gone']).isRequired,
        fleeStatus: PropTypes.number.isRequired,
        statusTime: PropTypes.number.isRequired,
        wings: PropTypes.shape({ //Scaler value for wing if hit. 1 is full scale
            left: PropTypes.number.isRequired,
            right: PropTypes.number.isRequired,
        }).isRequired,
    })).isRequired,
    background: PropTypes.shape({
      lgStarsPos: PropTypes.arrayOf(PropTypes.shape({
              x:  PropTypes.number.isRequired,
              y:  PropTypes.number.isRequired
          }).isRequired,
      ).isRequired,
      mdStarsPos: PropTypes.arrayOf(PropTypes.shape({
              x:  PropTypes.number.isRequired,
              y:  PropTypes.number.isRequired
          }).isRequired,
      ).isRequired,
      smStarsPos: PropTypes.arrayOf(PropTypes.shape({
              x:  PropTypes.number.isRequired,
              y:  PropTypes.number.isRequired
          }).isRequired,
      ).isRequired,  
    }).isRequired,
  }).isRequired,
  moveShip: PropTypes.func.isRequired,
  shoot: PropTypes.func.isRequired,
  moveObjects: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

export default App;