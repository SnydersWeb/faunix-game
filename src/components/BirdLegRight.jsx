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
        this.rightFootPath = scaleCoords('4.67818,5.766122 c 1.79868,0.287 1.3508,3.47299 0.78675,3.37649 -0.78675,-0.0655 0.41563,-2.46901 -1.04655,-2.29286 -1.63967,0.19753 -0.0358,2.30108 -0.78922,2.32565 -0.78702,0.0256 -0.9622,-2.22758 -0.32781,-2.98313 l -4.15368,-5.438292');
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