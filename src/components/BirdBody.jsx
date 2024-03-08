import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/canvasFunctions';

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
        
        this.bodyPath = scaleCoords('c 3.04,0.051 6.529,6.371 6.529,6.371 0,0 -3.321,6.977 -6.496,6.967 -3.292,-0.01 -6.693,-7.262 -6.693,-7.262 0,0 3.655,-6.127 6.66,-6.08');
    }

    render() {       
        const { x, y } = this.props.position;        
        
        return (
            <path style={this.bodyStyle} d={`m ${x},${y} ${this.bodyPath} z`} id={`${this.basePartName}${this.id}`} data-testid={`${this.basePartName}`} />
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