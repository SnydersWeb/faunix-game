import { scaleCoords } from '../utils/functions';
import { bulletLength, shipBarrelLength, activeShotCount } from '../utils/constants';

const shoot = state => {
    const { shipFire } = state.gameState;
    const { shipPosition } = state.gameState;
    let { shotsRemaining } = state.gameState;

    if (shipFire.length >= activeShotCount) return state; //only 1 bullet on screen
    
    const { x, y } = shipPosition;
    const yPos = y - (scaleCoords(bulletLength) + scaleCoords(shipBarrelLength));
    const id = (new Date()).getTime();

    const shipBullet = {
        position: { x: x, y: yPos },
        id,
    };

    //subtract it from shots remaining
    shotsRemaining -= 1;

    return {
        ...state,
        gameState: {
            ...state.gameState,
            shipFire: [...shipFire, shipBullet],
            shotsRemaining: shotsRemaining,
        },
    };
};

export default shoot;