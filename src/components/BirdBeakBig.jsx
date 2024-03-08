import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/canvasFunctions';

class BirdBeakBig extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdBeakBig';
        
        this.bigBeakBaseStyle = {
            fill: '#000000',
            stroke: 'none',
            opacity: 1,
        };
        this.bigBeakStyle = {
            fill: '#ffcc00',
            stroke: 'none',
            opacity: 1,
        };
        this.bigBeakToungueStyle = {
            fill: '#ff0000',
            stroke: 'none',
            opacity: 1,
        };

        this.bigBeakBaseX = scaleCoords(0.043);
        this.bigBeakBaseY = scaleCoords(9.994);
        this.bigBeakBaseRadX = scaleCoords(3.138);
        this.bigBeakBaseRadY = scaleCoords(3.585);
        this.bigBeakToungeX = scaleCoords(0.065);
        this.bigBeakToungeY = scaleCoords(9.898);
        this.bigBeakToungePath = scaleCoords('c -.843,-.277 -1.195,-.013 -1.061,.708 .16,.869 .418,1.962 .9,2.059 .483,.096 .933,-.933 1.094,-1.962 .154,-.988 -.09,-1.139 -.933,-.805');
        this.bigBeakUpperX = scaleCoords(0.118);
        this.bigBeakUpperY = scaleCoords(6.319);
        this.bigBeakUpperPath = scaleCoords('c 1.868,.059 3.095,1.927 3.095,3.562 0,1.635 -1.777,-3.87 -3.18,-.873 -1.111,-3.018 -3.127,2.451 -3.127,.99 0,-1.693 1.226,-3.737 3.212,-3.679');
        this.bigBeakLowerX = scaleCoords(2.968);
        this.bigBeakLowerY = scaleCoords(11.431);
        this.bigBeakLowerPath = scaleCoords('c .707,-2.402 -.811,.827 -2.968,.827 -2.158,0 -3.57,-3.196 -2.965,-1.007 .186,.87 .958,2.281 2.997,2.277 1.868,-.004 2.936,-2.097 2.936,-2.097');

    }

    render() {       
        const { x, y } = this.props.position;        
        
        return (
            <g id={`${this.basePartName}${this.id}`} data-testid={`${this.basePartName}`}>
                <ellipse style={this.bigBeakBaseStyle} id={`${this.basePartName}Base${this.id}`} cx={x + this.bigBeakBaseX} cy={y + this.bigBeakBaseY} rx={this.bigBeakBaseRadX} ry={this.bigBeakBaseRadY} />
                <path style={this.bigBeakToungueStyle} d={`m ${x + this.bigBeakToungeX},${y + this.bigBeakToungeY} ${this.bigBeakToungePath} z`} id={`${this.basePartName}Tongue${this.id}`} />
                <path style={this.bigBeakStyle} d={`m ${x + this.bigBeakUpperX},${y + this.bigBeakUpperY} ${this.bigBeakUpperPath} z`} id={`${this.basePartName}Upper${this.id}`} />
                <path style={this.bigBeakStyle} d={`m ${x + this.bigBeakLowerX},${y + this.bigBeakLowerY} ${this.bigBeakLowerPath} z`} id={`${this.basePartName}Lower${this.id}`} />
            </g>
        );
    }
};

BirdBeakBig.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
};

export default BirdBeakBig;