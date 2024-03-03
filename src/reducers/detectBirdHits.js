import { checkCollision, scaleCoords } from '../utils/functions';
import { birdHitSpotWidth, birdHitSpotHeight, birdWingWidth, birdWingHeight, shipPosGunOffset, bulletWidth, bulletLength } from '../utils/constants';

const detectBirdHits = (shipFire, birds) => {
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
        
        if (/normal/.test(status)) { //only birds in "normal" should be "hittable"
            const mainBody = {
                x1: calculatedPosition.x - birdBodyWidthScaled/2,
                y1: calculatedPosition.y,
                x2: calculatedPosition.x + birdBodyWidthScaled/2,
                y2: calculatedPosition.y + birdBodyHeightScaled,
            };
            const leftWing = {
                x1: calculatedPosition.x - (left * (birdWingOffset + birdWingWidthScaled)),
                y1: calculatedPosition.y,
                x2: calculatedPosition.x - (left * birdWingOffset),
                y2: calculatedPosition.y + birdWingHeightScaled,
            };        
            const rightWing = {
                x1: calculatedPosition.x + (right * birdWingOffset),
                y1: calculatedPosition.y,
                x2: calculatedPosition.x + (right * (birdWingOffset + birdWingWidthScaled)),
                y2: calculatedPosition.y + birdWingHeightScaled,
            };
        
            shipFire.forEach((bullet) => {
                const bulletBox = {
                    x1: (bullet.position.x + bulletXOffsetScaled),
                    y1: bullet.position.y,
                    x2: (bullet.position.x + bulletXOffsetScaled) + bulletWidthScaled,
                    y2: bullet.position.y - bulletHeightScaled,
                };

                if (checkCollision(leftWing, bulletBox)) {
                    objectsDestroyed.push({
                        bulletId: bullet.id,
                        birdId: bird.id,
                        type: 'left'
                    });
                } else if (checkCollision(rightWing, bulletBox)) {
                    objectsDestroyed.push({
                        bulletId: bullet.id,
                        birdId: bird.id,
                        type: 'right'
                    });
                } else if (checkCollision(mainBody, bulletBox)) {
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

export default detectBirdHits;