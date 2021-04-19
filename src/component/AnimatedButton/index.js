import React from 'react';
import './index.css';

function AnimatedButton(props) {
    return (
        <button {...props} className="ui black basic animated button">
            <div className="visible content">
                {props.visibleIcon}
            </div>
            <div className="hidden content">
                {props.hiddenText}
            </div>
        </button>
    )
}

export default AnimatedButton
