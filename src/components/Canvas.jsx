import React from 'react';
import PropTypes from 'prop-types';
import { calculateCanvas, storeCanvas } from '../utils/canvasFunctions';
import { getIsMobile } from '../utils/miscFunctions';
import ScrollingBackground from './ScrollingBackground';
import Ship from './Ship';
import ShipBullet from './ShipBullet';
import Bird from './Bird';
import CurrentScore from './CurrentScore';
import HighScore from './HighScore';
import ShotsRemaining from './ShotsRemaining';
import Title from './Title';
import StartGame from './StartGame';
import MobileControl from './MobileControl';

const Canvas = props => {
    const canvasSize = calculateCanvas();
    storeCanvas(canvasSize);
    const isMobile = getIsMobile();
    const { shipPosition } = props.gameState;
    const { shipMoving } = props.gameState;
    
    return (
        <svg
            id='fauxnix-canvas'
            width={canvasSize.x}
            height={canvasSize.y}
            preserveAspectRatio='xMidYMid meet'
            
        >   
            <ScrollingBackground />
            <HighScore highScore={props.gameState.highScore} />
            <CurrentScore score={props.gameState.score} />
            
            <ShotsRemaining shotsRemaining={props.gameState.shotsRemaining} />
            { props.gameState.shipFire.map(bullet => (
                <ShipBullet
                    key={bullet.id}
                    position={bullet.position}
                />
            ))}
            <Ship 
                position={shipPosition} 
                moving={shipMoving} 
            />
            { props.gameState.birds.map(bird => (
                <Bird
                    key={bird.id}
                    id={bird.id}
                    position={bird.position}
                    fltDir={bird.fltDir}
                    status={bird.status}
                    fleeStatus={bird.fleeStatus}
                    statusTime={bird.statusTime}
                    wings={bird.wings}
                />
            ))}
            {
                (props.gameState.started === false) &&
                <g>
                    <Title />
                    <StartGame mobile={isMobile} onClick={() => props.startGame()} />
                </g>
            }
            {
                isMobile === true &&
                <g>
                    <MobileControl controlType="left" onTouchStart={() => props.moveShip('left')} onTouchEnd={() => props.moveShip('none')} />
                    <MobileControl controlType="fire" onTouchStart={() => props.shoot()} />
                    <MobileControl controlType="right" onTouchStart={() => props.moveShip('right')} onTouchEnd={() => props.moveShip('none')} />
                </g>
            }
        </svg>
    );
};

Canvas.propTypes = {
    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        shotsRemaining: PropTypes.number.isRequired,
        startTime: PropTypes.number.isRequired,
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
            id: PropTypes.number.isRequired,
        })).isRequired,
        birds: PropTypes.arrayOf(PropTypes.shape({
            position: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
            }).isRequired,
            id: PropTypes.number.isRequired,
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