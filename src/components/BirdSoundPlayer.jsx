import PropTypes from 'prop-types';
import { soundVol } from '../utils/constants';
import useSound from 'use-sound';
import squawkSfx from '../sounds/squawk.mp3';
import wingHitSfx from '../sounds/wingHit.mp3';

const BirdSoundPlayer =  props => {
    const { soundType } = props;
    const { soundSpeed } = props;
    let sfx = null;
    
    if (soundType === 'struck') {
        sfx = squawkSfx;
    } else if (soundType === 'wing') {
        sfx = wingHitSfx;
    }
    const [play] = useSound(sfx, {
        playbackRate: soundSpeed,
        interrupt: false,
        volume: soundVol,
    });

    play();

    return null; //non-rendering component
};

BirdSoundPlayer.propTypes = {
    soundType: PropTypes.oneOf(['struck', 'wing', 'none']).isRequired,
};

export default BirdSoundPlayer;