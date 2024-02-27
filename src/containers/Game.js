import { connect } from 'react-redux';
import App from '../App';
import { moveShip, shoot, startGame } from '../actions';

const mapStateToProps = state => ({
    gameState: state.gameState,
});

const mapDispatchToProps = dispatch => ({
    moveShip: (shipPosition) => {
        dispatch(moveShip(shipPosition));
    },
    shoot: (shipPosition) => {
        dispatch(shoot(shipPosition));
    },
    startGame: () => {
        dispatch(startGame());
    },
});

const Game = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default Game;