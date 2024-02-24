import React from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

const ShipBottomRightPylon = props => {
    const basePositionX = props.position.x; //108.56032
    const basePositionY = props.position.y; //210.49629
    
    const redPylonStyle = {
        fill: '#ff0000',
        stroke: 'none',
    };
    const whitePylonStyle = {
        fill: '#ffffff',
        stroke: 'none',
    };

    return (
        <g id="bottomRightPylon">
            <path style={redPylonStyle} d={`m ${basePositionX + Number(scaleCoords(1.70786))},${basePositionY + Number(scaleCoords(7.45626))} ${scaleCoords('4.71895,5.06973 v -3.09395 l -4.71895,-4.65105')} z`} id="bottomRightPylonRed" />
            <rect style={whitePylonStyle} id="bottomRightPylonWhite" width={scaleCoords(0.78343964)} height={scaleCoords(5.3534088)} x={basePositionX + Number(scaleCoords(5.95859))} y={basePositionY + Number(scaleCoords(7.25467))} />
        </g>        
    );
};

ShipBottomRightPylon.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
};

export default ShipBottomRightPylon;