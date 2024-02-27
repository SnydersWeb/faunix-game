export const START_GAME = 'START_GAME';
export const SHOOT = 'SHOOT'
export const MOVE_SHIP = 'MOVE_SHIP'

export const moveShip = shipMoveDirection => ({
    type: MOVE_SHIP,
    shipMoveDirection,
});

export const shoot = shipPosition => ({
    type: SHOOT,
    shipPosition,
});

export const startGame = () => ({
    type: START_GAME,
});
