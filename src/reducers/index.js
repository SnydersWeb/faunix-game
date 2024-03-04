import { MOVE_SHIP, SHOOT, MOVE_OBJECTS, START_GAME } from '../actions';
import moveObjects from './moveObjects';
import moveShip from './moveShip';
import shoot from './shoot';
import startGame from './startGame';
import { widthHeightRatio, numLgStars, numMdStars, numSmStars,  numBirds, birdVertSpacing, startShotCount } from '../utils/constants';
import { getRandomInt } from '../utils/functions';

const { innerHeight } = window;
const canvasHeight = innerHeight;
const canvasWidth = canvasHeight * widthHeightRatio;

//Initialize our stars
const aryLgStars = [];
for (let i = 0, j = numLgStars; i < j; i++) {
    aryLgStars.push({
        x: getRandomInt(0, canvasWidth),
        y: getRandomInt(0, canvasHeight)
    });
}
const aryMdStars = [];
for (let i = 0, j = numMdStars; i < j; i++) {
    aryMdStars.push({
        x: getRandomInt(0, canvasWidth),
        y: getRandomInt(0, canvasHeight)
    });
}
const arySmStars = [];
for (let i = 0, j = numSmStars; i < j; i++) {
    arySmStars.push({
        x: getRandomInt(0, canvasWidth),
        y: getRandomInt(0, canvasHeight)
    });
}

const aryBirds = [];
let birdYPos = canvasHeight * .075;
for (let i = 1, j = numBirds; i <= j; i++) {
    const retVal = {
        position: {
            x: canvasWidth * (i / 10),
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
    birdYPos += canvasHeight * birdVertSpacing;
}

const initialGameState = {
    started: true,
    shotsRemaining: startShotCount,
    startTime: 0,
    score: 0,
    shipPosition: {
        x: canvasWidth / 2,
        y: canvasHeight - 100,
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