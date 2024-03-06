import { baseGfxHeight, baseGfxWidth, widthHeightRatio, heightWidthRatio } from './constants';

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

