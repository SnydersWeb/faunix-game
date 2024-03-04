import React from 'react';
import { getCanvas } from '../utils/functions';

const StartGame = props => {
    const canvas = getCanvas();
    const textCenterH = canvas.x / 2;
    const instText = {
        textAnchor: 'middle', // center
        x: textCenterH, // center relative to X axis
        y: canvas.y - canvas.y * .30,
        style: {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: 20,
            fill: '#e3e3e3',
        }
    };
    
    const instTextSpacing = canvas.x / 20;

    const text = {
        textAnchor: 'middle', // center
        x: textCenterH, // center relative to X axis
        y: canvas.y - canvas.y * .15,
        style: {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: 20,
            fill: '#FC0',
        }
    };

    return (
        <g filter='url(#shadow)'>
            <text {...instText}>
                <tspan x={textCenterH} dx={0}>A or ⬅️ moves left</tspan>
                <tspan x={textCenterH} dx={0} dy={instTextSpacing}>D or ➡️ moves right</tspan>
                <tspan x={textCenterH} dx={0} dy={instTextSpacing}>Space fires!</tspan>                
            </text>
            <text {...text}>                
                Press Space Bar to Start!
            </text>
        </g>
    );
};

export default StartGame;