
import { shipMoveRate } from '../utils/constants';
import { scaleCoords } from '../utils/functions';
import { shipPylongWiggleDist, shipPylongWiggleSpeed } from '../utils/constants';

const moveShip = (state, newStateData) => {
    const { shipMoveDirection } = newStateData;
    const { shipPosition } = state.gameState;
    let { pylonMoveFactor } = state.gameState;
    let { pylonMoveIn } = state.gameState;
    const moveRate = scaleCoords(shipMoveRate);
    const pylonMoveMax = scaleCoords(shipPylongWiggleDist);
    const pylonMoveMin = 0 - scaleCoords(shipPylongWiggleDist);
    const pylonMoveSpeed = scaleCoords(shipPylongWiggleSpeed);
    let moveX = 0;
        
    if(/none/.test(shipMoveDirection) === false) {
        moveX = /left/.test(shipMoveDirection) ? (0 - moveRate) : (0 + moveRate);

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