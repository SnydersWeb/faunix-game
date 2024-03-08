import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/canvasFunctions';

class BirdBeak extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdBeak';
        this.beakBaseStyle = {
            fill: '#000000',
            stroke: 'none',
            opacity: 1,
        };
        this.beakStyle = {
            fill: '#ffcc00',
            stroke: 'none',
            opacity: 1,
        };

        this.beakBaseX = scaleCoords(-0.005);
        this.beakBaseY = scaleCoords(9.134);
        this.beakBaseRadX = scaleCoords(1.803);
        this.beakBaseRadY = scaleCoords(2.105);
        this.beakUpperX = scaleCoords(0.028);
        this.beakUpperY = scaleCoords(6.706);
        this.beakUpperPath = scaleCoords('c 1.049,.032 1.737,1.082 1.737,2 0,.917 -1.015,-1.125 -1.803,.557 -.624,-1.695 -1.737,.328 -1.737,-.492 0,-.95 .688,-2.098 1.803,-2.065');
        this.beakLowerX = scaleCoords(1.601);
        this.beakLowerY = scaleCoords(10.214);
        this.beakLowerPath = scaleCoords('c .387,-1.315 -.426,.065 -1.606,.065 -1.18,0 -1.97,-1.362 -1.64,-.164 .103,.476 .524,1.248 1.64,1.246 1.022,-.002 1.606,-1.148 1.606,-1.148');
    }

    render() {       
        const { x, y } = this.props.position;
        const { beakWiggle } = this.props;
        
        return (
            <g id={`${this.basePartName}${this.id}`} data-testid={`${this.basePartName}`}>
                <ellipse style={this.beakBaseStyle} id={`${this.basePartName}Base${this.id}`} cx={x + this.beakBaseX} cy={y + this.beakBaseY} rx={this.beakBaseRadX} ry={this.beakBaseRadY} />
                <path style={this.beakStyle} d={`m ${x + this.beakUpperX},${y + this.beakUpperY - beakWiggle} ${this.beakUpperPath} z`} id={`${this.basePartName}Upper${this.id}`} />
                <path style={this.beakStyle} d={`m ${x + this.beakLowerX},${y + this.beakLowerY + beakWiggle} ${this.beakLowerPath} z`} id={`${this.basePartName}Lower${this.id}`} />
            </g>
        );
    }
};

BirdBeak.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    beakWiggle: PropTypes.number,
    id: PropTypes.number.isRequired,
};

BirdBeak.defaultProps = {
    beakWiggle: 0,
};


export default BirdBeak;