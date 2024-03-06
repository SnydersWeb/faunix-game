import React, { Component } from 'react';
import { scaleCoords, getCanvas, getRandomInt } from '../utils/functions';
import { backGroundLgStarVelocity, backGroundMdStarVelocity, backGroundSmStarVelocity, backGroundNumLgStars, backGroundNumMdStars, backGroundNumSmStars, backGroundTimeSec } from '../utils/constants';

class ScrollingBackground extends Component {
    constructor(props) {
        super(props);
        
        this.bgStyle = {
            fill: '#000'
        };        
        this.starStyle = {
            display: 'inline',
            fill: '#0066FF',
        };
        this.starPath = scaleCoords('-0.261,4.074 -4.066,0.358 4.074,0.261 0.358,4.067 0.261,-4.074 4.066,-0.358 -4.074,-0.261 z');
                        
        this.mdStarStyle = {
            display: 'inline',
            fill: '#0044AA',
        };
        this.mdCircleStarR = scaleCoords(0.751);

        this.smStarStyle = {
            display: 'inline',
            fill: '#0044AA',
        };
        this.smCircleStarR = scaleCoords(0.25);

        this.canvasSize = getCanvas();
        //Initialize our stars
        this.aryLgStars = [];
        for (let i = 0, j = backGroundNumLgStars; i < j; i++) {
            this.aryLgStars.push({
                x: getRandomInt(0, this.canvasSize.x),
                y: getRandomInt(0, this.canvasSize.y)
            });
        }
        this.aryMdStars = [];
        for (let i = 0, j = backGroundNumMdStars; i < j; i++) {
            this.aryMdStars.push({
                x: getRandomInt(0, this.canvasSize.x),
                y: getRandomInt(0, this.canvasSize.y)
            });
        }
        this.arySmStars = [];
        for (let i = 0, j = backGroundNumSmStars; i < j; i++) {
            this.arySmStars.push({
                x: getRandomInt(0, this.canvasSize.x),
                y: getRandomInt(0, this.canvasSize.y)
            });
        }

        this.moveStars = (aryStars, moveFactor, playField) => {
            return aryStars.map(pos => {
                let retVal = pos.y += moveFactor;
                if (retVal > playField) {
                    retVal = retVal - playField;
                }
                return {
                    ...pos,
                    y: retVal,
                }
            });
        }
        
        // Handle background stuffs
        this.smStarMove = scaleCoords(backGroundSmStarVelocity);
        this.mdStarMove = scaleCoords(backGroundMdStarVelocity);
        this.lgStarMove = scaleCoords(backGroundLgStarVelocity);
        this.timeStamp = 0;        
    }

    render() {     
        const now = (new Date()).getTime();
        if (now - this.timeStamp > (1000 * backGroundTimeSec)) {
            this.arySmStars = this.moveStars(this.arySmStars, this.smStarMove, this.canvasSize.y);
            this.aryMdStars = this.moveStars(this.aryMdStars, this.mdStarMove, this.canvasSize.y);
            this.aryLgStars = this.moveStars(this.aryLgStars, this.lgStarMove, this.canvasSize.y);
    
            this.timeStamp = now;
        }

        return (
            <g id="starryBackGround">
                <rect width={this.width} height={this.height} x={0} y={0} style={this.bgStyle} />

                { this.aryLgStars.map((starCoords, index) => (
                    <path d={`m ${starCoords.x},${starCoords.y} ${this.starPath}`} style={this.starStyle} key={`pointStar${index}`} id={`pointStar${index}`} />
                ))}

                { this.aryMdStars.map((starCoords, index) => (
                    <circle cx={starCoords.x} cy={starCoords.y} r={this.mdCircleStarR} style={this.mdStarStyle} key={`mdStar${index}`} id={`mdStar${index}`} />
                ))}

                { this.arySmStars.map((starCoords, index) => (
                    <circle cx={starCoords.x} cy={starCoords.y} r={this.smCircleStarR} style={this.smStarStyle} key={`smStar${index}`} id={`smStar${index}`} />
                ))}
            </g>
        );
    }
};

export default ScrollingBackground;