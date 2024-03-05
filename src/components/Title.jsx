import React from 'react';
import { getCanvas, scaleCoords } from '../utils/functions';

const Title = () => {
    const canvas = getCanvas();
    const backgroundSmokeOutStyle = {
        fill: '#000',
        stroke: 'none',
        strokeWidth: 'none',
        opacity: .7,
    };

    const textStyle = {
        textAnchor: 'middle', // center
        x: canvas.x / 2, // center relative to X axis
        y: canvas.y / 4,
        style: {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: scaleCoords(20),
            fill: '#F00',
            filter: 'url(#shadow)',
        }
    };
    const textStyle2 = {
        textAnchor: 'middle', // center
        x: canvas.x / 2, // center relative to X axis
        y: (canvas.y / 4) + canvas.y / 25,
        style: {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: scaleCoords(2),
            fill: '#F00',
        }
    };
    
    return (
        <g>
            <defs>
                <filter id='shadow'>
                    <feDropShadow dx='1' dy='1' stdDeviation='2' floodColor="#FC0" />
                </filter>
            </defs>
            <rect 
                style={backgroundSmokeOutStyle} 
                key="titleSmokeOut"
                id="titleSmokeOut"
                width={canvas.x} 
                height={canvas.y} 
                x={0} 
                y={0} 
            />                    
            <text {...textStyle}>
                Fauxnix
            </text>
            <text {...textStyle2}>
                (definintely NOT Phoenix)
            </text>
        </g>
    );
};

export default Title;