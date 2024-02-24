import React from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

const ShipTopLeftPylon = props => {
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
        <g id="topLeftPylon">
            <path style={redPylonStyle} d={`m ${basePositionX + Number(scaleCoords(1.36235))},${basePositionY + Number(scaleCoords(4.68554))} ${scaleCoords('-4.6073,-4.65105 v 2.56479 l 4.74686,4.84644')} z`} id="topLeftPylonRed" />
            <rect style={whitePylonStyle} id="topLeftPylonWhite" width={scaleCoords(0.93264884)} height={scaleCoords(4.4767156)} x={basePositionX + Number(scaleCoords(-3.65545))} y={basePositionY + Number(scaleCoords(0.00011))} />
        </g>
    );
};

ShipTopLeftPylon.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
};

export default ShipTopLeftPylon;