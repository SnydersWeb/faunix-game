import React from 'react';
import PropTypes from 'prop-types';
import { calculateCanvas, storeCanvas } from '../utils/canvasFunctions';
import ScrollingBackground from './ScrollingBackground';
import Ship from './Ship';
import ShipBullet from './ShipBullet';
import ShootSoundPlayer from './ShootSoundPlayer';
import Bird from './Bird';
import CurrentScore from './CurrentScore';
import HighScore from './HighScore';
import ShotsRemaining from './ShotsRemaining';
import Title from './Title';
import GameOver from './GameOver';
import StartGame from './StartGame';
import MobileControl from './MobileControl';

const Canvas = props => {
    const canvasSize = calculateCanvas();
    storeCanvas(canvasSize);
    const { isMobile } = props;
    const { gameState } = props;
    const { shipPosition } = gameState;
    const { shipMoving } = gameState;
    const playSound = gameState.shipFire.filter(x => x.sound === true)?.length > 0;
    
    return (
        <svg
            id='fauxnix-canvas'
            width={canvasSize.x}
            height={canvasSize.y}
            preserveAspectRatio='xMidYMid meet'
            data-testid="canvas"
            onTouchEnd={() => props.moveShip('none')} //Tad janky here
        >   
            <ScrollingBackground />
            <HighScore highScore={gameState.highScore} />
            <CurrentScore score={gameState.score} />
            
            <ShotsRemaining shotsRemaining={gameState.shotsRemaining} />
            { gameState.shipFire.map(bullet => (
                <ShipBullet
                    key={bullet.id}
                    position={bullet.position}
                    sound={bullet.sound}
                />
            ))}
            { playSound === true && 
                <ShootSoundPlayer />
            }
            <Ship 
                position={shipPosition} 
                moving={shipMoving} 
            />
            { gameState.birds.map(bird => (
                <Bird
                    key={bird.id}
                    id={bird.id}
                    position={bird.position}
                    fltDir={bird.fltDir}
                    status={bird.status}
                    fleeStatus={bird.fleeStatus}
                    statusTime={bird.statusTime}
                    wings={bird.wings}
                    sound={bird.sound}
                    soundType={bird.soundType}
                    soundSpeed={bird.soundSpeed}
                />
            ))}
            {   (gameState.started === false) &&
                <g>
                    <Title />
                    <GameOver 
                        startTime={gameState.startTime} 
                        endTime={gameState.endTime} 
                        score={gameState.score} 
                        highScore={gameState.highScore} 
                    />
                    <StartGame mobile={isMobile} onClick={() => props.startGame()} />
                </g>
            }
            {   isMobile === true &&
                <g>
                    <MobileControl controlType="left" onTouchStart={() => props.moveShip('left')} />
                    <MobileControl controlType="fire" onTouchStart={() => props.shoot()} />
                    <MobileControl controlType="right" onTouchStart={() => props.moveShip('right')} />
                </g>
            }
        </svg>
    );
};

Canvas.propTypes = {
    isMobile: PropTypes.bool.isRequired,    
    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        shotsRemaining: PropTypes.number.isRequired,
        startTime: PropTypes.number.isRequired,
        endTime: PropTypes.number.isRequired,
        score: PropTypes.number.isRequired,
        highScore: PropTypes.number.isRequired,
        shipPosition: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }).isRequired,
        shipMoving: PropTypes.oneOf(['left', 'right', 'none']).isRequired,
        shipFire: PropTypes.arrayOf(PropTypes.shape({
            position: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
            }).isRequired,
            sound: PropTypes.bool.isRequired,
            id: PropTypes.number.isRequired,
        })).isRequired,
        birds: PropTypes.arrayOf(PropTypes.shape({
            position: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
            }).isRequired,
            id: PropTypes.number.isRequired,
            sound: PropTypes.bool.isRequired,
            soundType: PropTypes.oneOf(['struck', 'wing', 'none']).isRequired,
            soundSpeed: PropTypes.number,
            fltDir: PropTypes.oneOf(['left', 'right']).isRequired,
            status: PropTypes.oneOf(['normal', 'flee', 'enter', 'struck', 'gone']).isRequired,
            fleeStatus: PropTypes.number.isRequired,
            statusTime: PropTypes.number.isRequired,
            wings: PropTypes.shape({ //Scaler value for wing if hit. 1 is full scale
                left: PropTypes.number.isRequired,
                right: PropTypes.number.isRequired,
                statusTime: PropTypes.number.isRequired,
            }).isRequired,
        })).isRequired,
    }).isRequired,
    startGame: PropTypes.func.isRequired,
    moveShip: PropTypes.func.isRequired,
    shoot: PropTypes.func.isRequired,
};

export default Canvas;