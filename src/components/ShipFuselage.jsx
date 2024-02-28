import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class ShipFuselage extends Component {
    constructor(props) {
        super(props);

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

        this.fusealagePath = scaleCoords('0.93265 v -1.90261 h 0.70882 v 1.90261 h 0.914 v 11.78868 h -2.55547');
        
        this.shipCenter = scaleCoords(0.93265);
        this.shipCenterBlockW = scaleCoords(0.70881999);
        this.shipCenterBottomWhiteH = scaleCoords(2.7979465);
        this.shipCenterBottomWhiteY = scaleCoords(7.21913);
        this.shipCenterTopWhiteH = scaleCoords(3.4508007);
        this.shipCenterTopYellowH = scaleCoords(1.8093387);
        this.shipCenterTopWhiteY = scaleCoords(1.84708);
        this.shipCenterTopYellowY = scaleCoords(2.6678);
        
        this.bottomBlockW = scaleCoords(0.78341788);
        this.bottomBlockH = scaleCoords(1.6228091);
        this.bottomBlockYBase = scaleCoords(10.89377);
        this.bottomBlockLeftXBase = scaleCoords(-0.78342);
        this.bottomBlockCentXBase = scaleCoords(0.89796);
        this.bottomBlockRightXBase = scaleCoords(2.57934);        
    }

    render() {       
        const basePositionX = this.props.position.x; //108.56032
        const basePositionY = this.props.position.y; //210.49629

        return (
            <g id={this.basePartName}>
                <path style={this.fusealageStyle} d={`m ${basePositionX},${basePositionY} h ${this.fusealagePath} z`} id="fusealage" />
                <rect style={this.bottomCenterWhiteStyle} id="bottomCenterWhite" width={this.shipCenterBlockW} height={this.shipCenterBottomWhiteH} x={basePositionX + this.shipCenter} y={basePositionY + this.shipCenterBottomWhiteY} />
                <rect style={this.topCenterWhiteStyle} id="topCenterWhite" width={this.shipCenterBlockW} height={this.shipCenterTopWhiteH} x={basePositionX + this.shipCenter} y={basePositionY + this.shipCenterTopWhiteY} />
                <rect style={this.topCenterYellowStyle} id="topCenterYellow" width={this.shipCenterBlockW} height={this.shipCenterTopYellowH} x={basePositionX + this.shipCenter} y={basePositionY + this.shipCenterTopYellowY} />
                <rect style={this.bottomBlockStyle} id="bottomLeft" width={this.bottomBlockW} height={this.bottomBlockH} x={basePositionX + this.bottomBlockLeftXBase} y={basePositionY + this.bottomBlockYBase} />
                <rect style={this.bottomBlockStyle} id="bottomRight" width={this.bottomBlockW} height={this.bottomBlockH} x={basePositionX + this.bottomBlockRightXBase} y={basePositionY + this.bottomBlockYBase} />
                <rect style={this.bottomBlockStyle} id="bottomCenter" width={this.bottomBlockW} height={this.bottomBlockH} x={basePositionX + this.bottomBlockCentXBase} y={basePositionY + this.bottomBlockYBase} />
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
