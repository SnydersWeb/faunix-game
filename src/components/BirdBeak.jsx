import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class BirdBeak extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdBeak';
        this.beakBaseStyle = {
            fill: '#000000',
            stroke: 'none',
            opacity: 1,
        };
        this.beakStyle = {
            fill: '#ffcc00',
            stroke: 'none',
            opacity: 1,
        };

        this.beakBaseX = scaleCoords(-0.00512);
        this.beakBaseY = scaleCoords(9.033674);
        this.beakBaseRadX = scaleCoords(1.8029888);
        this.beakBaseRadY = scaleCoords(2.2947128);
        this.beakUpperX = scaleCoords(0.02767);
        this.beakUpperY = scaleCoords(6.706181);
        this.beakUpperPath = scaleCoords('c 1.04901,0.03278 1.73743,1.081794 1.73743,1.999679 0,0.917884 -1.01532,-1.124883 -1.80299,0.557288 -0.62376,-1.694334 -1.73741,0.328471 -1.73743,-0.491721 -2e-5,-0.950668 0.68842,-2.098024 1.80299,-2.065243');
        this.beakLowerX = scaleCoords(1.60119);
        this.beakLowerY = scaleCoords(10.213813);
        this.beakLowerPath = scaleCoords('c 0.38683,-1.31403 -0.42616,0.06556 -1.60629,0.06556 -1.18014,0 -1.97028,-1.361555 -1.63909,-0.16391 0.10171,0.476449 0.52366,1.247902 1.63908,1.245702 1.02205,-0.002 1.6063,-1.147352 1.6063,-1.147352');
    }

    render() {       
        const basePositionX = this.props.position.x; //108.56032
        const basePositionY = this.props.position.y; //210.49629
        
        return (
            <g id={`${this.basePartName}${this.id}`}>
                <ellipse style={this.beakBaseStyle} id={`${this.basePartName}Base${this.id}`} cx={basePositionX + this.beakBaseX} cy={basePositionY + this.beakBaseY} rx={this.beakBaseRadX} ry={this.beakBaseRadY} />
                <path style={this.beakStyle} d={`m ${basePositionX + this.beakUpperX},${basePositionY + this.beakUpperY} ${this.beakUpperPath} z`} id={`${this.basePartName}Upper${this.id}`} />
                <path style={this.beakStyle} d={`m ${basePositionX + this.beakLowerX},${basePositionY + this.beakLowerY} ${this.beakLowerPath} z`} id={`${this.basePartName}Lower${this.id}`} />
            </g>
        );
    }
};

BirdBeak.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
};

export default BirdBeak;