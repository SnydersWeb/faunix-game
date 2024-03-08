
export const getIsMobile = () => {
    return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
};

export const getRandomInt = (min, max) => {
    return Math.random() * (max - min) + min;
};