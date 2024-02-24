import React from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

const ShipFuselage = props => {
    const basePositionX = props.position.x; //108.56032
    const basePositionY = props.position.y; //210.49629

    const fusealageStyle = {
        display: 'inline',
        fill: '#ff0000',
        stroke: 'none',
    };
    const bottomCenterWhiteStyle = {
        display: 'inline',
        fill: '#ffff00',
    };
    const topCenterWhiteStyle = {
        display: 'inline',
        fill: '#f9f9f9',
    };
    const topCenterYellowStyle = {
        fill: '#ffff00',
    };
    const bottomBlockStyle = {
        fill: '#f9f9f9',
    };
    console.log(`bottomCenterWhiteX: ${basePositionX} plus: ${scaleCoords(0.93265)}`);
    console.log(`bottomCenterWhiteY: ${basePositionY} plus: ${scaleCoords(7.21913)}`);
    return (
        <g id="ShipFuselage">
            <path style={fusealageStyle} d={`m ${basePositionX},${basePositionY} h ${scaleCoords('0.93265 v -1.90261 h 0.70882 v 1.90261 h 0.914 v 11.78868 h -2.55547')} z`} id="fusealage" />
            <rect style={bottomCenterWhiteStyle} id="bottomCenterWhite" width={scaleCoords(0.70881999)} height={scaleCoords(2.7979465)} x={basePositionX + Number(scaleCoords(0.93265))} y={basePositionY + Number(scaleCoords(7.21913))} />
            <rect style={topCenterWhiteStyle} id="topCenterWhite" width={scaleCoords(0.70881999)} height={scaleCoords(3.4508007)} x={basePositionX + Number(scaleCoords(0.93265))} y={basePositionY + Number(scaleCoords(1.84708))} />
            <rect style={topCenterYellowStyle} id="topCenterYellow" width={scaleCoords(0.70881999)} height={scaleCoords(1.8093387)} x={basePositionX + Number(scaleCoords(0.93265))} y={basePositionY + Number(scaleCoords(2.6678))} />
            <rect style={bottomBlockStyle} id="bottomLeft" width={scaleCoords(0.78341788)} height={scaleCoords(1.6228091)} x={basePositionX + Number(scaleCoords(-0.78342))} y={basePositionY + Number(scaleCoords(10.89377))} />
            <rect style={bottomBlockStyle} id="bottomRight" width={scaleCoords(0.78341788)} height={scaleCoords(1.6228091)} x={basePositionX + Number(scaleCoords(2.57934))} y={basePositionY + Number(scaleCoords(10.89377))} />
            <rect style={bottomBlockStyle} id="bottomCenter" width={scaleCoords(0.78341788)} height={scaleCoords(1.6228091)} x={basePositionX + Number(scaleCoords(0.89796))} y={basePositionY + Number(scaleCoords(10.89377))} />
        </g>
    );
};

ShipFuselage.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
};

export default ShipFuselage;