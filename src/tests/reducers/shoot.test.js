import shoot from '../../reducers/index';
import { calculateCanvas, storeCanvas } from '../../utils/canvasFunctions';
import { SHOOT } from '../../actions/index';

window.innerHeight = 658;
window.innerWidth = 873;
const canvasSize = calculateCanvas();
storeCanvas(canvasSize);

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
                        y: 84.27301432835822,
                    },
                }]
            },
        };
        const newState = shoot(startedState, { type:SHOOT });
        expect(newState.gameState.shotsRemaining).toEqual(expectedState.gameState.shotsRemaining);
        expect(newState.gameState.startTime).toEqual(expectedState.gameState.startTime);
        expect(newState.gameState.shipFire[0].position.x).toBeCloseTo(expectedState.gameState.shipFire[0].position.x, 3);
        expect(newState.gameState.shipFire[0].position.y).toBeCloseTo(expectedState.gameState.shipFire[0].position.y, 3);
        expect(newState.gameState.shipFire[0].id).toBeCloseTo(expectedState.gameState.shipFire[0].id, -1);
        
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
                        y: 84.27301432835822,
                    },
                }]
            },
        };
        const newState = shoot(expectedState, { type:SHOOT });
        expect(newState).toEqual(expectedState);
    });
});
