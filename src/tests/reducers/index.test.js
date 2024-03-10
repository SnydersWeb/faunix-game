import reducer from '../../reducers/index';
import { calculateCanvas, storeCanvas } from '../../utils/canvasFunctions';
import { START_GAME, SHOOT, MOVE_SHIP, MOVE_OBJECTS } from '../../actions/index';

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
    birds: [{
        position: {
            x: 100,
            y: 10,
        },
        id: 1,
        fltDir: 'right',
        status: 'normal',
        fleeStatus: 1,
        statusTime: 0,
        wings: { //Scaler value for wing if hit. 1 is full scale
            left: .1,
            right: .1,
            statusTime: 100,
        }
    }],
};

const initialState = {
    gameState: initialGameState,
};

describe("Index Reducer Test", () => {
    describe("Move Ship Action Test", () => {
        test("Test move right", () => {
            const newState = reducer(initialState, { type:MOVE_SHIP, shipMoveDirection:'right' });
            expect(initialState).toEqual(newState);
        });
        test("Test move left", () => {
            const newState = reducer(initialState, { type:MOVE_SHIP, shipMoveDirection:'left' });
            expect(initialState).toEqual(newState);
        });
        test("Test move none", () => {
            const newState = reducer(initialState, { type:MOVE_SHIP, shipMoveDirection:'none' });
            expect(initialState).toEqual(newState);
        });
    });
    describe("Shoot Action Test", () => {
        test("Test shoot", () => {
            const newState = reducer(initialState, { type:SHOOT });
            expect(initialState).toEqual(newState);
        });
    });
    describe("Start Action Test", () => {
        test("Test Start", () => {
            const now = (new Date()).getTime();

            const expectedState = {
                ...initialState,
                gameState: {
                    ...initialState.gameState,
                    started: true,
                    shotsRemaining: 100,
                    startTime: now,
                    birds: [{
                        position: {
                            x: 100,
                            y: 10,
                        },
                        id: 1,
                        fltDir: 'right',
                        status: 'normal',
                        statusTime: 0,
                        fleeStatus: 1,
                        wings: {
                            left: 1,
                            right: 1,
                            statusTime: 0,
                        }
                    }],
                },
            };
            const newState = reducer(initialState, { type:START_GAME });
            expect(newState.gameState.shotsRemaining).toEqual(expectedState.gameState.shotsRemaining);
            expect(newState.gameState.startTime).toBeCloseTo(expectedState.gameState.startTime, -1);
            expect(Math.round(newState.gameState.birds[0].position.x)).toBeCloseTo(Math.round(expectedState.gameState.birds[0].position.x), -1);
            expect(newState.gameState.birds[0].position.y).toEqual(expectedState.gameState.birds[0].position.y);
            expect(newState.gameState.birds[0].id).toEqual(expectedState.gameState.birds[0].id);
            expect(newState.gameState.birds[0].fltDir).toEqual(expectedState.gameState.birds[0].fltDir);
            expect(newState.gameState.birds[0].status).toEqual(expectedState.gameState.birds[0].status);
            expect(newState.gameState.birds[0].statusTime).toBeCloseTo(expectedState.gameState.birds[0].statusTime);
            expect(newState.gameState.birds[0].fleeStatus).toEqual(expectedState.gameState.birds[0].fleeStatus);
            expect(newState.gameState.birds[0].wings.left).toEqual(expectedState.gameState.birds[0].wings.left);
            expect(newState.gameState.birds[0].wings.right).toEqual(expectedState.gameState.birds[0].wings.right);
            expect(newState.gameState.birds[0].wings.statusTime).toBeCloseTo(expectedState.gameState.birds[0].wings.statusTime);
        });
    });
    describe("MoveObjects Action Test", () => {
        test("Test", () => {
            const now = (new Date()).getTime();

            const expectedState = {
                ...initialState,
                gameState: {
                    ...initialState.gameState,
                    shotsRemaining: 90,
                    startTime: 1,
                    birds: [{
                        position: {
                            x: 101.32047591482656,
                            y: 10,
                        },
                        id: 1,
                        fltDir: 'right',
                        status: 'normal',
                        statusTime: 0,
                        fleeStatus: 1,
                        wings: {
                            left: .2,
                            right: .2,
                            statusTime: now,
                        }
                    }],
                },
            };
            const newState = reducer(initialState, { type:MOVE_OBJECTS });
            expect(newState.gameState.shotsRemaining).toEqual(expectedState.gameState.shotsRemaining);
            expect(newState.gameState.startTime).toEqual(expectedState.gameState.startTime);
            expect(Math.round(newState.gameState.birds[0].position.x)).toBeCloseTo(Math.round(expectedState.gameState.birds[0].position.x), -1);
            expect(newState.gameState.birds[0].position.y).toEqual(expectedState.gameState.birds[0].position.y);
            expect(newState.gameState.birds[0].id).toEqual(expectedState.gameState.birds[0].id);
            expect(newState.gameState.birds[0].fltDir).toEqual(expectedState.gameState.birds[0].fltDir);
            expect(newState.gameState.birds[0].status).toEqual(expectedState.gameState.birds[0].status);
            expect(newState.gameState.birds[0].statusTime).toBeCloseTo(expectedState.gameState.birds[0].statusTime);
            expect(newState.gameState.birds[0].fleeStatus).toEqual(expectedState.gameState.birds[0].fleeStatus);
            expect(newState.gameState.birds[0].wings.left).toEqual(expectedState.gameState.birds[0].wings.left);
            expect(newState.gameState.birds[0].wings.right).toEqual(expectedState.gameState.birds[0].wings.right);
            expect(newState.gameState.birds[0].wings.statusTime).toBeCloseTo(expectedState.gameState.birds[0].wings.statusTime, -1);
        });
    });    
    describe("None Action Test", () => {
        test("Test nothing", () => {
            const newState = reducer(initialState, { type:'none' });
            expect(initialState).toEqual(newState);
        });
    });
});
