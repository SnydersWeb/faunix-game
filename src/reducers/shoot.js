const shoot = (state, action) => {
    const { shipFire } = state.gameState;
    if(shipFire.length === 1) return state; //only 1 bullet on screen
    
    const { x, y } = action.shipPosition;
    const id = (new Date()).getTime();
    const shipBullet = {
        position: { x: 0, y: 0 },
        startPosition: { x: x, y: y },
        id,
    };

    return {
        ...state,
        gameState: {
            ...state.gameState,
            shipFire: [...shipFire, shipBullet]
        },
    };
};

export default shoot;