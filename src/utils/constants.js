// Main game canvas related stuff
export const gameHeight = 1200;
export const gameWidth = 900;
export const updateInterval = 10;
export const widthHeightRatio = .75;
export const heightWidthRatio = 1.33;
export const baseGfxHeight = 207; // This is what InkScape generally drew it as
export const baseGfxWidth = 201; // This is what InkScape generally drew it as

// Background Element vars
export const numLgStars = 25;
export const numMdStars = 50;
export const numSmStars = 100;
export const lgStarVelocity = 0.8;
export const mdStarVelocity = 0.4;
export const smStarVelocity = 0.2;

// Ship related vars
export const activeBulletCount = 1;
export const bulletLength = 4.4767156;
export const bulletWidth = 0.78343964;
export const bulletVelocity = 2;
export const shipBarrelLength = 1.90261;
export const shipPosGunOffset = 0.70882;
export const shipWidth = 4.75;
export const shipMoveRate = 2;
export const shipPylongWiggleDist = .5;
export const shipPylongWiggleSpeed = 1;

// Bird related vars
export const numBirds = 5;
export const birdVertSpacing = .125;
export const birdWidth = 10;
export const birdWingFlapSpeedDeg = 5; //Flap speed increment
export const birdWingMaxDeg = 50; //Max deflection angle for wing
export const birdFlapSpeedSec = .03;
export const birdLegWingDegRatio = .30; //Legs move when wings do
export const birdEyeWiggle = 0.52450579;
export const birdBeakWiggle = 0.35;
export const birdFaceChangeTimeSec = .5; //Bird's faces will change slightly
export const birdMaxVel = 0.9; //Max left/right speed
export const birdMinVel = 0.01; //Min left/right speed
export const birdFledTimeSec = 30; //How long the bird stays away
export const birdFleeSpeed = 5; //How fast does the bird scale away
export const birdWingRegrowSpeed = 5; //How fast does the bird wing scale back
export const birdWingRemoveTimeSec = 5; //How long does the bird wing stay blown off
export const birdStruckTimeSec = 1; //How long does the bird stay in stuck state before fleeing


