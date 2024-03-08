import { startShotCount } from '../utils/constants';

const startGame = (state) => {
    const { gameState } = state;
    const startTime = (new Date()).getTime();
    //Reset our birds
    let { birds:newBirdState } = gameState;
    newBirdState = newBirdState.map(bird => {
        return {
            ...bird,
            status: 'normal',
            statusTime: 0,
            fleeStatus: 1,
            wings: {
                left: 1,
                right: 1,
                statusTime: 0,
            }
        };
    });
    return {
        ...state,
        gameState: {
            ...gameState,
            birds: newBirdState,
            started: true,
            shotsRemaining: startShotCount,
            score: 0,
            startTime: startTime,
        }
    }
};

export default startGame;