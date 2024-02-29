
import { shipMoveRate } from '../utils/constants';
import { scaleCoords, getCanvas } from '../utils/functions';
import { shipPylongWiggleDist, shipPylongWiggleSpeed, shipWidth } from '../utils/constants';

const moveShip = (state, action) => {
    const { shipMoveDirection } = action;
    const { shipPosition } = state.gameState;
    let { pylonMoveFactor } = state.gameState;
    let { pylonMoveIn } = state.gameState;
    const scaleShipWidth = scaleCoords(shipWidth);
    const canvas = getCanvas();
    const moveRate = scaleCoords(shipMoveRate);
    const pylonMoveMax = scaleCoords(shipPylongWiggleDist);
    const pylonMoveMin = 0 - scaleCoords(shipPylongWiggleDist);
    const pylonMoveSpeed = scaleCoords(shipPylongWiggleSpeed);
    let moveX = 0;
        
    if(/none/.test(shipMoveDirection) === false) {
        moveX = /left/.test(shipMoveDirection) ? (0 - moveRate) : moveRate;

        // Boundry checking so we don't run off our play area
        // the 10 is a little bit of a "fuddge factor" since the first coodinate of the ship isn't center
        if (shipPosition.x + moveX > (canvas.x - (scaleShipWidth * 1.5)) || shipPosition.x + moveX < 0 + scaleShipWidth) {
            moveX = 0;
        }

        if(pylonMoveIn) { // True = move out
            if(pylonMoveFactor <= pylonMoveMax) {
                pylonMoveFactor += pylonMoveSpeed;
            } else {
                pylonMoveIn = false;
            }
        } else { // move in
            if(pylonMoveFactor >= pylonMoveMin) {
                pylonMoveFactor -= pylonMoveSpeed;
            } else {
                pylonMoveIn = true;
            }
        }
    }
    
    const newPosition = {
        x: shipPosition.x + moveX,
        y: shipPosition.y,
    };
    
    const newState = {
        ...state,
        gameState: {
            ...state.gameState,
            shipPosition: newPosition,
            shipMoving: shipMoveDirection,
            pylonMoveFactor,
            pylonMoveIn,
        },
    };
    
    return newState;
};

export default moveShip;