const startGame = (state) => {
    const { gameState } = state;
    return {
        ...state,
        gameState: {
            ...gameState,
            started: true,
            startTime: (new Date()).getTime(),
        }
    }
};

export default startGame;