import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BirdFootRight from './BirdLegRight';
import BirdFootLeft from './BirdLegLeft';
import BirdWingRight from './BirdWingRight';
import BirdWingLeft from './BirdWingLeft';
import BirdBody from './BirdBody';
import BirdEyeLeft from './BirdEyeLeft';
import BirdEyeLeftBig from './BirdEyeLeftBig';
import BirdEyeRight from './BirdEyeRight';
import BirdEyeRightBig from './BirdEyeRightBig';
import BirdBeak from './BirdBeak';
import BirdBeakBig from './BirdBeakBig';

class Bird extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.basePartName = 'bird';
    }

    render() {
        const { position } = this.props;

        return (
            <g id={`${this.basePartName}${this.id}`}>
                <BirdFootRight position={position} id={this.id} />
                <BirdFootLeft position={position} id={this.id} />
                <BirdWingLeft position={position} id={this.id} />
                <BirdWingRight position={position} id={this.id} />
                <BirdBody position={position} id={this.id} />
                <BirdEyeLeft position={position} id={this.id} />
                <BirdEyeLeftBig position={position} id={this.id} />
                <BirdEyeRight position={position} id={this.id} />
                <BirdEyeRightBig position={position} id={this.id} />
                <BirdBeak position={position} id={this.id} />
                <BirdBeakBig position={position} id={this.id} />
            </g>
        );
    }
};

Bird.propTypes = {
    position: PropTypes.shape({
        x:  PropTypes.number.isRequired,
        y:  PropTypes.number.isRequired
    }).isRequired,
    id: PropTypes.number.isRequired,
};

export default Bird;