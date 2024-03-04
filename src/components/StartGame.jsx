import React from 'react';
import { getCanvas } from '../utils/functions';

const StartGame = props => {
    const canvas = getCanvas();
      
    const text = {
        textAnchor: 'middle', // center
        x: canvas.x / 2, // center relative to X axis
        y: canvas.y / 2,
        style: {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: 60,
            fill: '#e3e3e3',
            cursor: 'pointer',
        }
    };

    return (
        <g filter='url(#shadow)'>
            <rect {...button} />
            <text {...text}>
                Press Space Bar to Start!
            </text>
        </g>
    );
};

export default StartGame;