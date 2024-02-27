
import { shipMoveRate } from '../utils/constants';
import { scaleCoords } from '../utils/functions';

const moveShip = (state, newStateData) => {
    const { shipMoveDirection } = newStateData;
    const { shipPosition } = state.gameState;
    const moveRate = Number(scaleCoords(shipMoveRate));
    let moveX = 0;
    if(/none/.test(shipMoveDirection) === false) {
        moveX = /left/.test(shipMoveDirection) ? (0 - moveRate) : (0 + moveRate);
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