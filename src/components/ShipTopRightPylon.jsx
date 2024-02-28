import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class ShipTopLeftPylon extends Component {
    constructor(props) {
        super(props);

        this.basePartName = 'topRightPylon';
        this.rPylonStyle = {
            fill: '#ff0000',
            stroke: 'none',
        };
        this.wPylonStyle = {
            fill: '#ffffff',
            stroke: 'none',
        };

        this.rPylonPath = scaleCoords('4.6073,-4.87435 v -2.56479 l -4.6073,4.87435');
        this.rPlyonXBase = scaleCoords(1.09595);
        this.rPlyonYBase = scaleCoords(7.43461);
        this.wPylonW = scaleCoords(0.78343964);
        this.wPylonH = scaleCoords(4.4767156);
        this.wPylonXBase = scaleCoords(5.19269);
        this.wPylonYBase = scaleCoords(0.00011);
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

ShipTopLeftPylon.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
};

export default ShipTopLeftPylon;
