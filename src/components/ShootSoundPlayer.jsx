import useSound from "use-sound";
import { soundVol } from '../utils/constants';
import shootSfx from '../sounds/shoot.mp3';

const ShootSoundPlayer =  () => {
    const [play] = useSound(shootSfx, {
        playbackRate: 1,
        interrupt: true,
        volume: soundVol,
    });

    play();

    return null; //non-rendering component
};

export default ShootSoundPlayer;