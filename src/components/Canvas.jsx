import React from 'react';
import PropTypes from 'prop-types';
import { widthHeightRatio } from '../utils/constants';
import { storeCanvas } from '../utils/functions';
import ScrollingBackground from './ScrollingBackground';
import Ship from './Ship';
import ShipBullet from './ShipBullet';

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