import React from 'react';
import PropTypes from 'prop-types';
import { getCanvas, scaleCoords } from '../utils/canvasFunctions';

const MobileControl = props => {
    const canvas = getCanvas();
    const { controlType } = props;
    const buttonWidth = scaleCoords(20);
    const buttonHeight = scaleCoords(12);
    
    let xPos = 0;
    let yPos = canvas.y - scaleCoords(12);
    let xPosBtnAdj = scaleCoords(8);
    let btnText = "<<";
    if (/fire/.test(controlType)) {
        xPos = (canvas.x / 2) - (buttonWidth / 2);
        xPosBtnAdj = scaleCoords(9.3);
        btnText = "Fire";
    } else if (/right/.test(controlType)) {
        xPos = canvas.x - buttonWidth;
        xPosBtnAdj = scaleCoords(11);
        btnText = ">>";
    }
    const button = {
        x: xPos, 
        y: yPos, 
        width: buttonWidth,
        height: buttonHeight,
        rx: scaleCoords(5), // border radius
        ry: scaleCoords(5), // border radius
        style: {
            fill: '#FC0',
            cursor: 'pointer',
        },
        onTouchStart: props.onTouchStart,
        onTouchEnd: props.onTouchEnd,
    };

    const text = {
        textAnchor: 'middle', // center
        x: xPos + xPosBtnAdj,
        y: yPos + scaleCoords(8),
        style: {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: scaleCoords(4),
            fill: '#000',
            cursor: 'pointer',
        },
        onTouchStart: props.onTouchStart,
        onTouchEnd: props.onTouchEnd,
    };

    return (
        <g data-testid={`mobilectrol${controlType}`}>
            <rect {...button} />
            <text {...text}>
                {btnText}
            </text>
        </g>
    );
};

MobileControl.propTypes = {
    controlType: PropTypes.oneOf(['left', 'right', 'fire']).isRequired,
    onTouchStart: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func,
};

export default MobileControl;