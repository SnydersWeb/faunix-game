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
        
    const scores = [
        {
            min: 0,
            max: 1,
            comment: `Are you trying to miss them?`,
        },
        {
            min: 1,
            max: 10,
            comment: `You hit a few at least`,
        },
        {
            min: 10,
            max: 20,
            comment: `Nice try!`,
        },
        {
            min: 20,
            max: 30,
            comment: `You did OK`,
        },
        {
            min: 30,
            max: 40,
            comment: `Solid!`,
        },
        {
            min: 40,
            max: 50,
            comment: `Good!`,
        },
        {
            min: 50,
            max: 60,
            comment: `Very Good!`,
        },
        {
            min: 60,
            max: 70,
            comment: `Great!`,
        },
        {
            min: 70,
            max: 80,
            comment: `Amazing!`,
        },
        {
            min: 80,
            max: 90,
            comment: `Incredible!`,
        },
        {
            min: 90,
            max: 100,
            comment: `Wow!!`,
        },
        {
            min: 100,
            max: 101,
            comment: `Go touch some grass!!!`,
        },
    ];

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
        const accuracyStr = `${Math.round(accuracy)}% Accuracy `;
        const accuracyScore = scores.filter(score => (accuracy >= score.min && accuracy < score.max));
        const accuracyComment = accuracyScore[0].comment;
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