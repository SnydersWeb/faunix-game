import React from 'react';
import PropTypes from 'prop-types';
import { gameHeight } from '../utils/constants';
import { storeViewBox } from '../utils/functions';
import ScrollingBackground from './ScrollingBackground';
import Ship from './Ship';

const Canvas = props => {
    const viewBox = [0 - (window.innerWidth / 2), 100 - gameHeight, window.innerWidth, gameHeight];
    storeViewBox(viewBox);
    const { shipPosition } = props.gameState;
    const { shipMoving } = props.gameState;
    const { pylonMoveFactor } = props.gameState;

    // console.log(`viewBox: ${viewBox}`);
    // console.dir(props);
    return (
        <svg
            id='fauxnix-canvas'
            preserveAspectRatio='xMaxYMax none'
            viewBox={viewBox}
        >   
            <ScrollingBackground />
            <Ship position={shipPosition} moving={shipMoving} pylonMoveFactor={pylonMoveFactor} />
        </svg>
    );
};

Canvas.propTypes = {
    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        shipPosition: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }).isRequired,
        pylonMoveFactor: PropTypes.number,
        pylonMoveIn: PropTypes.bool,    
        shipMoving: PropTypes.oneOf(['left', 'right', 'none']).isRequired,
        shipFire: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
    startGame: PropTypes.func.isRequired,
};


Canvas.defaultProps = {
    gameState: {
        pylonMoveFactor: 0,
        pylonMoveIn: false,
    }
};

export default Canvas;