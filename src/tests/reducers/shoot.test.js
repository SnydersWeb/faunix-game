import shoot from '../../reducers/index';
import { SHOOT } from '../../actions/index';

window.innerHeight = 658;
window.innerWidth = 873;
const initialGameState = {
    started: false,
    shotsRemaining: 90,
    startTime: 1,
    endTime: 10,
    score: 0,
    highScore: 10,
    shipPosition: {
        x: 50,
        y: 100,
    },
    shipMoving: 'none',
    shipFire: [],
    birds: [],
};

const initialState = {
    gameState: initialGameState,
};

describe("Shoot Reducer Test", () => {
    describe("Shoot Action Test", () => {
        test("Test shoot with game not started", () => {
            const newState = shoot(initialState, { type:SHOOT });
            expect(initialState).toEqual(newState);
        });
        test("Test shoot with game started", () => {
            const now = (new Date()).getTime();

            const startedState = {
                ...initialState,
                gameState: {
                    ...initialState.gameState,
                    started: true,
                },
            };
            const expectedState = {
                ...startedState,
                gameState: {
                    ...startedState.gameState,
                    shotsRemaining: 89,
                    shipFire: [{
                        id: now,
                        position: {
                            x: 50,
                            y: NaN,
                       },
                    }]
                },
            };
            const newState = shoot(startedState, { type:SHOOT });
            expect(newState).toEqual(expectedState);
        });
        test("Test shoot with game started and active shot already up", () => {
            const now = (new Date()).getTime();

            const expectedState = {
                ...initialState,
                gameState: {
                    ...initialState.gameState,
                    started: true,
                    shotsRemaining: 89,
                    shipFire: [{
                        id: now,
                        position: {
                            x: 50,
                            y: NaN,
                       },
                    }]
                },
            };
            const newState = shoot(expectedState, { type:SHOOT });
            expect(newState).toEqual(expectedState);
        });
    });
});
