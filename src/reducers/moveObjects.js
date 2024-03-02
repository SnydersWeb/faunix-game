import moveShipBullets from './moveShipBullets';
import moveBirds from './moveBirds';
import { scaleCoords, getCanvas } from '../utils/functions';
import { lgStarVelocity, mdStarVelocity, smStarVelocity } from '../utils/constants';


// SnyderD - the main purpose of this file is it's our main "animaion core" that handles all autonomous actions beyond
// player control of the ship itself.  This means it will control the bird animations, the ship bullets as well as the 
// detections of "hits".  I've debated using some third party libraries to move elements around the screen but I think 
// it's best (for now) to keep some form of central control of this.
const moveStars = (aryStars, moveFactor, playField) => {
    return aryStars.map(pos => {
        let retVal = pos.y += moveFactor;
        if (retVal > playField) {
            retVal = retVal - playField;
        }
        return {
            ...pos,
            y: retVal,
        }
    });
}


const moveObjects = (state, action) => {
    if (state.gameState.started === false) return state;
    const playFieldSize = getCanvas();
    
    // Handle bullets fired
    const { shipFire } = state.gameState;
    
    let bullets = [];
    if (shipFire.length > 0) {
        bullets = moveShipBullets(shipFire);
    }

    const { birds } = state.gameState;
    let birdUpdates = [];
    if (birds.length > 0) {
        birdUpdates = moveBirds(birds);
    }

    // const objectsDestroyed = checkCollisions(cannonBalls, flyingObjects);
    // const birdsDestroyed = objectsDestroyed.map(object => (object.cannonBallId));
    // const flyingDiscsDestroyed = objectsDestroyed.map(object => (object.flyingDiscId));

    // Handle background stuffs
    const { background } = state.gameState;
    const smStarMove = scaleCoords(smStarVelocity);
    const mdStarMove = scaleCoords(mdStarVelocity);
    const lgStarMove = scaleCoords(lgStarVelocity);
    const newSmStarPos = moveStars(background.smStarsPos, smStarMove, playFieldSize.y);
    const newMdStarPos = moveStars(background.mdStarsPos, mdStarMove, playFieldSize.y);
    const newLgStarPos = moveStars(background.lgStarsPos, lgStarMove, playFieldSize.y);
    
    const newState = {
        ...state,
        gameState: {
            ...state.gameState,
            shipFire: [...bullets],
            birds: [...birdUpdates],
            background: {
                smStarsPos: newSmStarPos,
                mdStarsPos: newMdStarPos,
                lgStarsPos: newLgStarPos,
            }
        },
    };
    
    return newState;
}

export default moveObjects;