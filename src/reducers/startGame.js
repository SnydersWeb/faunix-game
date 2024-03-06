import { startShotCount } from '../utils/constants';

const startGame = (state) => {
    const { gameState } = state;
    return {
        ...state,
        gameState: {
            ...gameState,
            started: true,
            shotsRemaining: startShotCount,
            score: 0,
            startTime: (new Date()).getTime(),
        }
    }
};

export default startGame;