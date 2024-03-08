import React from 'react';
import PropTypes from 'prop-types';
import { getCanvas, scaleCoords } from '../utils/canvasFunctions';

const ShotsRemaining = (props) => {
    const canvas = getCanvas();
    
    const style = {
        fontFamily: '"Press Start 2P", cursive',
        fontSize: scaleCoords(4),
        fill: '#d6d33e',
    };

    const position = {
        x: canvas.x * .70,
        y: canvas.y * .04,
    };
    
    return (
        <g data-testid={`shotsremaining`}>
            <text style={style} x={position.x} y={position.y}>
                Shots: {Math.max(0, props.shotsRemaining)}
            </text>
        </g>
    );
};

ShotsRemaining.propTypes = {
    shotsRemaining: PropTypes.number.isRequired,
};

export default ShotsRemaining;