import React, { Component } from 'react';
import { birdLegWingDegRatio, birdEyeWiggle, birdBeakWiggle, birdFaceChangeTimeSec, birdWingFlapSpeedDeg, birdWingMaxDeg, birdFlapSpeedSec } from '../utils/constants';
import { scaleCoords } from '../utils/functions';
import PropTypes from 'prop-types';
import BirdFootRight from './BirdLegRight';
import BirdFootLeft from './BirdLegLeft';
import BirdWingRight from './BirdWingRight';
import BirdWingLeft from './BirdWingLeft';
import BirdBody from './BirdBody';
import BirdEyeLeft from './BirdEyeLeft';
import BirdEyeLeftBig from './BirdEyeLeftBig';
import BirdEyeRight from './BirdEyeRight';
import BirdEyeRightBig from './BirdEyeRightBig';
import BirdBeak from './BirdBeak';
import BirdBeakBig from './BirdBeakBig';

class Bird extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'bird';

        this.style = {
            opacity: 1,
            transformBox: 'view-box',
            //transformOrigin: '100% 100%',
        };

        this.faceChangeStamp = (new Date()).getTime();
        this.faceChangeBeak = 0;
        this.faceChangeEyes = 0;
        
        this.getRandom = (min, max) => {
            return Math.random() * (max - min) + min;
        }

        //Hmm - might be a tad unorthodox here, but let's have the flapping here since it's more/less autonomous
        //i.e. nothing else cares about it really.
        this.flapTimeStamp = (new Date()).getTime();
        this.flapDeg = 0;
        this.flapDir = 'down';
    
    }


    render() {
        const now = (new Date()).getTime();
        const { position } = this.props;
        const { left, right } = this.props.wings;
        const { status } = this.props;
        const { direction } = this.props;
        const { fleeStatus } = this.props;

        //This will vary our birds faces to make them look less static/boring
        if (/normal/.test(status)) {
            if(now - this.faceChangeStamp > (1000 * birdFaceChangeTimeSec)) {
                this.faceChangeEyes = scaleCoords(this.getRandom(0.001, birdEyeWiggle));
                if (/left/.test(direction)) {
                    this.faceChangeEyes = 0 - this.faceChangeEyes;
                }
                this.faceChangeBeak = scaleCoords(this.getRandom(-birdBeakWiggle, birdBeakWiggle));
                this.faceChangeStamp = now;
            }
        }

        //Now work on flapping
        if(now - this.flapTimeStamp > (1000 * birdFlapSpeedSec)) {
            if (/down/.test(this.flapDir)) {
                this.flapDeg += birdWingFlapSpeedDeg;
                if (this.flapDeg >= birdWingMaxDeg) {
                    this.flapDir = 'up';
                }
            } else {
                this.flapDeg -= birdWingFlapSpeedDeg;
                if (this.flapDeg <= 0) {
                    this.flapDir = 'down';
                }
            }
            this.flapTimeStamp = now;
        }
        const legDeg = this.flapDeg * birdLegWingDegRatio;        

        let transform = ``;
        if (/flee|enter|gone/.test(status)) {
            transform += ` scale(${fleeStatus})`;
            this.style = {
                ...this.style,
                opacity: fleeStatus,
                transformOrigin: `${position.x}px ${position.y}px`,
            };
        }    
        
        return (
            <g id={`${this.basePartName}${this.id}`} style={this.style} transform={`${transform}`}>
                <BirdFootLeft position={position} id={this.id} rotDeg={-legDeg} />
                <BirdFootRight position={position} id={this.id} rotDeg={legDeg} />
                <BirdWingLeft position={position} id={this.id} rotDeg={-this.flapDeg} scale={left} />
                <BirdWingRight position={position} id={this.id} rotDeg={this.flapDeg} scale={right} />
                <BirdBody position={position} id={this.id} />
                {/struck|flee/.test(status) === true &&
                    <g>
                        <BirdEyeLeftBig position={position} id={this.id} />
                        <BirdEyeRightBig position={position} id={this.id} />
                        <BirdBeakBig position={position} id={this.id} />
                    </g>
                }
                {/struck|flee/.test(status) === false &&
                    <g>
                        <BirdEyeLeft position={position} id={this.id} pupilWiggle={this.faceChangeEyes} />
                        <BirdEyeRight position={position} id={this.id} pupilWiggle={this.faceChangeEyes} />
                        <BirdBeak position={position} id={this.id} beakWiggle={this.faceChangeBeak} />
                    </g>
                }
            </g>
        );
    }
};

Bird.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    direction: PropTypes.oneOf(['left', 'right']),
    id: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['normal', 'flee', 'enter', 'struck', 'gone']),
    fleeStatus: PropTypes.number,
    statusTime: PropTypes.number,
    wings: PropTypes.shape({ //Scaler value for wing if hit. 1 is full scale
        left: PropTypes.number.isRequired,
        right: PropTypes.number.isRequired,
    })
};

Bird.defaultProps = {
    direction: 'right',
    status: 'normal',
    fleeStatus: 1,
    statusTime: 0,
    wings: {
        left: 1,
        right: 1,
    }
};

export default Bird;