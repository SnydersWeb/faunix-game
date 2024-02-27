import React from 'react';
import PropTypes from 'prop-types';
import { storeViewBox } from '../utils/functions';
import ScrollingBackground from './ScrollingBackground';
import Ship from './Ship';

const Canvas = props => {
    const gameHeight = 1200;
    const viewBox = [0 - (window.innerWidth / 2), 100 - gameHeight, window.innerWidth, gameHeight];
    storeViewBox(viewBox);
    const { shipPosition } = props.gameState;
    const { shipMoving } = props.gameState;

    // console.log(`viewBox: ${viewBox}`);
    // console.dir(props);
    return (
        <svg
            id='fauxnix-canvas'
            preserveAspectRatio='xMaxYMax none'
            viewBox={viewBox}
        >   
            <ScrollingBackground />
            <Ship position={shipPosition} moving={shipMoving} />
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
        shipMoving: PropTypes.oneOf(['left', 'right', 'none']).isRequired,
        shipFire: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
    startGame: PropTypes.func.isRequired,
};

export default Canvas;