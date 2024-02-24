import React from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

const ShipBottomLeftPylon = props => {
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
        <g id="bottomLeftPylon">
            <path style={redPylonStyle} d={`m ${basePositionX + Number(scaleCoords(0.92374))},${basePositionY + Number(scaleCoords(4.58442))} ${scaleCoords('-0.0279,3.03812 -4.71895,4.89496 v -3.06512')} z`} id="bottomLeftPylonRed" />
            <rect style={whitePylonStyle} id="bottomLeftPylonWhite" width={scaleCoords(0.78343964)} height={scaleCoords(5.3533936)} x={basePositionX + Number(scaleCoords(-4.27065))} y={basePositionY + Number(scaleCoords(7.25469))} />
        </g>
    );    
};

ShipBottomLeftPylon.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
};

export default ShipBottomLeftPylon;