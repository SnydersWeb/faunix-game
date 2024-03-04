import React from 'react';
import PropTypes from 'prop-types';
import { getCanvas } from '../utils/functions';

const ShotsRemaining = (props) => {
    const canvas = getCanvas();
    
    const scoreStyle = {
        fontFamily: '"Press Start 2P", cursive',
        fontSize: canvas.y * .022,
        fill: '#d6d33e',
    };

    const position = {
        x: canvas.x * .50,
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