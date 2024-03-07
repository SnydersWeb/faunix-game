import moveShip from './moveShip';
import { birdStruckTimeSec, birdWingRemoveTimeSec, birdFledTimeSec, birdFleeSpeed, birdWingRegrowSpeed, birdFleeRegrowEnterUpdateSec } from '../utils/constants';
import { moveBird, detectBirdHits } from '../utils/birdFunctions';
import { moveShipBullets } from '../utils/shipFunctions';

// SnyderD - the main purpose of this file is it's our main "animaion core" that handles all autonomous actions beyond
// player control of the ship itself.  This means it will control the bird animations, the ship bullets as well as the 
// detections of "hits".  I've debated using some third party libraries to move elements around the screen but I think 
// it's best (for now) to keep some form of central control of this.
const moveObjects = state => {
    //if (state.gameState.started === false) return state;
    const now = (new Date()).getTime();

    let { score } = state.gameState;

    // Handle ship moving
    const { shipMoving } = state.gameState;
    let { shipPosition } = state.gameState;
    if (/none/.test(shipMoving) === false) {
        let shipMoveState = moveShip(state, shipMoving);
        shipPosition = shipMoveState.gameState.shipPosition;
    }

    // Handle bullets fired
    const { shipFire } = state.gameState;
    
    let bullets = [];
    if (shipFire.length > 0) {
        bullets = moveShipBullets(shipFire);
    }

    const { birds } = state.gameState;
    
    const objectsDestroyed = detectBirdHits(shipFire, birds);
    const bulletsDestroyed = objectsDestroyed.map(object => (object.bulletId));
    const birdDamage = objectsDestroyed.map(object => ({ id: object.birdId, type: object.type }));
    
    //Delete the bullet from the screen if connected
    bullets = bullets.filter(bullet => (bulletsDestroyed.indexOf(bullet.id)));
    
    //Now handle all our bird updates
    const birdUpdates = birds.map((bird) => {
        const { status } = bird;
        //Make a copy of our object here so we don't get into mutation.
        //Manually copy the things we are going to change
        let birdChanges = {
            ...moveBird(bird), //moveBird returns a complete bird with updated direction and position
            status: status,
            statusTime: bird.statusTime,
            fleeStatus: bird.fleeStatus,
            wings: {
                right: bird.wings.right,
                left: bird.wings.left,
                statusTime: bird.wings.statusTime,
            },
        };

        //First handle our bird damage
        const damageBirds = birdDamage.filter(obj => ( obj.id === bird.id ));
        if (damageBirds.length > 0) { //this intersects
            birdChanges.statusTime = now;
            if (/left/.test(damageBirds[0].type)) {
                birdChanges.wings.left = .1;
            } else if (/right/.test(damageBirds[0].type)) {
                birdChanges.wings.right = .1;
            } else if (/body/.test(damageBirds[0].type)) {
                birdChanges.status = 'struck'; //bird hit!
                //Add to the score!
                score += 1;
            }
        }

        //Handle all conditions for our birds
        if (/struck/.test(status)) {
            if (bird.statusTime + (1000 * birdStruckTimeSec) < now) {
                birdChanges.status = 'flee';
                birdChanges.statusTime = now;
            } 
        } else if(/flee/.test(status)) {
            if (bird.statusTime + (1000 * birdFleeRegrowEnterUpdateSec) < now) {
                birdChanges.statusTime = now;
                if (bird.fleeStatus > 0) {
                    birdChanges.fleeStatus -= birdFleeSpeed;
                } else {
                    birdChanges.status = 'gone';
                }
            }
        } else if(/enter/.test(status)) {
            if (bird.statusTime + (1000 * birdFleeRegrowEnterUpdateSec) < now) {
                birdChanges.statusTime = now;
                if (bird.fleeStatus < 1) {
                    birdChanges.fleeStatus += birdFleeSpeed;
                } else {
                    birdChanges.status = 'normal';
                }
            }
        } else if(/gone/.test(status)) {
            if (bird.statusTime + (1000 * birdFledTimeSec) < now) {
                birdChanges.statusTime = now;
                birdChanges.status = 'enter';
                //Restore both wings
                birdChanges.wings.left = 1;
                birdChanges.wings.right = 1;
                birdChanges.wings.statusTime = now;
            }
        } else { //Status "normal" - need code here to check wings and regrow them
            const wingsRegrowthNeeded = (bird.wings.right < 1 || bird.wings.left < 1);
            if (wingsRegrowthNeeded) {
                const wingStatusTime = bird.wings.statusTime;
                if (bird.statusTime + (1000 * birdWingRemoveTimeSec) < now) {
                    //Code to regrow the wings by +=birdWingRegrowSpeed
                    if (wingStatusTime + (1000 * birdFleeRegrowEnterUpdateSec) < now) {
                        if (bird.wings.left < 1) {
                            birdChanges.wings.left += birdWingRegrowSpeed;
                        }
                        if (bird.wings.right < 1) {
                            birdChanges.wings.right += birdWingRegrowSpeed;
                        }
                        birdChanges.wings.statusTime = now;
                    }
                }
            }
        }

        return birdChanges;
        
    });
        
    const newState = {
        ...state,
        gameState: {
            ...state.gameState,
            score: score,
            shipFire: [...bullets],
            shipMoving: shipMoving,
            shipPosition: shipPosition,
            birds: [...birdUpdates],
        },
    };
    
    return newState;
}

export default moveObjects;