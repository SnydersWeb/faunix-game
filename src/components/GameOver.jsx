import React from 'react';
import PropTypes from 'prop-types';
import { getCanvas, scaleCoords } from '../utils/canvasFunctions';
import { startShotCount } from '../utils/constants';

const GameOver = props => {
    const canvas = getCanvas();
    const { score } = props;
    const { highScore } = props;
    const { startTime } = props;
    const { endTime } = props;
    const timeTakenRaw = endTime - startTime;

    const textCenterH = canvas.x / 2;

    const gameOverText = {
        textAnchor: 'middle', // center
        x: textCenterH, // center relative to X axis
        y: canvas.y * .36,
        style: {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: scaleCoords(6),
            fill: '#FC0',
        },
    };

    const resultText = {
        textAnchor: 'middle', // center
        x: textCenterH, // center relative to X axis
        y: canvas.y * .43,
        style: {
            fontFamily: '"Press Start 2P", cursive',
            fontSize: scaleCoords(4),
            fill: '#e3e3e3',
        }
    };
    
    const instTextSpacing = canvas.y / 32;
        
    // Generate results text
    let resultsData = [];
    if (score >= highScore) { 
        resultsData.push(
            <tspan x={textCenterH} dx={0} dy={resultsData.length === 0 ? 0 : instTextSpacing}>You beat the High Score!</tspan>
        );
    }
    if (timeTakenRaw > 0) { // game was played, give grade
        const timeTakenSecRaw = timeTakenRaw/1000; //1000 ms * 60 sec
        const timeTakenMin = Math.trunc(timeTakenSecRaw / 60);
        const timeTakenSec = Math.trunc(timeTakenSecRaw - (timeTakenMin * 60));
        let timeTakenSecDisp = timeTakenSec.toString();
        if (timeTakenSecDisp.length === 1) {
            timeTakenSecDisp = `0${timeTakenSec}`;
        }
        const accuracy = (score/startShotCount) * 100;
        const accuracyStr = `${accuracy.toFixed(0)}% Accuracy `;
        let accuracyComment = ``;
        if (accuracy === 0) {
            accuracyComment = `Are you trying to miss them?`;
        } else if (accuracy >= 10 && accuracy < 20) {
            accuracyComment = `Nice try!`;
        } else if (accuracy >= 20 && accuracy < 30) {
            accuracyComment = `You did OK`;
        } else if (accuracy >= 30 && accuracy < 40) {
            accuracyComment = `Solid!`;
        } else if (accuracy >= 40 && accuracy < 50) {
            accuracyComment = `Good!`;
        } else if (accuracy >= 50 && accuracy < 60) {
            accuracyComment = `Very Good!`;
        } else if (accuracy >= 60 && accuracy < 70) {
            accuracyComment = `Great!`;
        } else if (accuracy >= 70 && accuracy < 80) {
            accuracyComment = `Amazing!`; 
        } else if (accuracy >= 80 && accuracy < 90) {
            accuracyComment = `Incredible!`;
        } else if (accuracy >= 90 && accuracy < 100) {
            accuracyComment = `Wow!!`;
        } else if (accuracy === 100) {
            accuracyComment = `Go touch some grass!!!`;
        }
        resultsData.push(
            <tspan 
                x={textCenterH} 
                dx={0} 
                dy={resultsData.length === 0 ? 0 : instTextSpacing}
                key={`${accuracyStr}${accuracyComment}comment`}
            >
                {accuracyStr} - {accuracyComment}
            </tspan>
        );
        resultsData.push(
            <tspan 
                x={textCenterH} 
                dx={0} 
                dy={resultsData.length === 0 ? 0 : instTextSpacing}
                key={`${timeTakenMin}${timeTakenSecDisp}time`}
            >
                Time: {timeTakenMin}:{timeTakenSecDisp}
            </tspan>
        );
    }
   
    return (
        <g data-testid={`gameover`}>
            <g>
                <text {...gameOverText} key={`textGameOverText`}>                
                    Game Over
                </text>
            </g>
            {
                timeTakenRaw > 0 &&
                <text {...resultText} key={`reportGameOver`}>
                    {resultsData}               
                </text>
            }
            
        </g>
    );
};

GameOver.propTypes = {
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    highScore: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
};

export default GameOver;