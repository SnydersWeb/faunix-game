import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class BirdFootLeft extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdFootLeft';

        this.footStyle = {
            fill: '#adff00',
            stroke: 'none',
            opacity: 1,
        };
        
        this.leftFootX = scaleCoords(-1.30324);
        this.leftFootY = scaleCoords(7.055485);
        this.leftFootPath = scaleCoords('-4.678,5.766 c -1.8,.287 -1.351,3.473 -.787,3.377 .787,-.066 -.416,-2.47 1.046,-2.293 1.64,.197 .036,2.3 .79,2.325 .787,.026 .962,-2.227 .327,-2.983 l 4.154,-5.438');

    }

    render() {       
        const { x, y } = this.props.position;
        const { rotDeg } = this.props;
        let transform = `rotate(${rotDeg} ${x} ${y})`;

        return (
            <path 
                style={this.footStyle} 
                d={`m ${x + this.leftFootX},${y + this.leftFootY} ${this.leftFootPath} z`} 
                id={`${this.basePartName}${this.id}`}
                transform={`${transform}`}
            />
        );
    }
};

BirdFootLeft.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
    rotDeg: PropTypes.number,
};

BirdFootLeft.defaultProps = {
    rotDeg: 0,
};

export default BirdFootLeft;