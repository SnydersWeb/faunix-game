import { MOVE_SHIP, SHOOT, START_GAME } from '../actions';
import moveShip from './moveShip';
import shoot from './shoot';
import startGame from './startGame';

const initialGameState = {
    started: true,
    shipPosition: {
        x: 0,
        y: -375,
    },
    shipMoving: 'none',
    movingInterval: 0,
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