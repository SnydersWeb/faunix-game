import { baseGfxHeight, baseGfxWidth, widthHeightRatio, heightWidthRatio, birdMaxVel, birdMinVel, birdWidth, birdHitSpotWidth, birdHitSpotHeight, birdWingWidth, birdWingHeight, shipPosGunOffset, bulletWidth, bulletLength, bulletVelocity } from './constants';

export const calculateCanvas = () => {
    const { innerHeight, innerWidth } = window;
    const aspectRatio = (innerHeight / innerWidth);
    
    let canvasHeight;
    let canvasWidth;
    
    if (aspectRatio > 1.4) { //Screen is way taller than it is wide, likely mobile
        //Let's make height the bounder then
        canvasWidth = innerWidth;
        canvasHeight = innerWidth * heightWidthRatio;
    } else { //Normal screen (I hope)
        canvasHeight = innerHeight;
        canvasWidth = canvasHeight * widthHeightRatio;
    }

    return {
        x: canvasWidth,
        y: canvasHeight
    };
};

export const getIsMobile = () => {
    return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
};

let canvas = {};
export const storeCanvas = canDims => {
    canvas = canDims;
};

export const getCanvas = () => {
    return canvas;
};

export const getScaleFactor = () => {
    return Math.min(canvas.y / baseGfxHeight, canvas.x / baseGfxWidth);
};

export const scaleCoords = (rawCoords, scaleFactor = getScaleFactor()) => {
    let parseCoords = ``;
    if (Number(rawCoords)) {
        parseCoords = `${rawCoords}`;
    } else {
        parseCoords = rawCoords;
    }
    const coordSets = parseCoords.split(' '); // first, split it by " "
    const retArray = coordSets.map(currItem => {
        if (/\d/g.test(currItem)) { // item contains a number
            if (/,/g.test(currItem)) { // item is a coordinate set x,y
                const commaCoords = currItem.split(',');
                const commaCoordRet = commaCoords.map(coord => {
                    return Number(coord) * scaleFactor;
                });
                return commaCoordRet.join(',');
            } else {
                return Number(currItem) * scaleFactor;
            }
        } else { //No number, just push it into the array
            return currItem;
        }
    });
    if (retArray.length > 1) {
        return retArray.join(' ');
    } else {
        return Number(retArray.join(''));
    }
};

export const getRandomInt = (min, max) => {
    return Math.random() * (max - min) + min;
};

export const checkCollision = (rectA, rectB) => (
    rectA.x1 < rectB.x2 && rectA.x2 > rectB.x1 && 
    rectA.y1 < rectB.y2 && rectA.y2 > rectB.y1
);

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

export const moveShipBullets = (shipBullets) => {
    if (shipBullets.length === 0) {
        return shipBullets;
    }
    const velocity = scaleCoords(bulletVelocity);

    const bulletChanges = shipBullets.filter(bullet => (
        bullet.position.y > 0
    )).map(bullet => {
        const { x, y } = bullet.position;
            
        return {
            ...bullet,
            position: {
                x: x,
                y: y - velocity,
            }
        }
    });            
    
    return bulletChanges;
};
