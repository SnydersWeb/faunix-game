import React from 'react';
import PropTypes from 'prop-types';
import { getCanvas, scaleCoords } from '../utils/canvasFunctions';

const MobileControl = props => {
    const canvas = getCanvas();
    const { innerHeight } = window;
    const { controlType } = props;
    const buttonWidth = scaleCoords(40);
    let buttonHeight = scaleCoords(30);
    
    let xPos = 0;
    let yTextPos = scaleCoords(19);
    let yPos = canvas.y - scaleCoords(16);
    let xPosBtnAdj = scaleCoords(20);

    // SnyderD - it's OK if the buttons bleed beyond the canvas, but not if they go off displayable area!
    if (yPos + buttonHeight > innerHeight) {
        buttonHeight = scaleCoords(14);
        yTextPos = scaleCoords(12);
    }

    let btnText = "<<";
    let btnFill = "#FC0";
    let btnTextFill = "#000";
    if (/fire/.test(controlType)) {
        xPos = (canvas.x / 2) - (buttonWidth / 2);
        xPosBtnAdj = scaleCoords(20);
        btnText = "Fire";
        btnFill = "#F00";
        btnTextFill = "#FFF";    
    } else if (/right/.test(controlType)) {
        xPos = canvas.x - buttonWidth;
        xPosBtnAdj = scaleCoords(20);
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
            fill: btnFill,
            cursor: 'pointer',
        },
        onTouchStart: props.onTouchStart,
    };

    const text = {
        textAnchor: 'middle', // center
        x: xPos + xPosBtnAdj,
        y: yPos + yTextPos,
        style: {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: scaleCoords(8),
            fill: btnTextFill,
            cursor: 'pointer',
        },
        onTouchStart: props.onTouchStart,
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
};

export default MobileControl;