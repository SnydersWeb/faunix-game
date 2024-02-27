import React from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

const ShipTopRightPylon = props => {
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
        <g id="topRightPylon">
            <path style={redPylonStyle} d={`m ${basePositionX + scaleCoords(1.09595)},${basePositionY + scaleCoords(7.43461)} ${scaleCoords('4.6073,-4.87435 v -2.56479 l -4.6073,4.87435')} z`} id="topRightPylonRed" />
            <rect style={whitePylonStyle} id="topRightPylonWhite" width={scaleCoords(0.93264884)} height={scaleCoords(4.4767156)} x={basePositionX + scaleCoords(5.19269)} y={basePositionY + scaleCoords(-0.01083)} />
        </g>
    );
};

ShipTopRightPylon.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
};

export default ShipTopRightPylon;