// Main game canvas related stuff
export const updateInterval = 10; //Frequency (in ms) for setInterval in moveObjects (used in App.js)
export const widthHeightRatio = .753; //Width to height aspect ratio
export const heightWidthRatio = 1.327; //Height to width spect ratio
export const baseGfxHeight = 207; //This is what InkScape generally drew it as
export const baseGfxWidth = 201; //This is what InkScape generally drew it as

// Background Element vars
export const numLgStars = 25;
export const numMdStars = 50;
export const numSmStars = 100;
export const lgStarVelocity = 0.8;
export const mdStarVelocity = 0.4;
export const smStarVelocity = 0.2;

// Ship related vars
export const startShotCount = 100; //Adjust to increaes/decrease amount of bullets
export const activeShotCount = 1; //Adjust to increaes/decrease bullets on screen
export const bulletLength = 4.477; //Length of bullet
export const bulletWidth = 0.783; //Width of bullet
export const bulletVelocity = 2; //How fast bullet travels
export const shipBarrelLength = 1.903; //Used to adjust bullet origin point in ship
export const shipPosGunOffset = 0.709; //Used to adjust bullet origin point in ship
export const shipWidth = 4.75; //Ship general width
export const shipMoveRate = .5; //How fast the ship moves
export const shipPylongWiggleDist = .5; //How long the little pylons on the ship move
export const shipPylongWiggleSpeed = 1; //Rate of change for the pylons
export const shipPylonTimeSec = .025; //Timeout value used per frame of the pylon movement

// Bird related vars
export const numBirds = 6;
export const birdVertSpacing = .105; //How much to space the birds apart
export const birdWidth = 10;
export const birdWingFlapSpeedDegMax = 5; //Flap speed increment
export const birdWingFlapSpeedDegMin = 4; //Flap speed increment
export const birdWingMaxDeg = 45; //Max deflection angle for wing
export const birdFlapSpeedSec = .03; //This is the time in seconds to wait between udpates
export const birdLegWingDegRatio = .30; //Legs move when wings do
export const birdEyeWiggle = 0.525;
export const birdBeakWiggle = 0.35;
export const birdFaceChangeTimeSec = .5; //Bird's faces will change slightly
export const birdMaxVel = 0.9; //Max left/right speed
export const birdMinVel = 0.01; //Min left/right speed
export const birdFledTimeSec = 5;  //How long the bird stays away
export const birdFleeSpeed = .1; //How fast does it scale down
export const birdFleeRegrowEnterUpdateSec = .1; //This sets the delay betwen updates
export const birdWingRegrowSpeed = .1; //How fast does the bird wing scale back
export const birdWingRemoveTimeSec = 5; //How long does the bird wing stay blown off
export const birdStruckTimeSec = 1; //How long does the bird stay in stuck state before fleeing
export const birdHitSpotWidth = 13.736; //Main hit spot width
export const birdHitSpotHeight = 13.736; //Main hit spot height
export const birdWingWidth = 13.800; //Wing hit spot width
export const birdWingHeight = 18.561; //Wing hit spot height


