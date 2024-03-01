import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class BirdEyeLeftBig extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdEyeLeftBig';
        
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

        this.leftBigEyeX = scaleCoords(-3.16244);
        this.leftBigEyeY = scaleCoords(4.041425);
        this.leftBigEyePupilX = scaleCoords(-1.97101);
        this.leftBigEyePupilY = scaleCoords(5.62377);
        this.leftBigEyeRad = scaleCoords(3.0978625);
        this.leftBigEyePupilRad = scaleCoords(1.180138);
    }

    render() {       
        const basePositionX = this.props.position.x; //108.56032
        const basePositionY = this.props.position.y; //210.49629

        return (
            <g id={`${this.basePartName}${this.id}`} style={this.hiddenStyle}>
                <circle style={this.bigEyeWhiteStyle} id={`${this.basePartName}EyeWhite${this.id}`} cx={basePositionX + this.leftBigEyeX} cy={basePositionY + this.leftBigEyeY} r={this.leftBigEyeRad} />
                <circle style={this.bigEyePupilStyle} id={`${this.basePartName}EyePupil${this.id}`} cx={basePositionX + this.leftBigEyePupilX} cy={basePositionY + this.leftBigEyePupilY} r={this.leftBigEyePupilRad} />
            </g>
        );
    }
};

BirdEyeLeftBig.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
};

export default BirdEyeLeftBig;