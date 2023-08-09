import React, { MouseEvent } from 'react';

import "./ButtonS.css";

export const Btnm = ({ test }) => {
    const onMouseMoveCaptureHandler = (evt) => {
        console.log(evt);
        const x = evt.pageX;
        const y = evt.pegeY;
        document.documentElement.style.setProperty('--x',x+'px')
        document.documentElement.style.setProperty('--y',y+'px')
    };
    
    return (
        <button className='ok-btn' onClick={test} onMouseMoveCapture={onMouseMoveCaptureHandler}>Set</button>     
    )
}