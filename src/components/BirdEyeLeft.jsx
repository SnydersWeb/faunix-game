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
        
        this.leftEyeX = scaleCoords(-1.38195);
        this.leftEyeY = scaleCoords(5.263792);
        this.leftEyePupilX = scaleCoords(-1.31638);
        this.leftEyePupilY = scaleCoords(5.591604);
        this.leftEyeRad = scaleCoords(1.3768278);
        this.leftEyePupilRad = scaleCoords(0.52450579);
    }

    render() {       
        const basePositionX = this.props.position.x; //108.56032
        const basePositionY = this.props.position.y; //210.49629

        return (
            <g id={`${this.basePartName}${this.id}`}>
                <circle style={this.regEyeWhiteStyle} id={`${this.basePartName}EyeWhite${this.id}`} cx={basePositionX + this.leftEyeX} cy={basePositionY + this.leftEyeY} r={this.leftEyeRad} />
                <circle style={this.regEyePupilStyle} id={`${this.basePartName}EyePupil${this.id}`} cx={basePositionX + this.leftEyePupilX} cy={basePositionY + this.leftEyePupilY} r={this.leftEyePupilRad} />
            </g>
        );
    }
};

BirdEyeLeft.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
};

export default BirdEyeLeft;