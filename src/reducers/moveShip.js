
import { shipMoveRate } from '../utils/constants';
import { scaleCoords, getCanvas } from '../utils/canvasFunctions';
import { shipWidth } from '../utils/constants';

const moveShip = (state, action) => {
    if (state.gameState.started === false) return state;
    
    let shipMoveDirection = action.shipMoveDirection;
    if (/undefined/.test(shipMoveDirection) === true) {
        //Fall back and get it from state
        shipMoveDirection = state.gameState.shipMoving;
    }
    const { shipPosition } = state.gameState;
    const scaleShipWidth = scaleCoords(shipWidth);
    const canvas = getCanvas();
    const moveRate = scaleCoords(shipMoveRate);
    let moveX = 0;

    if (/none/.test(shipMoveDirection) === false) {
        moveX = /left/.test(shipMoveDirection) ? (0 - moveRate) : moveRate;
        // Boundry checking so we don't run off our play area
        // the 10 is a little bit of a "fuddge factor" since the first coodinate of the ship isn't center
        if (shipPosition.x + moveX > (canvas.x - (scaleShipWidth * 1.5)) || shipPosition.x + moveX < 0 + scaleShipWidth) {
            moveX = 0;
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
        },
    };
    
    return newState;
};

export default moveShip;