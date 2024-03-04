import React from 'react';

const Title = () => {
    const textStyle = {
        fontFamily: '"Press Start 2P", cursive',
        fontSize: 120,
        fill: '#cbca62',
    };
    const textStyl2 = {
        fontFamily: '"Press Start 2P", cursive',
        fontSize: 20,
        fill: '#cbca62',
    };
    return (
        <g>
            <text {...textStyle}>
                Fauxnix
            </text>
            <text {...textStyle2}>
                (definintely not Phoenix)
            </text>
        </g>
    );
};

export default Title;