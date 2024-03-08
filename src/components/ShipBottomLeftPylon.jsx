import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/canvasFunctions';

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

        this.rPylonPath = scaleCoords('-0.028,3.038 -4.719,4.895 v -3.065');
        this.rPlyonXBase = scaleCoords(0.924);
        this.rPlyonYBase = scaleCoords(4.584);
        this.wPylonW = scaleCoords(0.783);
        this.wPylonH = scaleCoords(5.353);
        this.wPylonXBase = scaleCoords(-4.270);
        this.wPylonYBase = scaleCoords(7.255);
    }

    render() {       
        const { x:basePositionX } = this.props.position;        
        const { y:basePositionY } = this.props.position;
        return (
            <g id={this.basePartName} data-testid={`${this.basePartName}`}>
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