import React from 'react';
import './index.css';

function AnimatedButton(props) {
    return (
        <button {...props} class="ui black basic animated button">
            <div class="visible content">
                {props.visibleIcon}
            </div>
            <div class="hidden content">
                {props.hiddenText}
            </div>
        </button>
    )
}

export default AnimatedButton
