import React, { Component } from 'react';
import { scaleCoords } from '../utils/functions';
import { shipPylongWiggleDist, shipPylongWiggleSpeed, shipPylonTimeSec } from '../utils/constants';
import PropTypes from 'prop-types';
import ShipFuselage from './ShipFuselage';
import ShipBottomLeftPylon from './ShipBottomLeftPylon';
import ShipBottomRightPylon from './ShipBottomRightPylon';
import ShipTopLeftPylon from './ShipTopLeftPylon';
import ShipTopRightPylon from './ShipTopRightPylon';

// SnyderD - moved pylon movement handling into here since it's not really relevent to the overall 
// game state.  Plus it's more consistent with  the way the birds are handled.
class Ship extends Component {
    constructor(props) {
        super(props);

        this.pylonMoveIn = true;
        this.pylonMoveFactor = 0;
        this.pylonTimeStamp = (new Date()).getTime();
        this.pylonMoveMax = scaleCoords(shipPylongWiggleDist);
        this.pylonMoveMin = 0 - scaleCoords(shipPylongWiggleDist);
        this.pylonMoveSpeed = scaleCoords(shipPylongWiggleSpeed);

        this.setMovement = (coord, moveFactor) => {
            let retVal = coord;
            retVal.x += moveFactor; // Bottom moves in/out
            return retVal;
        };
    
    }

    render() {
        const { moving } = this.props;
        const { position } = this.props;
        const now = (new Date()).getTime();

        let topRightPylonPos = {...position};
        let topLeftPylonPos = {...position};
        let botRightPylonPos = {...position};
        let botLeftPylonPos = {...position};

        if (now - this.pylonTimeStamp > (1000 * shipPylonTimeSec)) {
            if (this.pylonMoveIn) { // True = move out
                if (this.pylonMoveFactor <= this.pylonMoveMax) {
                    this.pylonMoveFactor += this.pylonMoveSpeed;
                } else {
                    this.pylonMoveIn = false;
                }
            } else { // move in
                if (this.pylonMoveFactor >= this.pylonMoveMin) {
                    this.pylonMoveFactor -= this.pylonMoveSpeed;
                } else {
                    this.pylonMoveIn = true;
                }
            }
            this.pylonTimeStamp = now;
        }

        if (/left|right/.test(moving)) {
            topRightPylonPos = this.setMovement(topRightPylonPos, this.pylonMoveFactor);
            topLeftPylonPos = this.setMovement(topLeftPylonPos, -this.pylonMoveFactor);
            botRightPylonPos = this.setMovement(botRightPylonPos, this.pylonMoveFactor);
            botLeftPylonPos = this.setMovement(botLeftPylonPos, -this.pylonMoveFactor);
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
    }
};

Ship.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    moving: PropTypes.oneOf(['left', 'right', 'none']).isRequired,
};

export default Ship;