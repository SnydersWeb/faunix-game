import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class BirdWingRight extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdWingRight';
        
        this.wingStyle = {
            fill: '#00aaff',
            stroke: 'none',
            opacity: 1,
        };
        
        this.rightWingX = scaleCoords(-1.30324);
        this.rightWingY = scaleCoords(6.87009);
        this.rightWingPath = scaleCoords('c 0.26225,-4.654989 7.80202,-7.703679 10.91628,-7.736461 4.52361,-0.04762 9.99839,3.615298 9.63779,8.008035 -0.3606,4.392741 -0.59007,-1.475173 -1.6063,-1.540737 -1.01623,-0.06556 -0.49172,0.62285 -1.21292,0.62285 -0.72119,0 0.16391,-1.114573 -0.5245,-1.114573 -0.7212,0.03278 0,1.147355 -0.78676,1.147355 -0.78676,0 -0.3606,-1.999679 -0.95067,-1.999679 -0.59007,0 -0.16391,1.999679 -0.85232,1.999679 -0.68842,0 -0.13113,-2.06524 -0.98345,-2.032461 -0.85232,0.03278 0.0656,2.065243 -0.8851,2.032461 -0.95067,-0.03278 -0.0984,-3.015909 -1.70465,-3.015909 -1.6063,0 -0.32781,1.999679 -1.08179,1.999679 -0.75398,0 -0.19669,-0.885103 -0.95067,-0.950667 -0.75397,-0.06556 -0.19669,1.999679 -0.85232,1.966897 -0.65563,-0.03278 0,-1.01623 -0.95067,-1.01623 -0.95066,0 0.62285,1.367507 -2.4914,1.531416 -1.53139,0.08382 -3.19078,0.207609 -4.72055,0.09835');
    }

    render() {       
        const basePositionX = this.props.position.x; //108.56032
        const basePositionY = this.props.position.y; //210.49629
        
        return (
            <path style={this.wingStyle} d={`m ${basePositionX + this.rightWingX},${basePositionY + this.rightWingY} ${this.rightWingPath} z`} id={`${this.basePartName}${this.id}`} />
        );
    }
};

BirdWingRight.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
};

export default BirdWingRight;