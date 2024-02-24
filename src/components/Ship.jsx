import React from 'react';
import PropTypes from 'prop-types';
import ShipFuselage from './ShipFuselage';
import ShipBottomLeftPylon from './ShipBottomLeftPylon';
import ShipBottomRightPylon from './ShipBottomRightPylon';
import ShipTopLeftPylon from './ShipTopLeftPylon';
import ShipTopRightPylon from './ShipTopRightPylon';

const Ship = props => {
    return (
        <g id="ship">
            <ShipTopRightPylon position={props.position} />
            <ShipTopLeftPylon position={props.position} />
            <ShipBottomRightPylon position={props.position} />
            <ShipBottomLeftPylon position={props.position} />
            <ShipFuselage position={props.position} />
        </g>
    );
};

Ship.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
};

export default Ship;