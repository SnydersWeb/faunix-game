import moveShipBullets from './moveShipBullets';

const moveObjects = (state, action) => {
    if (state.gameState.started === false) return state;

    const { shipFire } = state.gameState;
    
    let bullets = [];
    if(shipFire.length > 0) {
        bullets = moveShipBullets(shipFire);
    }
    
    const newState = {
        ...state,
        gameState: {
            ...state.gameState,
            shipFire: [...bullets]
        },
    };

    return newState;
}

export default moveObjects;