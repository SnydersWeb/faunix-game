import { scaleCoords } from '../utils/canvasFunctions';
import { bulletLength, shipBarrelLength, activeShotCount, HIGH_SCORE_KEY } from '../utils/constants';

const shoot = state => {
    if (state.gameState.started === false) return state;
    const { shipFire } = state.gameState;
    const { shipPosition } = state.gameState;
    let { shotsRemaining } = state.gameState;
    let { started } = state.gameState;

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
    if (shotsRemaining === 0) {
        started = false;
        const highScore = Number(localStorage.getItem(HIGH_SCORE_KEY));
        const { score } = state.gameState;
        if (score > highScore) {
            localStorage.setItem(HIGH_SCORE_KEY, score.toString());
        }
    }

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