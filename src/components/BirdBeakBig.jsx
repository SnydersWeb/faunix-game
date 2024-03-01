import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleCoords } from '../utils/functions';

class BirdBeakBig extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'birdBeakBig';
        
        this.hiddenStyle = {
            display: 'none',
        };
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

        this.bigBeakBaseX = scaleCoords(0.04313);
        this.bigBeakBaseY = scaleCoords(9.934362);
        this.bigBeakBaseRadX = scaleCoords(3.1379397);
        this.bigBeakBaseRadY = scaleCoords(3.6048067);
        this.bigBeakToungeX = scaleCoords(0.06515);
        this.bigBeakToungeY = scaleCoords(9.897916);
        this.bigBeakToungePath = scaleCoords('c -0.84295,-0.277125 -1.19509,-0.01358 -1.06152,0.707684 0.16083,0.868525 0.41814,1.962215 0.90069,2.058715 0.48251,0.0965 0.93285,-0.93285 1.0937,-1.962213 0.15426,-0.987281 -0.0899,-1.138243 -0.93287,-0.804186');
        this.bigBeakUpperX = scaleCoords(0.11761);
        this.bigBeakUpperY = scaleCoords(6.318652);
        this.bigBeakUpperPath = scaleCoords('c 1.86869,0.05839 3.09502,1.927083 3.09502,3.562183 0,1.6351 -1.7765,-3.869555 -3.17963,-0.872974 -1.11116,-3.018248 -3.12716,2.450844 -3.12719,0.989773 -4e-5,-1.693498 1.22633,-3.737372 3.2118,-3.678977');
        this.bigBeakLowerX = scaleCoords(2.96812);
        this.bigBeakLowerY = scaleCoords(11.431105);
        this.bigBeakLowerPath = scaleCoords('c 0.70713,-2.402086 -0.81121,0.82753 -2.96852,0.82753 -2.15733,0 -3.56956,-3.196647 -2.96414,-1.007317 0.18593,0.870967 0.95727,2.281207 2.99629,2.277187 1.86834,-0.004 2.93637,-2.0974 2.93637,-2.0974');

    }

    render() {       
        const basePositionX = this.props.position.x; //108.56032
        const basePositionY = this.props.position.y; //210.49629

        return (
            <g id={`${this.basePartName}${this.id}`} style={this.hiddenStyle}>
                <ellipse style={this.bigBeakBaseStyle} id={`${this.basePartName}Base${this.id}`} cx={basePositionX + this.bigBeakBaseX} cy={basePositionY + this.bigBeakBaseY} rx={this.bigBeakBaseRadX} ry={this.bigBeakBaseRadY} />
                <path style={this.bigBeakToungueStyle} d={`m ${basePositionX + this.bigBeakToungeX},${basePositionY + this.bigBeakToungeY} ${this.bigBeakToungePath} z`} id={`${this.basePartName}Tongue${this.id}`} />
                <path style={this.bigBeakStyle} d={`m ${basePositionX + this.bigBeakUpperX},${basePositionY + this.bigBeakUpperY} ${this.bigBeakUpperPath} z`} id={`${this.basePartName}Upper${this.id}`} />
                <path style={this.bigBeakStyle} d={`m ${basePositionX + this.bigBeakLowerX},${basePositionY + this.bigBeakLowerY} ${this.bigBeakLowerPath} z`} id={`${this.basePartName}Lower${this.id}`} />
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