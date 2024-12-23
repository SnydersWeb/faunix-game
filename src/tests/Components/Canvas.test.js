import { render, screen } from '@testing-library/react'
import { calculateCanvas, storeCanvas } from '../../utils/canvasFunctions';
import Canvas from '../../components/Canvas';

window.innerHeight = 658;
window.innerWidth = 873;
const canvasSize = calculateCanvas();
storeCanvas(canvasSize);
    
const initialGameState = {
    started: false,
    shotsRemaining: 90,
    startTime: 1,
    endTime: 10,
    score: 0,
    highScore: 10,
    shipPosition: {
        x: 50,
        y: 100,
    },
    shipMoving: 'none',
    shipFire: [{
        position: {
            x: 50,
            y: 100,
        },
        id: 1,
        sound: true,
    }],
    birds: [{
        position: {
            x: 100,
            y: 10,
        },
        id: 1,
        fltDir: 'right',
        status: 'struck',
        sound: true,
        soundType: 'struck',
        soundSpeed: 1,
        fleeStatus: 1,
        statusTime: 0,
        wings: { //Scaler value for wing if hit. 1 is full scale
            left: 1,
            right: 1,
            statusTime: 100,
        }
    },
    {
        position: {
            x: 100,
            y: 20,
        },
        id: 2,
        fltDir: 'left',
        status: 'normal',
        sound: true,
        soundType: 'wing',
        soundSpeed: 1,
        fleeStatus: 1,
        statusTime: 0,
        wings: { //Scaler value for wing if hit. 1 is full scale
            left: .1,
            right: .1,
            statusTime: 100,
        }
    },
    {
        position: {
            x: 100,
            y: 30,
        },
        id: 3,
        fltDir: 'left',
        status: 'flee',
        sound: false,
        soundType: 'none',
        soundSpeed: 1,
        fleeStatus: .5,
        statusTime: 0,
        wings: { //Scaler value for wing if hit. 1 is full scale
            left: .1,
            right: .1,
            statusTime: 100,
        }
    },
    {
        position: {
            x: 100,
            y: 40,
        },
        id: 4,
        fltDir: 'left',
        status: 'gone',
        sound: false,
        soundType: 'none',
        soundSpeed: 1,
        fleeStatus: 1,
        statusTime: 0,
        wings: { //Scaler value for wing if hit. 1 is full scale
            left: 1,
            right: 1,
            statusTime: 100,
        }
    },
    {
        position: {
            x: 100,
            y: 50,
        },
        id: 5,
        fltDir: 'right',
        status: 'enter',
        sound: false,
        soundType: 'none',
        soundSpeed: 1,
        fleeStatus: 1,
        statusTime: 0,
        wings: { //Scaler value for wing if hit. 1 is full scale
            left: 1,
            right: 1,
            statusTime: 100,
        }
    }],
};

describe("Canvas Tests", () => {
    test("Renders successfully in regular not started", () => {
        const handleEvent = jest.fn();
    
        render(<Canvas 
            isMobile={false}
            gameState={initialGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);

        const canvas = screen.getByTestId(/canvas/i);
        expect(canvas).toBeInTheDocument();

        const gameover = screen.getByTestId(/gameover/i);
        expect(gameover).toBeInTheDocument();

        const startgame = screen.getByTestId(/startgame/i);
        expect(startgame).toBeInTheDocument();

    });

    test("Renders successfully in mobile view not started", () => {
        //Fake out mobile detection
        window.ontouchstart = () => {};
        window.innerHeight = 915;
        window.innerWidth = 412;
        const handleEvent = jest.fn();
    
        render(<Canvas 
            isMobile={false}
            gameState={initialGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);

        const canvas = screen.getByTestId(/canvas/i);
        expect(canvas).toBeInTheDocument();

        const gameover = screen.getByTestId(/gameover/i);
        expect(gameover).toBeInTheDocument();

        const startgame = screen.getByTestId(/startgame/i);
        expect(startgame).toBeInTheDocument();

    });

    
    test("Renders successfully in mobile view (iPad) not started", () => {
        //Fake out mobile detection
        window.ontouchstart = () => {};
        window.innerHeight = 1366;
        window.innerWidth = 1024;
        const handleEvent = jest.fn();
    
        render(<Canvas 
            isMobile={true}
            gameState={initialGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);

        const canvas = screen.getByTestId(/canvas/i);
        expect(canvas).toBeInTheDocument();

        const gameover = screen.getByTestId(/gameover/i);
        expect(gameover).toBeInTheDocument();

        const startgame = screen.getByTestId(/startgame/i);
        expect(startgame).toBeInTheDocument();

        const leftCtrl = screen.queryByTestId(/mobilectrol-left/i);
        expect(leftCtrl).toBeInTheDocument();

        const rightCtrl = screen.queryByTestId(/mobilectrol-right/i);
        expect(rightCtrl).toBeInTheDocument();

        const fireCtrl = screen.queryByTestId(/mobilectrol-fire/i);
        expect(fireCtrl).toBeInTheDocument();

    });
    
    test("Renders successfully in mobile view (iPad) started", () => {
        //Fake out mobile detection
        window.ontouchstart = () => {};
        window.innerHeight = 1366;
        window.innerWidth = 1024;
        const handleEvent = jest.fn();
        const newGameState = { ...initialGameState, started: true };
        render(<Canvas 
            isMobile={true}
            gameState={newGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);

        const canvas = screen.getByTestId(/canvas/i);
        expect(canvas).toBeInTheDocument();

        const gameover = screen.queryByTestId(/gameover/i);
        expect(gameover).not.toBeInTheDocument();

        const startgame = screen.queryByTestId(/startgame/i);
        expect(startgame).not.toBeInTheDocument();

        const leftCtrl = screen.queryByTestId(/mobilectrol-left/i);
        expect(leftCtrl).toBeInTheDocument();

        const rightCtrl = screen.queryByTestId(/mobilectrol-right/i);
        expect(rightCtrl).toBeInTheDocument();

        const fireCtrl = screen.queryByTestId(/mobilectrol-fire/i);
        expect(fireCtrl).toBeInTheDocument();

    });

    test("Renders successfully in regular view started", () => {
        //reset to desktop
        delete window.ontouchstart;
        window.innerHeight = 658;
        window.innerWidth = 873;
        const handleEvent = () => {};

        const modGameState = {
            ...initialGameState,
            started: true,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const canvas = screen.getByTestId(/canvas/i);
        expect(canvas).toBeInTheDocument();

        const gameover = screen.queryByTestId(/gameover/i);
        expect(gameover).not.toBeInTheDocument();

        const startgame = screen.queryByTestId(/startgame/i);
        expect(startgame).not.toBeInTheDocument();
        
        const leftCtrl = screen.queryByTestId(/mobilectrol-left/i);
        expect(leftCtrl).not.toBeInTheDocument();

        const rightCtrl = screen.queryByTestId(/mobilectrol-right/i);
        expect(rightCtrl).not.toBeInTheDocument();

        const fireCtrl = screen.queryByTestId(/mobilectrol-fire/i);
        expect(fireCtrl).not.toBeInTheDocument();
    });

    test("Renders successfully with ship changes", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            started: true,
            shipMoving: 'right',
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const canvas = screen.getByTestId(/canvas/i);
        expect(canvas).toBeInTheDocument();

        const ship = screen.getByTestId("ship");
        expect(ship).toBeInTheDocument();
    });


    test("Renders successfully with the right number of birds", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            started: true,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const canvas = screen.getByTestId(/canvas/i);
        expect(canvas).toBeInTheDocument();

        const birds = screen.getAllByTestId("bird");
        expect(birds.length).toBe(5);
    });

    test("Renders successfully various gameover states", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            score: 1,
            highScore: 10,
            startTime: 1,
            endTime: 10,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const canvas = screen.getByTestId(/canvas/i);
        expect(canvas).toBeInTheDocument();

        const gameOver = screen.queryByTestId("gameover");
        expect(gameOver).toBeInTheDocument();
    });

    test("Renders successfully various gameover states no score", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            score: 0,
            highScore: 100,
            startTime: 10000,
            endTime: 100000,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const gameOver = screen.queryByTestId("gameover");
        expect(gameOver).toBeInTheDocument();
    });

    test("Renders successfully various gameover states max score", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            score: 100,
            highScore: 10,
            startTime: 1,
            endTime: 10000,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const gameOver = screen.queryByTestId("gameover");
        expect(gameOver).toBeInTheDocument();
    });

    test("Renders successfully various gameover states 90 score", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            score: 90,
            highScore: 10,
            startTime: 1,
            endTime: 10,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const gameOver = screen.queryByTestId("gameover");
        expect(gameOver).toBeInTheDocument();
    });

    test("Renders successfully various gameover states 80 score", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            score: 80,
            highScore: 10,
            startTime: 1,
            endTime: 10,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const gameOver = screen.queryByTestId("gameover");
        expect(gameOver).toBeInTheDocument();
    });

    test("Renders successfully various gameover states 70 score", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            score: 70,
            highScore: 10,
            startTime: 1,
            endTime: 10,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const gameOver = screen.queryByTestId("gameover");
        expect(gameOver).toBeInTheDocument();
    });

    test("Renders successfully various gameover states 60 score", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            score: 60,
            highScore: 10,
            startTime: 1,
            endTime: 10,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const gameOver = screen.queryByTestId("gameover");
        expect(gameOver).toBeInTheDocument();
    });

    test("Renders successfully various gameover states 50 score", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            score: 50,
            highScore: 10,
            startTime: 1,
            endTime: 10,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const gameOver = screen.queryByTestId("gameover");
        expect(gameOver).toBeInTheDocument();
    });

    test("Renders successfully various gameover states 40 score", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            score: 40,
            highScore: 10,
            startTime: 1,
            endTime: 10,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const gameOver = screen.queryByTestId("gameover");
        expect(gameOver).toBeInTheDocument();
    });

    test("Renders successfully various gameover states 30 score", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            score: 30,
            highScore: 10,
            startTime: 1,
            endTime: 10,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const gameOver = screen.queryByTestId("gameover");
        expect(gameOver).toBeInTheDocument();
    });

    test("Renders successfully various gameover states 20 score", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            score: 20,
            highScore: 10,
            startTime: 1,
            endTime: 10,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const gameOver = screen.queryByTestId("gameover");
        expect(gameOver).toBeInTheDocument();
    });

    test("Renders successfully various gameover states 10 score", () => {
        delete window.ontouchstart;
        const handleEvent = () => {};
        
        const modGameState = {
            ...initialGameState,
            score: 10,
            highScore: 10,
            startTime: 1,
            endTime: 10,
        };

        render(<Canvas 
            isMobile={false}
            gameState={modGameState}
            startGame={handleEvent}
            moveShip={handleEvent}
            shoot={handleEvent}
        />);
        
        const gameOver = screen.queryByTestId("gameover");
        expect(gameOver).toBeInTheDocument();
    });
});