import { MOVE_SHIP, SHOOT, START_GAME } from '../actions';
import moveShip from './moveShip';
import shoot from './shoot';
import startGame from './startGame';
import { widthHeightRatio } from '../utils/constants';

const { innerHeight } = window;
const canvasHeight = innerHeight;
const canvasWidth = canvasHeight * widthHeightRatio;

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
        case START_GAME: 
            return startGame(state, action);
        default:
            return state;
    }
}
  
export default reducer;