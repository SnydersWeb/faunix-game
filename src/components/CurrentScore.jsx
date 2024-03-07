import React from 'react';
import PropTypes from 'prop-types';
import { getCanvas, scaleCoords } from '../utils/canvasFunctions';
import BirdBody from './BirdBody';
import BirdEyeLeftBig from './BirdEyeLeftBig';
import BirdEyeRightBig from './BirdEyeRightBig';
import BirdBeakBig from './BirdBeakBig';

const CurrentScore = (props) => {
    const canvas = getCanvas();
    
    const id = 100;
    const scoreStyle = {
        fontFamily: '"Press Start 2P", cursive',
        fontSize: scaleCoords(4),
        fill: '#d6d33e',
    };

    const position = {
        x: canvas.x * .15,
        y: canvas.y * .015,
    };

    const birdStyle = {
        opacity: 1,
        transformOrigin: `${position.x}px ${position.y}px`,
    };

    const transform = `scale(.5)`;
    
    
    return (
        <g>
            <g style={birdStyle} transform={`${transform}`}>
                <BirdBody position={position} id={id} />
                <BirdEyeLeftBig position={position} id={id} />
                <BirdEyeRightBig position={position} id={id} />
                <BirdBeakBig position={position} id={id} />
            </g>
            <text style={scoreStyle} x={position.x + 20} y={canvas.y * .04}>
                :{props.score}
            </text>
        </g>
    );
};

CurrentScore.propTypes = {
    score: PropTypes.number.isRequired,
};

export default CurrentScore;