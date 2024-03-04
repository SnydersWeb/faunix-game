const startGame = (state, initialGameState) => {
    return {
        ...state,
        gameState: {
            ...initialGameState,
            started: true,
            startTime: (new Date()).getTime(),
        }
    }
};

export default startGame;