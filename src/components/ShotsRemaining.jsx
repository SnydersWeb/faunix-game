import React from 'react';
import PropTypes from 'prop-types';
import { getCanvas, scaleCoords } from '../utils/functions';

const ShotsRemaining = (props) => {
    const canvas = getCanvas();
    
    const scoreStyle = {
        fontFamily: '"Press Start 2P", cursive',
        fontSize: scaleCoords(4),
        fill: '#d6d33e',
    };

    const position = {
        x: canvas.x * .60,
        y: canvas.y * .04,
    };
    
    return (
        <g>
            <text style={scoreStyle} x={position.x} y={position.y}>
                Shots: {Math.max(0, props.shotsRemaining)}
            </text>
        </g>
    );
};

ShotsRemaining.propTypes = {
    shotsRemaining: PropTypes.number.isRequired,
};

export default ShotsRemaining;