import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class BirdFootRight extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdFootRight';

        this.footStyle = {
            fill: '#adff00',
            stroke: 'none',
            opacity: 1,
        };

        this.rightFootX = scaleCoords(1.3318);
        this.rightFootY = scaleCoords(7.055485);
        this.rightFootPath = scaleCoords('4.678,5.766 c 1.8,.287 1.35,3.473 .787,3.377 -.787,-.066 .415,-2.47 -1.047,-2.293 -1.64,.197 -.036,2.3 -.789,2.325 -.787,.026 -.962,-2.227 -.328,-2.983 l -4.154,-5.438');
    }

    render() {       
        const { x, y } = this.props.position;
        const { rotDeg } = this.props;
        let transform = `rotate(${rotDeg} ${x} ${y})`;
        
        return (
            <path 
                style={this.footStyle} 
                d={`m ${x + this.rightFootX},${y + this.rightFootY} ${this.rightFootPath} z`} 
                id={`${this.basePartName}${this.id}`} 
                transform={`${transform}`}
            />
        );
    }
};

BirdFootRight.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
    rotDeg: PropTypes.number,
};

BirdFootRight.defaultProps = {
    rotDeg: 0,
};

export default BirdFootRight;