import { checkCollision } from '../utils/functions';

const checkCollisions = (shipFire, birds) => {
    const objectsDestroyed = [];
    birds.forEach((bird) => {
        const calculatedPosition = {
            x: bird.position.x,
            y: bird.position.y,
        };
        const mainBody = {
            x1: calculatedPosition.x - 40, //Will likely need to have offsets here
            y1: calculatedPosition.y - 10,
            x2: calculatedPosition.x + 40,
            y2: calculatedPosition.y + 10,
        };
        const leftWing = {
            x1: calculatedPosition.x - 40, //Will likely need to have offsets here
            y1: calculatedPosition.y - 10,
            x2: calculatedPosition.x + 40,
            y2: calculatedPosition.y + 10,
        };        
        const rightWing = {
            x1: calculatedPosition.x - 40, //Will likely need to have offsets here
            y1: calculatedPosition.y - 10,
            x2: calculatedPosition.x + 40,
            y2: calculatedPosition.y + 10,
        };
        shipFire.forEach((bullet) => {
            const rectB = {
                x1: bullet.position.x - 8,
                y1: bullet.position.y - 8,
                x2: bullet.position.x + 8,
                y2: bullet.position.y + 8,
            };
            if (checkCollision(mainBody, rectB)) {
                objectsDestroyed.push({
                    bulletId: bullet.id,
                    birdId: bird.id,
                    type: 'body'
                });
            }
            if (checkCollision(leftWing, rectB)) {
                objectsDestroyed.push({
                    bulletId: bullet.id,
                    birdId: bird.id,
                    type: 'left'
                });
            }            
            if (checkCollision(rightWing, rectB)) {
                objectsDestroyed.push({
                    bulletId: bullet.id,
                    birdId: bird.id,
                    type: 'left'
                });
            }
        });
    });
    return objectsDestroyed;
};

export default checkCollisions;