import moveObjects from '../../reducers/moveObjects';
import { calculateCanvas, storeCanvas } from '../../utils/canvasFunctions';
import { MOVE_OBJECTS } from '../../actions/index';

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

describe("Move Objects Reducer Test", () => {
    test("Test with game not started", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .2,
                        right: .2,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
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
        expect(newState.gameState.birds[0].wings.statusTime).toBeCloseTo(expectedState.gameState.birds[0].wings.statusTime, -1);  
    });

    test("Test with game started", () => {
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
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .2,
                        right: .2,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
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

    test("Test with game started and ship moving right", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                shipMoving: 'right',
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .2,
                        right: .2,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.shotsRemaining).toEqual(expectedState.gameState.shotsRemaining);
        expect(newState.gameState.startTime).toBeCloseTo(expectedState.gameState.startTime, -1);
        expect(newState.gameState.shipPosition.x).toBeGreaterThan(expectedState.gameState.shipPosition.x);
        expect(newState.gameState.shipPosition.y).toEqual(expectedState.gameState.shipPosition.y);            
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
    
    test("Test with bird all the way to the right", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                birds: [{
                    position: {
                        x: 20,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: {
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                birds: [{
                    position: {
                        x: 20,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: { 
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.birds[0].fltDir).toEqual(expectedState.gameState.birds[0].fltDir);
    });
    
    test("Test with bird all the way to the left", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                birds: [{
                    position: {
                        x: 850,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'left',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: {
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                birds: [{
                    position: {
                        x: 850,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'left',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: { 
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.birds[0].fltDir).toEqual(expectedState.gameState.birds[0].fltDir);
    });   

    test("Test with bird hit", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                birds: [{
                    position: {
                        x: 850,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'left',
                    status: 'struck',
                    sound: true,
                    soundType: 'struck',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: now - 500,
                    wings: {
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                birds: [{
                    position: {
                        x: 850,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'left',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: now,
                    wings: { 
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.birds[0].sound).toEqual(expectedState.gameState.birds[0].sound);
    }); 

    test("Test with bird wing hit", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                birds: [{
                    position: {
                        x: 850,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'left',
                    status: 'normal',
                    sound: true,
                    soundType: 'wing',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: now - 500,
                    wings: {
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                birds: [{
                    position: {
                        x: 850,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'left',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: now,
                    wings: { 
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.birds[0].soundType).toEqual(expectedState.gameState.birds[0].soundType);
    }); 

    test("Test with game started and ship firing", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                shotsRemaining: 90,
                shipFire: [{
                    id: now - 500,
                    sound: true,
                    position: {
                        x: 50,
                        y: 84.27301432835822,
                    },
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                shotsRemaining: 90,
                shipFire: [{
                    id: now,
                    sound: true,
                    position: {
                        x: 50,
                        y: 84.27301432835822,
                    },
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.shipFire[0].position.y).toBeLessThan(expectedState.gameState.shipFire[0].position.y);
        expect(newState.gameState.shipFire[0].position.x).toEqual(expectedState.gameState.shipFire[0].position.x);
        expect(newState.gameState.shipFire[0].id).toBeCloseTo(expectedState.gameState.shipFire[0].id, -500);    
        expect(newState.gameState.shipFire[0].sound).toBe(false);        
    });    
        
    test("Test with game started and ship out of bullets (Game over mechanic)", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                shotsRemaining: 0,
                shipFire: [],
            },
            shipMoving: 'left',
            score: 100,
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                started: false,
            },
            shipMoving: 'none',
            highScore: 30,
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.shipMoving).toEqual(expectedState.gameState.shipMoving);
        expect(newState.gameState.started).toEqual(expectedState.gameState.started);
        expect(newState.gameState.highScore).toBeLessThanOrEqual(expectedState.gameState.highScore);
    });    
    
    test("Test with game started and bird hits (left)", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                shotsRemaining: 90,
                shipFire: [{
                    id: now,
                    position: {
                        x: 80.29670546531167,
                        y: 50,
                    },
                }],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                shotsRemaining: 90,
                shipFire: [],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: now,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.shipFire).toEqual(expectedState.gameState.shipFire);
        expect(newState.gameState.birds[0].wings.left).toEqual(expectedState.gameState.birds[0].wings.left);
    });

    test("Test with game started and bird hits (right)", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                shotsRemaining: 90,
                shipFire: [{
                    id: now,
                    position: {
                        x: 115.29670546531167,
                        y: 50,
                    },
                }],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                shotsRemaining: 90,
                shipFire: [],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: now,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: 1,
                        right: .1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.shipFire).toEqual(expectedState.gameState.shipFire);
        expect(newState.gameState.birds[0].wings.right).toEqual(expectedState.gameState.birds[0].wings.right);
    });
    
    test("Test with game started and bird hits (body)", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                shotsRemaining: 90,
                shipFire: [{
                    id: now,
                    position: {
                        x: 100.29670546531167,
                        y: 40,
                    },
                }],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .1,
                        right: .1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                shotsRemaining: 90,
                shipFire: [],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'struck',
                    sound: true,
                    soundType: 'struck',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: now,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .1,
                        right: .1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.shipFire).toEqual(expectedState.gameState.shipFire);
        expect(newState.gameState.birds[0].status).toEqual(expectedState.gameState.birds[0].status);
    });
        
    test("Test with game started and bird from struck to flee", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'struck',
                    sound: true,
                    soundType: 'struck',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .1,
                        right: .1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                shotsRemaining: 90,
                shipFire: [],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'flee',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: now,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .1,
                        right: .1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.birds[0].status).toEqual(expectedState.gameState.birds[0].status);
    });
        
    test("Test with game started and bird from fleeing", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'flee',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: .2,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .1,
                        right: .1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                shotsRemaining: 90,
                shipFire: [],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'flee',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: .1,
                    statusTime: now,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .1,
                        right: .1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.birds[0].fleeStatus).toEqual(expectedState.gameState.birds[0].fleeStatus);
        expect(newState.gameState.birds[0].status).toEqual(expectedState.gameState.birds[0].status);        
    });
        
    test("Test with game started and bird from flee to gone", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'flee',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 0,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .1,
                        right: .1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                shotsRemaining: 90,
                shipFire: [],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'gone',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 0,
                    statusTime: now,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .1,
                        right: .1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.birds[0].fleeStatus).toEqual(expectedState.gameState.birds[0].fleeStatus);
        expect(newState.gameState.birds[0].status).toEqual(expectedState.gameState.birds[0].status);        
    });
        
    test("Test with game started and bird from gone to enter", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'gone',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 0,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .1,
                        right: .1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                shotsRemaining: 90,
                shipFire: [],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'enter',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 0,
                    statusTime: now,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.birds[0].fleeStatus).toEqual(expectedState.gameState.birds[0].fleeStatus);
        expect(newState.gameState.birds[0].status).toEqual(expectedState.gameState.birds[0].status);        
        expect(newState.gameState.birds[0].wings.left).toEqual(expectedState.gameState.birds[0].wings.left);        
        expect(newState.gameState.birds[0].wings.right).toEqual(expectedState.gameState.birds[0].wings.right);        
    });
        
    test("Test with game started and bird from entering", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'enter',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: .8,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                shotsRemaining: 90,
                shipFire: [],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'enter',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: .9,
                    statusTime: now,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.birds[0].fleeStatus).toEqual(expectedState.gameState.birds[0].fleeStatus);
        expect(newState.gameState.birds[0].status).toEqual(expectedState.gameState.birds[0].status);        
    });
        
    test("Test with game started and bird from enter to normal", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'enter',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                shotsRemaining: 90,
                shipFire: [],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: now,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.birds[0].fleeStatus).toEqual(expectedState.gameState.birds[0].fleeStatus);
        expect(newState.gameState.birds[0].status).toEqual(expectedState.gameState.birds[0].status);        
    });
        
    test("Test with game started and bird wing regrowth", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: .9,
                        right: .9,
                        statusTime: 0,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                shotsRemaining: 90,
                shipFire: [],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: now,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.birds[0].fleeStatus).toEqual(expectedState.gameState.birds[0].fleeStatus);
        expect(newState.gameState.birds[0].status).toEqual(expectedState.gameState.birds[0].status);
        expect(newState.gameState.birds[0].wings.left).toEqual(expectedState.gameState.birds[0].wings.left);      
        expect(newState.gameState.birds[0].wings.right).toEqual(expectedState.gameState.birds[0].wings.right);       
    });

        
    test("Test with game started and bird wing overgrowth", () => {
        const now = (new Date()).getTime();
        const startedState = {
            ...initialState,
            gameState: {
                ...initialState.gameState,
                started: true,
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: 0,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: 1.1,
                        right: 1.1,
                        statusTime: 0,
                    }
                }],
            },
        };
        const expectedState = {
            ...startedState,
            gameState: {
                ...startedState.gameState,
                shotsRemaining: 90,
                shipFire: [],
                birds: [{
                    position: {
                        x: 101.29670546531167,
                        y: 10,
                    },
                    id: 1,
                    fltDir: 'right',
                    status: 'normal',
                    sound: false,
                    soundType: 'none',
                    soundSpeed: 1,
                    fleeStatus: 1,
                    statusTime: now,
                    wings: { //Scaler value for wing if hit. 1 is full scale
                        left: 1,
                        right: 1,
                        statusTime: now,
                    }
                }],
            },
        };
        const newState = moveObjects(startedState, { type:MOVE_OBJECTS });
        expect(newState.gameState.birds[0].fleeStatus).toEqual(expectedState.gameState.birds[0].fleeStatus);
        expect(newState.gameState.birds[0].status).toEqual(expectedState.gameState.birds[0].status);
        expect(newState.gameState.birds[0].wings.left).toEqual(expectedState.gameState.birds[0].wings.left);      
        expect(newState.gameState.birds[0].wings.right).toEqual(expectedState.gameState.birds[0].wings.right);       
    });

});
