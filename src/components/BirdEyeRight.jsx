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
        const { x, y } = this.props.position;        
        const { pupilWiggle } = this.props;
        
        return (
            <g id={`${this.basePartName}${this.id}`}>
                <circle style={this.regEyeWhiteStyle} id={`${this.basePartName}EyeWhite${this.id}`} cx={x + this.rightEyeX} cy={y + this.rightEyeY} r={this.rightEyeRad} />
                <circle style={this.regEyePupilStyle} id={`${this.basePartName}EyePupil${this.id}`} cx={x + this.rightEyePupilX + pupilWiggle} cy={y + this.rightEyePupilY} r={this.rightEyePupilRad} />
            </g>
        );
    }
};

BirdEyeRight.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    pupilWiggle: PropTypes.number,
    id: PropTypes.number.isRequired,
};

BirdEyeRight.defaultProps = {
    pupilWiggle: 0,
};

export default BirdEyeRight;