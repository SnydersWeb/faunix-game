import React from 'react';
import PropTypes from 'prop-types';
import ShipFuselage from './ShipFuselage';
import ShipBottomLeftPylon from './ShipBottomLeftPylon';
import ShipBottomRightPylon from './ShipBottomRightPylon';
import ShipTopLeftPylon from './ShipTopLeftPylon';
import ShipTopRightPylon from './ShipTopRightPylon';

const Ship = props => {
    
    const _setMovement = (coord, moveFactor) => {
        let retVal = coord;
        retVal.x += moveFactor; // Bottom moves in/out
        return retVal;
    };
    
    const { moving } = props;
    const { position } = props;
    const { pylonMoveFactor } = props;
    let topRightPylonPos = {...position};
    let topLeftPylonPos = {...position};
    let botRightPylonPos = {...position};
    let botLeftPylonPos = {...position};

    if(/left|right/.test(moving)) {
        topRightPylonPos = _setMovement(topRightPylonPos, pylonMoveFactor);
        topLeftPylonPos = _setMovement(topLeftPylonPos, -pylonMoveFactor);
        botRightPylonPos = _setMovement(botRightPylonPos, pylonMoveFactor);
        botLeftPylonPos = _setMovement(botLeftPylonPos, -pylonMoveFactor);
    }

    return (
        <g id="ship">
            <ShipTopRightPylon position={topRightPylonPos} />
            <ShipTopLeftPylon position={topLeftPylonPos} />
            <ShipBottomRightPylon position={botRightPylonPos} />
            <ShipBottomLeftPylon position={botLeftPylonPos} />
            <ShipFuselage position={position} />
        </g>
    );

};

Ship.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    pylonMoveFactor: PropTypes.number,
    pylonMoveIn: PropTypes.bool,
    moving: PropTypes.oneOf(['left', 'right', 'none']).isRequired,
};

Ship.defaultProps = {
    pylonMoveFactor: 0,
    pylonMoveIn: false,
};

export default Ship;