import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class BirdEyeRight extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdEyeRight';
        
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

        this.rightEyeX = scaleCoords(1.3975);
        this.rightEyeY = scaleCoords(5.22463);
        this.rightEyePupilX = scaleCoords(1.46307);
        this.rightEyePupilY = scaleCoords(5.552442);
        this.rightEyeRad = scaleCoords(1.3768278);
        this.rightEyePupilRad = scaleCoords(0.52450579);
    }

    render() {       
        const basePositionX = this.props.position.x; //108.56032
        const basePositionY = this.props.position.y; //210.49629

        return (
            <g id={`${this.basePartName}${this.id}`}>
                <circle style={this.regEyeWhiteStyle} id={`${this.basePartName}EyeWhite${this.id}`} cx={basePositionX + this.rightEyeX} cy={basePositionY + this.rightEyeY} r={this.rightEyeRad} />
                <circle style={this.regEyePupilStyle} id={`${this.basePartName}EyePupil${this.id}`} cx={basePositionX + this.rightEyePupilX} cy={basePositionY + this.rightEyePupilY} r={this.rightEyePupilRad} />
            </g>
        );
    }
};

BirdEyeRight.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
};

export default BirdEyeRight;