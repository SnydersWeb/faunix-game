import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShipFuselage from './ShipFuselage';
import ShipBottomLeftPylon from './ShipBottomLeftPylon';
import ShipBottomRightPylon from './ShipBottomRightPylon';
import ShipTopLeftPylon from './ShipTopLeftPylon';
import ShipTopRightPylon from './ShipTopRightPylon';
import { shipPylongWiggleDist, shipPylongWiggleSpeed } from '../utils/constants';
import { scaleCoords } from '../utils/functions';

class Ship extends Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.pylonMoveFactor = 0;
        this.pylonMoveMax = Number(scaleCoords(shipPylongWiggleDist));
        this.pylonMoveMin = 0 - Number(scaleCoords(shipPylongWiggleDist));
        this.pylonMoveSpeed = Number(scaleCoords(shipPylongWiggleSpeed));
        this.pylonMoveDir = true;
        console.log(`this.pylonMoveMax: ${this.pylonMoveMax} this.pylonMoveMin: ${this.pylonMoveMin}`);
    }

    _setMovement = (coord, isTop, moveFactor) => {
        let retVal = coord;
        retVal.x += moveFactor; // Bottom moves in/out
        if(isTop) { // Top moves up/down/in/out
            retVal.y += moveFactor;
        }
        return retVal;
    };

    render() {
        const { moving } = this.props;
        const { position } = this.props;
        let topRightPylonPos = {...position};
        let topLeftPylonPos = {...position};
        let botRightPylonPos = {...position};
        let botLeftPylonPos = {...position};

        if(/left|right/.test(moving)) {
            const self = this;
            if(this.interval === null) { // avoid firing this more than once.
                this.interval = window.setInterval(() => {
                    if(self.pylonMoveDir === true) { // True = move out
                        if(self.pylonMoveFactor <= self.pylonMoveMax) {
                            self.pylonMoveFactor += self.pylonMoveSpeed;
                            topRightPylonPos = self._setMovement(topRightPylonPos, true, self.pylonMoveFactor);
                            topLeftPylonPos = self._setMovement(topLeftPylonPos, true, self.pylonMoveFactor);
                            botRightPylonPos = self._setMovement(botRightPylonPos, false, self.pylonMoveFactor);
                            botLeftPylonPos = self._setMovement(botLeftPylonPos, false, self.pylonMoveFactor);
                        } else {
                            self.pylonMoveDir = false;
                        }
                    } else { // move in
                        if(self.pylonMoveFactor >= self.pylonMoveMin) {
                            self.pylonMoveFactor -= self.pylonMoveSpeed;
                            topRightPylonPos = self._setMovement(topRightPylonPos, true, self.pylonMoveFactor);
                            topLeftPylonPos = self._setMovement(topLeftPylonPos, true, self.pylonMoveFactor);
                            botRightPylonPos = self._setMovement(botRightPylonPos, false, self.pylonMoveFactor);
                            botLeftPylonPos = self._setMovement(botLeftPylonPos, false, self.pylonMoveFactor);
                        } else {
                            self.pylonMoveDir = true;
                        }
                    }
                    console.log(`topRightPylonPos.x: ${topRightPylonPos.x} self.pylonMoveDir: ${self.pylonMoveDir}`);
                }, 15);
            }
        } else {
            window.clearInterval(this.interval);
            this.interval = null;
            // Reset Positions
            topRightPylonPos = {...position};
            topLeftPylonPos = {...position};
            botRightPylonPos = {...position};
            botLeftPylonPos = {...position};
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