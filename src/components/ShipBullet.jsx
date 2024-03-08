import React from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/canvasFunctions';
import { shipPosGunOffset, bulletLength, bulletWidth } from '../utils/constants';

const ShipBullet = (props) => {
    const bulletStyle = {
        fill: '#FC0',
        stroke: '#F00',
        strokeWidth: '1px',
    };

    return (
        <rect 
            style={bulletStyle} 
            key={`shipBullet${props.id}`} 
            id={`shipBullet${props.id}`} 
            width={scaleCoords(bulletWidth)} 
            height={scaleCoords(bulletLength)} 
            x={props.position.x + scaleCoords(shipPosGunOffset)} 
            y={props.position.y} 
            data-testid={`shipbullet`}
        />
    );
};

ShipBullet.propTypes = {
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.number,
};

export default ShipBullet;