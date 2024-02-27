let viewBoxStore = [];
export const storeViewBox = viewBox => {
    viewBoxStore = viewBox;
};
export const getScaleFactor = () => {
    const defaultBGWidth = 201;
    return viewBoxStore.length === 4 ? (viewBoxStore[2] / defaultBGWidth) : 1;
};
export const scaleCoords = (rawCoords, scaleFactor = getScaleFactor()) => {
    let parseCoords = ``;
    if(Number(rawCoords)) {
        parseCoords = `${rawCoords}`;
    } else {
        parseCoords = rawCoords;
    }
    const coordSets = parseCoords.split(' '); // first, split it by " "
    const retArray = coordSets.map(currItem => {
        if(/\d/g.test(currItem)) { // item contains a number
            if(/,/g.test(currItem)) { // item is a coordinate set x,y
                const commaCoords = currItem.split(',');
                const commaCoordRet = commaCoords.map(coord => {
                    return Number(coord) * scaleFactor
                });
                return commaCoordRet.join(',');
            } else {
                return Number(currItem) * scaleFactor;
            }
        } else { //No number, just push it into the array
            return currItem;
        }
    });
    if(retArray.length > 1) {
        return retArray.join(' ');
    } else {
        return Number(retArray.join(''));
    }
};


