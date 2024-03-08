import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/canvasFunctions';

class ShipFuselage extends Component {
    constructor(props) {
        super(props);

        this.basePartName = 'shipFuselage';
        this.fusealageStyle = {
            display: 'inline',
            fill: '#ff0000',
            stroke: 'none',
        };
        this.bottomCenterWhiteStyle = {
            display: 'inline',
            fill: '#ffff00',
        };
        this.topCenterWhiteStyle = {
            display: 'inline',
            fill: '#f9f9f9',
        };
        this.topCenterYellowStyle = {
            fill: '#ffff00',
        };
        this.bottomBlockStyle = {
            fill: '#f9f9f9',
        };

        this.fusealagePath = scaleCoords('0.933 v -1.903 h 0.709 v 1.903 h 0.914 v 11.789 h -2.555');
        
        this.shipCenter = scaleCoords(0.890);
        this.shipCenterBlockW = scaleCoords(0.709);
        this.shipCenterBottomWhiteH = scaleCoords(2.798);
        this.shipCenterBottomWhiteY = scaleCoords(7.219);
        this.shipCenterTopWhiteH = scaleCoords(3.451);
        this.shipCenterTopYellowH = scaleCoords(1.809);
        this.shipCenterTopWhiteY = scaleCoords(1.847);
        this.shipCenterTopYellowY = scaleCoords(2.668);
        
        this.bottomBlockW = scaleCoords(0.783);
        this.bottomBlockH = scaleCoords(1.623);
        this.bottomBlockYBase = scaleCoords(10.894);
        this.bottomBlockLeftXBase = scaleCoords(-0.783);
        this.bottomBlockCentXBase = scaleCoords(0.898);
        this.bottomBlockRightXBase = scaleCoords(2.579);        
    }

    render() {       
        const { x:basePositionX } = this.props.position;        
        const { y:basePositionY } = this.props.position;
        return (
            <g id={this.basePartName}>
                <path style={this.fusealageStyle} d={`m ${basePositionX},${basePositionY} h ${this.fusealagePath} z`} id={`${this.basePartName}Body`} />
                <rect style={this.bottomCenterWhiteStyle} id={`${this.basePartName}BottomCenterWhite`} width={this.shipCenterBlockW} height={this.shipCenterBottomWhiteH} x={basePositionX + this.shipCenter} y={basePositionY + this.shipCenterBottomWhiteY} />
                <rect style={this.topCenterWhiteStyle} id={`${this.basePartName}TopCenterWhite`} width={this.shipCenterBlockW} height={this.shipCenterTopWhiteH} x={basePositionX + this.shipCenter} y={basePositionY + this.shipCenterTopWhiteY} />
                <rect style={this.topCenterYellowStyle} id={`${this.basePartName}TopCenterYellow`} width={this.shipCenterBlockW} height={this.shipCenterTopYellowH} x={basePositionX + this.shipCenter} y={basePositionY + this.shipCenterTopYellowY} />
                <rect style={this.bottomBlockStyle} id={`${this.basePartName}BottomLeft`} width={this.bottomBlockW} height={this.bottomBlockH} x={basePositionX + this.bottomBlockLeftXBase} y={basePositionY + this.bottomBlockYBase} />
                <rect style={this.bottomBlockStyle} id={`${this.basePartName}BottomRight`} width={this.bottomBlockW} height={this.bottomBlockH} x={basePositionX + this.bottomBlockRightXBase} y={basePositionY + this.bottomBlockYBase} />
                <rect style={this.bottomBlockStyle} id={`${this.basePartName}BottomCenter`} width={this.bottomBlockW} height={this.bottomBlockH} x={basePositionX + this.bottomBlockCentXBase} y={basePositionY + this.bottomBlockYBase} />
            </g>
        );
    }
};

ShipFuselage.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
};

export default ShipFuselage;
