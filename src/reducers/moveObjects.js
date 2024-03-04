import moveShipBullets from './moveShipBullets';
import moveBirds from './moveBirds';
import { scaleCoords, getCanvas } from '../utils/functions';
import { lgStarVelocity, mdStarVelocity, smStarVelocity, birdStruckTimeSec, birdWingRemoveTimeSec, birdFledTimeSec, birdFleeSpeed, birdWingRegrowSpeed, birdFleeRegrowEnterUpdateSec } from '../utils/constants';
import detectBirdHits from './detectBirdHits';


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
    const now = (new Date()).getTime();

    let { score } = state.gameState;

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

    const objectsDestroyed = detectBirdHits(shipFire, birds);
    const bulletsDestroyed = objectsDestroyed.map(object => (object.bulletId));
    const birdDamage = objectsDestroyed.map(object => ({ id: object.birdId, type: object.type }));
    
    //Delete the bullet from the screen if connected
    bullets = bullets.filter(bullet => (bulletsDestroyed.indexOf(bullet.id)));

    //Now handle general status updates
    birdUpdates.forEach((bird) => {
        const { status } = bird;
        //First handle our bird damage
        const damageBirds = birdDamage.filter(obj => ( obj.id === bird.id ));
        if (damageBirds.length > 0) { //this intersects
            bird.statusTime = now;
            if (/left/.test(damageBirds[0].type)) {
                bird.wings.left = .1;
            } else if (/right/.test(damageBirds[0].type)) {
                bird.wings.right = .1;
            } else if (/body/.test(damageBirds[0].type)) {
                bird.status = 'struck'; //bird hit!
                //Add to the score!
                score += 1;
            }
        }

        //Handle all conditions for our birds
        if (/struck/.test(status)) {
            if (bird.statusTime + (1000 * birdStruckTimeSec) < now) {
                bird.status = 'flee';
                bird.statusTime = now;
            } 
        } else if(/flee/.test(status)) {
            if (bird.statusTime + (1000 * birdFleeRegrowEnterUpdateSec) < now) {
                bird.statusTime = now;
                if (bird.fleeStatus > 0) {
                    bird.fleeStatus -= birdFleeSpeed;
                } else {
                    bird.status = 'gone';
                }
            }
        } else if(/enter/.test(status)) {
            if (bird.statusTime + (1000 * birdFleeRegrowEnterUpdateSec) < now) {
                bird.statusTime = now;
                if (bird.fleeStatus < 1) {
                    bird.fleeStatus += birdFleeSpeed;
                } else {
                    bird.status = 'normal';
                }
            }
        } else if(/gone/.test(status)) {
            if (bird.statusTime + (1000 * birdFledTimeSec) < now) {
                bird.statusTime = now;
                bird.status = 'enter';
                //Restore both wings
                bird.wings.left = 1;
                bird.wings.right = 1;
                bird.wings.statusTime = now;
            }
        } else { //Status "normal" - need code here to check wings and regrow them
            const wingsRegrowthNeeded = (bird.wings.right < 1 || bird.wings.left < 1);
            if (wingsRegrowthNeeded) {
                const wingStatusTime = bird.wings.statusTime;
                if (bird.statusTime + (1000 * birdWingRemoveTimeSec) < now) {
                    //Code to regrow the wings by +=birdWingRegrowSpeed
                    if (wingStatusTime + (1000 * birdFleeRegrowEnterUpdateSec) < now) {
                        if (bird.wings.left < 1) {
                            bird.wings.left += birdWingRegrowSpeed;
                        }
                        if (bird.wings.right < 1) {
                            bird.wings.right += birdWingRegrowSpeed;
                        }
                        bird.wings.statusTime = now;
                    }
                }
            }
        }
        
    });

    
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
            score: score,
            shipFire: [...bullets],
            birds: [...birdUpdates],
            background: {
                smStarsPos: newSmStarPos,
                mdStarsPos: newMdStarPos,
                lgStarsPos: newLgStarPos,
            },
        },
    };
    
    return newState;
}

export default moveObjects;