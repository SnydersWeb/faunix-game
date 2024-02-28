import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class ShipBottomLeftPylon extends Component {
    constructor(props) {
        super(props);

        this.basePartName = 'bottomLeftPylon';
        this.rPylonStyle = {
            fill: '#ff0000',
            stroke: 'none',
        };
        this.wPylonStyle = {
            fill: '#ffffff',
            stroke: 'none',
        };

        this.rPylonPath = scaleCoords('-0.0279,3.03812 -4.71895,4.89496 v -3.06512');
        this.rPlyonXBase = scaleCoords(0.92374);
        this.rPlyonYBase = scaleCoords(4.58442);
        this.wPylonW = scaleCoords(0.78343964);
        this.wPylonH = scaleCoords(5.3533936);
        this.wPylonXBase = scaleCoords(-4.27065);
        this.wPylonYBase = scaleCoords(7.25469);
    }

    render() {       
        const basePositionX = this.props.position.x; //108.56032
        const basePositionY = this.props.position.y; //210.49629

        return (
            <g id={this.basePartName}>
                <path style={this.rPylonStyle} d={`m ${basePositionX + this.rPlyonXBase},${basePositionY + this.rPlyonYBase} ${this.rPylonPath} z`} id={`${this.basePartName}Red`} />
                <rect style={this.wPylonStyle} id={`${this.basePartName}White`} width={this.wPylonW} height={this.wPylonH} x={basePositionX + this.wPylonXBase} y={basePositionY + this.wPylonYBase} />
            </g>
        );
    }
};

ShipBottomLeftPylon.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
};

export default ShipBottomLeftPylon;