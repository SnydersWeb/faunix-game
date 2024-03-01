import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

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
        this.starPath = scaleCoords('-0.26148,4.07365 -4.066423,0.35761 4.073653,0.26148 0.3576,4.06642 0.26148,-4.07366 4.06642,-0.3576 -4.07365,-0.26148 z');
                        
        this.mdStarStyle = {
            display: 'inline',
            fill: '#0044AA',
        };
        this.mdCircleStarR = scaleCoords(0.75077206);

        this.smStarStyle = {
            display: 'inline',
            fill: '#0044AA',
        };
        this.smCircleStarR = scaleCoords(0.25);
    }

    render() {     
        const { lgStarsPos } = this.props;
        const { mdStarsPos } = this.props;
        const { smStarsPos } = this.props;
        return (
            <g id="starryBackGround">
                <rect width={this.width} height={this.height} x={0} y={0} style={this.bgStyle} />

                { lgStarsPos.map((starCoords, index) => (
                    <path d={`m ${starCoords.x},${starCoords.y} ${this.starPath}`} style={this.starStyle} key={`pointStar${index}`} id={`pointStar${index}`} />
                ))}

                { mdStarsPos.map((starCoords, index) => (
                    <circle cx={starCoords.x} cy={starCoords.y} r={this.mdCircleStarR} style={this.mdStarStyle} key={`mdStar${index}`} id={`mdStar${index}`} />
                ))}

                { smStarsPos.map((starCoords, index) => (
                    <circle cx={starCoords.x} cy={starCoords.y} r={this.smCircleStarR} style={this.smStarStyle} key={`smStar${index}`} id={`smStar${index}`} />
                ))}
            </g>
        );
    }
};

ScrollingBackground.propTypes = {
    lgStarsPos: PropTypes.arrayOf(PropTypes.shape({
            x:  PropTypes.number.isRequired,
            y:  PropTypes.number.isRequired
        }).isRequired,
    ).isRequired,
    mdStarsPos: PropTypes.arrayOf(PropTypes.shape({
            x:  PropTypes.number.isRequired,
            y:  PropTypes.number.isRequired
        }).isRequired,
    ).isRequired,
    smStarsPos: PropTypes.arrayOf(PropTypes.shape({
            x:  PropTypes.number.isRequired,
            y:  PropTypes.number.isRequired
        }).isRequired,
    ).isRequired,   
};

export default ScrollingBackground;