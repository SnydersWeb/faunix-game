import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class ShipBottomRightPylon extends Component {
    constructor(props) {
        super(props);

        this.basePartName = 'bottomRightPylon';
        this.rPylonStyle = {
            fill: '#ff0000',
            stroke: 'none',
        };
        this.wPylonStyle = {
            fill: '#ffffff',
            stroke: 'none',
        };

        this.rPylonPath = scaleCoords('4.71895,5.06973 v -3.09395 l -4.71895,-4.65105');
        this.rPlyonXBase = scaleCoords(1.70786);
        this.rPlyonYBase = scaleCoords(7.45626);
        this.wPylonW = scaleCoords(0.78343964);
        this.wPylonH = scaleCoords(5.3534088);
        this.wPylonXBase = scaleCoords(5.95859);
        this.wPylonYBase = scaleCoords(7.25467);
    }

    render() {       
        const basePositionX = this.props.position.x;        const basePositionY = this.props.position.y;
        return (
            <g id={this.basePartName}>
                <path style={this.rPylonStyle} d={`m ${basePositionX + this.rPlyonXBase},${basePositionY + this.rPlyonYBase} ${this.rPylonPath} z`} id={`${this.basePartName}Red`} />
                <rect style={this.wPylonStyle} id={`${this.basePartName}White`} width={this.wPylonW} height={this.wPylonH} x={basePositionX + this.wPylonXBase} y={basePositionY + this.wPylonYBase} />
            </g>
        );
    }
};

ShipBottomRightPylon.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
};

export default ShipBottomRightPylon;