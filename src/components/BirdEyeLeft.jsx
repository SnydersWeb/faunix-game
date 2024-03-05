import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class BirdEyeLeft extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdEyeLeft';
        
        this.regEyeWhiteStyle = {
            fill: '#ffffff',
            stroke: 'none',
            opacity: 1,
        };
        this.regEyePupilStyle = {
            fill: '#000000',
            stroke: 'none',
            opacity: 1,
        };
        
        this.leftEyeX = scaleCoords(-1.382);
        this.leftEyeY = scaleCoords(5.264);
        this.leftEyePupilX = scaleCoords(-1.316);
        this.leftEyePupilY = scaleCoords(5.592);
        this.leftEyeRad = scaleCoords(1.377);
        this.leftEyePupilRad = scaleCoords(0.525);
    }

    render() {       
        const { x, y } = this.props.position;        
        const { pupilWiggle } = this.props;
        
        return (
            <g id={`${this.basePartName}${this.id}`}>
                <circle style={this.regEyeWhiteStyle} id={`${this.basePartName}EyeWhite${this.id}`} cx={x + this.leftEyeX} cy={y + this.leftEyeY} r={this.leftEyeRad} />
                <circle style={this.regEyePupilStyle} id={`${this.basePartName}EyePupil${this.id}`} cx={x + this.leftEyePupilX + pupilWiggle} cy={y + this.leftEyePupilY} r={this.leftEyePupilRad} />
            </g>
        );
    }
};

BirdEyeLeft.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    pupilWiggle: PropTypes.number,
    id: PropTypes.number.isRequired,
};

BirdEyeLeft.defaultProps = {
    pupilWiggle: 0,
};

export default BirdEyeLeft;