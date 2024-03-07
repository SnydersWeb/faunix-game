import { scaleCoords, getCanvas } from './canvasFunctions';
import { getRandomInt } from './miscFunctions';
import { birdMaxVel, birdMinVel, birdWidth, birdHitSpotWidth, birdHitSpotHeight, birdWingWidth, birdWingHeight, shipPosGunOffset, bulletWidth, bulletLength } from './constants';

export const moveBird = (bird) => {
    const { x, y } = bird.position;
    const canvas = getCanvas();
    const { fltDir } = bird;
    let change = scaleCoords(getRandomInt(birdMinVel, birdMaxVel));
    change = /left/.test(fltDir) ? (0 - change) : change;
    const scaleBirdWith = scaleCoords(birdWidth);
    let dirChange = false;
    let newDir = '';

    // Boundry checking so we don't run off our play area
    if (x + change > (canvas.x - scaleBirdWith)) {
        change = 0;
        dirChange = true;
        newDir = 'left';
    } else if (x + change < 0 + scaleBirdWith) {
        change = 0;
        dirChange = true;
        newDir = 'right';
    }
    
    return {
        ...bird,
        position: {
            x: x + change,
            y: y,
        },
        fltDir: dirChange ? newDir : fltDir,
    };
};

const checkCollision = (rectA, rectB) => (
    rectA.x1 < rectB.x2 && rectA.x2 > rectB.x1 && 
    rectA.y1 < rectB.y2 && rectA.y2 > rectB.y1
);

export const detectBirdHits = (shipFire, birds) => {
    const objectsDestroyed = [];

    //Bird position is actually at the top of their head
    const birdBodyWidthScaled = scaleCoords(birdHitSpotWidth);
    const birdBodyHeightScaled = scaleCoords(birdHitSpotHeight);
    const birdWingWidthScaled = scaleCoords(birdWingWidth);
    const birdWingHeightScaled = scaleCoords(birdWingHeight);
    const bulletXOffsetScaled = scaleCoords(shipPosGunOffset);
    const bulletWidthScaled = scaleCoords(bulletWidth);
    const bulletHeightScaled = scaleCoords(bulletLength);
    const birdWingOffset = birdBodyWidthScaled/2;

    birds.forEach((bird) => {
        const calculatedPosition = {
            x: bird.position.x,
            y: bird.position.y,
        };
        const { left, right } = bird.wings; //Check the status of the wings before we count a "hit"
        const { status } = bird;

        //Default to an unhittable hitbox for both wings
        let leftWing = {
            x1: calculatedPosition.x,
            y1: calculatedPosition.y,
            x2: calculatedPosition.x,
            y2: calculatedPosition.y,
        };
        let rightWing = {
            x1: calculatedPosition.x,
            y1: calculatedPosition.y,
            x2: calculatedPosition.x,
            y2: calculatedPosition.y,
        };
        
        if (/normal/.test(status)) { //only birds in "normal" should be "hittable"
            const mainBody = {
                x1: calculatedPosition.x - birdBodyWidthScaled/2,
                y1: calculatedPosition.y,
                x2: calculatedPosition.x + birdBodyWidthScaled/2,
                y2: calculatedPosition.y + birdBodyHeightScaled,
            };
            if (left === 1) { //Make the hitbox full size
                leftWing = {
                    x1: calculatedPosition.x - (birdWingOffset + birdWingWidthScaled),
                    y1: calculatedPosition.y,
                    x2: calculatedPosition.x - birdWingOffset,
                    y2: calculatedPosition.y + birdWingHeightScaled,
                };        
            }
            if (right === 1) {
                rightWing = { //Make the hitbox full size
                    x1: calculatedPosition.x,
                    y1: calculatedPosition.y,
                    x2: calculatedPosition.x + birdWingWidthScaled,
                    y2: calculatedPosition.y + birdWingHeightScaled,
                };
            }
        
            shipFire.forEach((bullet) => {
                const bulletBox = {
                    x1: (bullet.position.x + bulletXOffsetScaled),
                    y1: bullet.position.y,
                    x2: (bullet.position.x + bulletXOffsetScaled) + bulletWidthScaled,
                    y2: bullet.position.y - bulletHeightScaled,
                };
                let hit = false;

                if (left === 1) {
                    if (checkCollision(leftWing, bulletBox)) {
                        hit = true;
                        objectsDestroyed.push({
                            bulletId: bullet.id,
                            birdId: bird.id,
                            type: 'left'
                        });
                    }
                } 
                if (right === 1) {
                    if (checkCollision(rightWing, bulletBox)) {
                        hit = true;
                        objectsDestroyed.push({
                            bulletId: bullet.id,
                            birdId: bird.id,
                            type: 'right'
                        });
                    }
                } 
                if (hit === false && checkCollision(mainBody, bulletBox)) {
                    objectsDestroyed.push({
                        bulletId: bullet.id,
                        birdId: bird.id,
                        type: 'body'
                    });
                }            
            });
        }
    });

    return objectsDestroyed;
};