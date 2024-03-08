import React from 'react';
import PropTypes from 'prop-types';
import { getCanvas, scaleCoords } from '../utils/canvasFunctions';

const HighScore = (props) => {
    const canvas = getCanvas();
    
    const scoreStyle = {
        fontFamily: '"Press Start 2P", cursive',
        fontSize: scaleCoords(4),
        fill: '#d6d33e',
    };

    const position = {
        x: canvas.x * .325,
        y: canvas.y * .015,
    };
    
    return (
        <text style={scoreStyle} x={position.x} y={canvas.y * .04} data-testid={`highscore`}>
            High Score:{props.highScore}
        </text>
    );
};

HighScore.propTypes = {
    highScore: PropTypes.number.isRequired,
};

export default HighScore;