import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class BirdBody extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdBody';

        this.bodyStyle = {
            fill: '#00aaff',
            stroke: 'none',
            opacity: 1,
        };
        
        this.bodyPath = scaleCoords('c 3.04035,0.05106 6.52886,6.371127 6.52886,6.371127 0,0 -3.32078,6.976588 -6.49608,6.967368 -3.29199,-0.01 -6.69277,-7.262402 -6.69277,-7.262402 0,0 3.65534,-6.126556 6.65999,-6.076093');
        
    }

    render() {       
        const basePositionX = this.props.position.x; //108.56032
        const basePositionY = this.props.position.y; //210.49629
        
        return (
            <path style={this.bodyStyle} d={`m ${basePositionX},${basePositionY} ${this.bodyPath} z`} id={`${this.basePartName}${this.id}`} />
        );
    }
};

BirdBody.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
};

export default BirdBody;