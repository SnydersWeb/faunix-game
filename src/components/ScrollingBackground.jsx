import React, { Component } from 'react';
import { scaleCoords, getCanvas } from '../utils/functions';

class ScrollingBackground extends Component {
    constructor(props) {
        super(props);
        
        const getRandomInt = (min, max) => {
            const minCeiled = Math.ceil(min);
            const maxFloored = Math.floor(max);
            return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
        };

        const canvasSize = getCanvas();
        
        this.aryRandomPathStars = [];
        for(let i = 0, j = 25; i < j; i++) {
            this.aryRandomPathStars.push({
                x: getRandomInt(0, canvasSize.x),
                y: getRandomInt(0, canvasSize.y)
            });
        }
        this.aryRandomCircleStars = [];
        for(let i = 0, j = 50; i < j; i++) {
            this.aryRandomCircleStars.push({
                x: getRandomInt(0, canvasSize.x),
                y: getRandomInt(0, canvasSize.y)
            });
        }

    }

    render() {
        const bgStyle = {
            fill: '#000'
        };        
        const starStyle = {
            display: 'inline',
            fill: '#0004d6',
        };
        const starPath = scaleCoords('-0.26148,4.07365 -4.066423,0.35761 4.073653,0.26148 0.3576,4.06642 0.26148,-4.07366 4.06642,-0.3576 -4.07365,-0.26148 z');
                        
        const circleStarStyle = {
            display: 'inline',
            fill: '#0004d6',
        };
        const circleStarR = scaleCoords(0.75077206);

        return (
            <g id="starryBackGround">
                <rect width={this.width} height={this.height} x={0} y={0} style={bgStyle} />
                { this.aryRandomPathStars.map((starCoords, index) => (
                    <path d={`m ${starCoords.x},${starCoords.y} ${starPath}`} style={starStyle} key={`pointStar${index}`} id={`pointStar${index}`} />
                ))}

                { this.aryRandomCircleStars.map((starCoords, index) => (
                    <circle cx={starCoords.x} cy={starCoords.y} r={circleStarR} style={circleStarStyle} key={`circleStar${index}`} id={`circleStar${index}`} />
                ))}
            </g>
        );
    }
};

export default ScrollingBackground;