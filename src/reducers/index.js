import { MOVE_SHIP, SHOOT, MOVE_OBJECTS, START_GAME } from '../actions';
import moveObjects from './moveObjects';
import moveShip from './moveShip';
import shoot from './shoot';
import startGame from './startGame';
import { widthHeightRatio, numLgStars, numMdStars, numSmStars } from '../utils/constants';
import { getRandomInt } from '../utils/functions';

const { innerHeight } = window;
const canvasHeight = innerHeight;
const canvasWidth = canvasHeight * widthHeightRatio;

//Initialize our stars
const aryLgStars = [];
for(let i = 0, j = numLgStars; i < j; i++) {
    aryLgStars.push({
        x: getRandomInt(0, canvasWidth),
        y: getRandomInt(0, canvasHeight)
    });
}
const aryMdStars = [];
for(let i = 0, j = numMdStars; i < j; i++) {
    aryMdStars.push({
        x: getRandomInt(0, canvasWidth),
        y: getRandomInt(0, canvasHeight)
    });
}
const arySmStars = [];
for(let i = 0, j = numSmStars; i < j; i++) {
    arySmStars.push({
        x: getRandomInt(0, canvasWidth),
        y: getRandomInt(0, canvasHeight)
    });
}

const initialGameState = {
    started: true,
    shipPosition: {
        x: canvasWidth / 2,
        y: canvasHeight - 100,
    },
    shipMoving: 'none',
    pylonMoveFactor: 0,
    pylonMoveIn: false,
    shipFire: [],
    birds: [
        {
            position: {
                x: canvasWidth / 2,
                y: canvasHeight * .1,
            },
            id: 1,
        }
    ],
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