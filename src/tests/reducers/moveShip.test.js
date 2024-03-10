import moveShip from '../../reducers/moveShip';
import { calculateCanvas, storeCanvas } from '../../utils/canvasFunctions';
import { MOVE_SHIP } from '../../actions/index';

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

describe("Move Ship Reducer Test", () => {
    test("Test move with game not started", () => {
        const newState = moveShip(initialState, { type:MOVE_SHIP, shipMoveDirection:'right' });
        expect(initialState).toEqual(newState);
    });
    test("Test shoot with game started", () => {
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                shipPosition: {
                    x: 50,
                    y: 100,
                },
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
            },
        };
        const newState = moveShip(startedState, { type:MOVE_SHIP, shipMoveDirection:'right' });
        expect(newState.gameState.shipPosition.x).toBeGreaterThan(expectedState.gameState.shipPosition.x);
        expect(newState.gameState.shipPosition.y).toEqual(expectedState.gameState.shipPosition.y);            
    });
    test("Test shoot with game started but the ship all the way over", () => {
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                shipPosition: {
                    x: 0,
                    y: 100,
                },
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
            },
        };
        const newState = moveShip(startedState, { type:MOVE_SHIP, shipMoveDirection:'left' });
        expect(newState.gameState.shipPosition.x).toEqual(expectedState.gameState.shipPosition.x);
        expect(newState.gameState.shipPosition.y).toEqual(expectedState.gameState.shipPosition.y);            
    });
    test("Test move with game started and invalid param passed", () => {
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                shipPosition: {
                    x: 50,
                    y: 100,
                },
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
            },
        };
        const newState = moveShip(startedState, { type:MOVE_SHIP, shipMoveDirection:undefined });
        expect(newState.gameState.shipPosition.x).toEqual(expectedState.gameState.shipPosition.x);
        expect(newState.gameState.shipPosition.y).toEqual(expectedState.gameState.shipPosition.y);            
    });
});
