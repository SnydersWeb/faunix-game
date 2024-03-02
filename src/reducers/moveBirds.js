import { birdMaxVel, birdMinVel, birdWidth } from '../utils/constants';
import { scaleCoords, getCanvas } from '../utils/functions';

const moveBirds = (birds) => {
    if(birds.length === 0) {
        return birds;
    }
    
    const getRandom = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    const birdsChanges = birds.filter(bird => (
        /gone/.test(bird.status) === false
    )).map(bird => {
        const { x, y } = bird.position;
        const canvas = getCanvas();
        const { fltDir } = bird;
        let change = scaleCoords(getRandom(birdMinVel, birdMaxVel));
        change = /left/.test(fltDir) ? (0 - change) : change;
        const scaleBirdWith = scaleCoords(birdWidth);

        // Boundry checking so we don't run off our play area
        let dirChange = false;
        let newDir = '';
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
    });            
    
    return birdsChanges;
}

export default moveBirds;