import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class BirdWingLeft extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdWingLeft';

        this.wingStyle = {
            fill: '#00aaff',
            stroke: 'none',
            opacity: 1,
        };

        this.leftWingX = scaleCoords(-0.081);
        this.leftWingY = scaleCoords(6.870);
        this.leftWingPath = scaleCoords('c -0.263,-4.655 -7.803,-7.704 -10.917,-7.736 -4.523,-0.048 -9.998,3.615 -9.638,8.008 0.361,4.392 0.590,-1.476 1.607,-1.541 1.016,-0.066 0.491,0.623 1.213,0.623 0.72,0 -0.164,-1.115 0.524,-1.115 0.721,0.033 0,1.148 0.787,1.148 0.787,0 0.361,-2 0.951,-2 0.590,0 0.164,2 0.852,2 0.688,0 0.131,-2.065 0.983,-2.032 0.852,0.033 -0.0656,2.065 0.885,2.032 0.951,-0.033 0.098,-3.016 1.705,-3.016 1.606,0 0.328,2 1.082,2 0.754,0 0.197,-0.885 0.951,-0.951 0.754,-0.066 0.197,2 0.852,1.967 0.656,-0.033 0,-1.016 0.950,-1.016 0.951,0 -0.623,1.368 2.492,1.532 1.531,0.084 3.19,0.207 4.72,0.098');
    }

    render() {       
        const { x, y } = this.props.position;    
        
        const { rotDeg } = this.props;
        const { scale } = this.props;
        let transform = '';
        let wingStyle = this.wingStyle;
        // SnyderD - Less than ideal here.. seems rotating AND scaling is very problematic here.  So let's do either/or with scaling 
        // taking the priority - once it's back to full scale it'll start flapping again normally.
        if (scale < 1) {
            transform = `scale(${scale})`;
            wingStyle = {
                ...this.wingStyle,
                opacity: .4,
                transformBox: 'fill-box',
                transformOrigin: '100% 100%',
            };
        } else {
            transform = `rotate(${rotDeg} ${x} ${y})`;
        }
        
        return (
            <path 
                style={wingStyle} 
                d={`m ${x + this.leftWingX},${y + this.leftWingY} ${this.leftWingPath} z`} 
                id={`${this.basePartName}${this.id}`} 
                transform={`${transform}`}
            />
        );
    }
};

BirdWingLeft.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
    scale: PropTypes.number,
    rotDeg: PropTypes.number,
};

BirdWingLeft.defaultProps = {
    scale: 1,
    rotDeg: 0,
};

export default BirdWingLeft;