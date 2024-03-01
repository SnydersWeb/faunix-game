import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class BirdEyeRightBig extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdEyeRightBig';
        
        this.hiddenStyle = {
            display: 'none',
        };
        this.bigEyeWhiteStyle = {
            fill: '#f4d7d7',
            stroke: 'none',
            opacity: 1,
        };
        this.bigEyePupilStyle = {
            fill: '#000000',
            stroke: 'none',
            opacity: 1,
        };

        this.rightBigEyeX = scaleCoords(3.26322);
        this.rightBigEyeY = scaleCoords(4.041425);
        this.rightBigEyePupilX = scaleCoords(2.10642);
        this.rightBigEyePupilY = scaleCoords(5.62377);
        this.rightBigEyeRad = scaleCoords(3.0978625);
        this.rightBigEyePupilRad = scaleCoords(1.180138);
    }

    render() {       
        const basePositionX = this.props.position.x; //108.56032
        const basePositionY = this.props.position.y; //210.49629

        return (
            <g id={`${this.basePartName}${this.id}`} style={this.hiddenStyle}>
                <circle style={this.bigEyeWhiteStyle} id={`${this.basePartName}EyeWhite${this.id}`} cx={basePositionX + this.rightBigEyeX} cy={basePositionY + this.rightBigEyeY} r={this.rightBigEyeRad} />
                <circle style={this.bigEyePupilStyle} id={`${this.basePartName}EyePupil${this.id}`} cx={basePositionX + this.rightBigEyePupilX} cy={basePositionY + this.rightBigEyePupilY} r={this.rightBigEyePupilRad} />
            </g>
        );
    }
};
    
BirdEyeRightBig.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
};

export default BirdEyeRightBig;