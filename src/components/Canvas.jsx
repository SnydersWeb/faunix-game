import React from 'react';
import PropTypes from 'prop-types';
import { widthHeightRatio } from '../utils/constants';
import { storeCanvas } from '../utils/functions';
import ScrollingBackground from './ScrollingBackground';
import Ship from './Ship';
import ShipBullet from './ShipBullet';
import Bird from './Bird';

const Canvas = props => {
    const { innerHeight } = window;
    const canvasHeight = innerHeight;
    const canvasWidth = canvasHeight * widthHeightRatio;
    storeCanvas({
        x: canvasWidth,
        y: canvasHeight
    });
    
    const { shipPosition } = props.gameState;
    const { shipMoving } = props.gameState;
    const { pylonMoveFactor } = props.gameState;
    const { background } = props.gameState;
    
    return (
        <svg
            id='fauxnix-canvas'
            width={canvasWidth}
            height={canvasHeight}
            preserveAspectRatio='xMinYMid meet'
        >   
            <ScrollingBackground 
                lgStarsPos={ background.lgStarsPos } 
                mdStarsPos={ background.mdStarsPos } 
                smStarsPos={ background.smStarsPos } 
            />
            { props.gameState.shipFire.map(bullet => (
                <ShipBullet
                    key={bullet.id}
                    position={bullet.position}
                />
            ))}
            <Ship 
                position={shipPosition} 
                moving={shipMoving} 
                pylonMoveFactor={pylonMoveFactor} 
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
        </svg>
    );
};

Canvas.propTypes = {
    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        shipPosition: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }).isRequired,
        pylonMoveFactor: PropTypes.number,
        pylonMoveIn: PropTypes.bool,    
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
            }).isRequired,
        })).isRequired,
        background: PropTypes.shape({
            lgStarsPos: PropTypes.arrayOf(PropTypes.shape({
                    x:  PropTypes.number.isRequired,
                    y:  PropTypes.number.isRequired,
                }).isRequired,
            ).isRequired,
            mdStarsPos: PropTypes.arrayOf(PropTypes.shape({
                    x:  PropTypes.number.isRequired,
                    y:  PropTypes.number.isRequired,
                }).isRequired,
            ).isRequired,
            smStarsPos: PropTypes.arrayOf(PropTypes.shape({
                    x:  PropTypes.number.isRequired,
                    y:  PropTypes.number.isRequired,
                }).isRequired,
            ).isRequired,  
        }).isRequired,
    }).isRequired,
    startGame: PropTypes.func.isRequired,
};


Canvas.defaultProps = {
    gameState: {
        pylonMoveFactor: 0,
        pylonMoveIn: false,
    }
};

export default Canvas;