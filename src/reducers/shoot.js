import { scaleCoords } from '../utils/canvasFunctions';
import { bulletLength, shipBarrelLength, activeShotCount } from '../utils/constants';

const shoot = state => {
    if (state.gameState.started === false) return state;
    const { shipFire } = state.gameState;
    if (shipFire.length >= activeShotCount) return state; //only 1 bullet on screen
    
    const { shipPosition } = state.gameState;
    let { shotsRemaining } = state.gameState;
    let { started } = state.gameState;
    const { x, y } = shipPosition;
    const yPos = y - (scaleCoords(bulletLength) + scaleCoords(shipBarrelLength));
    const id = (new Date()).getTime();

    const shipBullet = {
        position: { x: x, y: yPos },
        id,
        sound: true,
    };

    //subtract it from shots remaining
    shotsRemaining -= 1;
    
    return {
        ...state,
        gameState: {
            ...state.gameState,
            started: started,
            shipFire: [...shipFire, shipBullet],
            shotsRemaining: shotsRemaining,
        },
    };
};

export default shoot;