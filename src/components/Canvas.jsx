import React from 'react';
// import PropTypes from prop-types;
import { storeViewBox } from '../utils/functions';
import ScrollingBackground from './ScrollingBackground';
import Ship from './Ship';

const Canvas = () => {
    const gameHeight = 1200;
    const viewBox = [0 - (window.innerWidth / 2), 100 - gameHeight, window.innerWidth, gameHeight];
    storeViewBox(viewBox);
    const circleStar = {
        fill: '#F00',
    };
    const shipPosition = {
        x: 0,
        y: -375,
    };
    // console.log(`viewBox: ${viewBox}`);
    return (
        <svg
            id='fauxnix-canvas'
            preserveAspectRatio='xMaxYMax none'
            viewBox={viewBox}
        >   
            <ScrollingBackground />
            <Ship position={shipPosition} />
            <circle cx={-200} cy={-600} r={30} style={circleStar} />
        </svg>
    );
};

// Canvas.propTypes = {
//     gameState: PropTypes.shape({
        
//     }).isRequired,
// };

export default Canvas;