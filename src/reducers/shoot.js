import { scaleCoords } from '../utils/functions';
import { bulletLength, shipBarrelLength, activeBulletCount } from '../utils/constants';

const shoot = state => {
    const { shipFire } = state.gameState;
    const { shipPosition } = state.gameState;
    
    if(shipFire.length >= activeBulletCount) return state; //only 1 bullet on screen
    
    const { x, y } = shipPosition;
    const yPos = y - (scaleCoords(bulletLength) + scaleCoords(shipBarrelLength));
    const id = (new Date()).getTime();

    const shipBullet = {
        position: { x: x, y: yPos },
        id,
    };

    return {
        ...state,
        gameState: {
            ...state.gameState,
            shipFire: [...shipFire, shipBullet]
        },
    };
};

export default shoot;