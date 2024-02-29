import { scaleCoords } from '../utils/functions';
import { bulletVelocity } from '../utils/constants';

const moveShipBullets = (shipBullets) => {
    if(shipBullets.length === 0) {
        return shipBullets;
    }
    const velocity = scaleCoords(bulletVelocity);

    const bulletChanges = shipBullets.filter(bullet => (
        bullet.position.y > 0
    )).map(bullet => {
        const { x, y } = bullet.position;
            
        return {
            ...bullet,
            position: {
                x: x,
                y: y - velocity,
            }
        }
    });            
    
    return bulletChanges;
}

export default moveShipBullets;