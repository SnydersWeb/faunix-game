import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/canvasFunctions';

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

        this.rPylonPath = scaleCoords('4.719,5.07 v -3.094 l -4.719,-4.651');
        this.rPlyonXBase = scaleCoords(1.708);
        this.rPlyonYBase = scaleCoords(7.456);
        this.wPylonW = scaleCoords(0.783);
        this.wPylonH = scaleCoords(5.353);
        this.wPylonXBase = scaleCoords(5.959);
        this.wPylonYBase = scaleCoords(7.255);
    }

    render() {       
        const { x:basePositionX } = this.props.position;        
        const { y:basePositionY } = this.props.position;
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