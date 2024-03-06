import { MOVE_SHIP, SHOOT, MOVE_OBJECTS, START_GAME } from '../actions';
import moveObjects from './moveObjects';
import moveShip from './moveShip';
import shoot from './shoot';
import startGame from './startGame';
import { numLgStars, numMdStars, numSmStars,  numBirds, birdVertSpacing, startShotCount } from '../utils/constants';
import { calculateCanvas, getRandomInt } from '../utils/functions';

const canvasSize = calculateCanvas();

//Initialize our stars
const aryLgStars = [];
for (let i = 0, j = numLgStars; i < j; i++) {
    aryLgStars.push({
        x: getRandomInt(0, canvasSize.x),
        y: getRandomInt(0, canvasSize.y)
    });
}
const aryMdStars = [];
for (let i = 0, j = numMdStars; i < j; i++) {
    aryMdStars.push({
        x: getRandomInt(0, canvasSize.x),
        y: getRandomInt(0, canvasSize.y)
    });
}
const arySmStars = [];
for (let i = 0, j = numSmStars; i < j; i++) {
    arySmStars.push({
        x: getRandomInt(0, canvasSize.x),
        y: getRandomInt(0, canvasSize.y)
    });
}

const aryBirds = [];
let birdYPos = canvasSize.y * .075;
for (let i = 1, j = numBirds; i <= j; i++) {
    const retVal = {
        position: {
            x: canvasSize.x * (i / 10),
            y: birdYPos,
        },
        id: i,
        fltDir: 'right',
        status: 'normal',
        fleeStatus: 1,
        statusTime: 0,
        wings: {
            left: 1,
            right: 1,
            statusTime: 0,
        },
    }
    aryBirds.push(retVal);
    birdYPos += canvasSize.y * birdVertSpacing;
}

const initialGameState = {
    started: false,
    shotsRemaining: startShotCount,
    startTime: 0,
    score: 0,
    shipPosition: {
        x: canvasSize.x / 2,
        y: canvasSize.y * .88,
    },
    shipMoving: 'none',
    shipFire: [],
    birds: aryBirds,
    background: {
        lgStarsPos: aryLgStars,
        mdStarsPos: aryMdStars,
        smStarsPos: arySmStars,
    },
};

const initialState = {
    gameState: initialGameState,
};
  
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case MOVE_SHIP:
            return moveShip(state, action);
        case SHOOT:
            return shoot(state, action);
        case MOVE_OBJECTS:
            return moveObjects(state, action);
        case START_GAME: 
            return startGame(state, action);
        default:
            return state;
    }
}
  
export default reducer;