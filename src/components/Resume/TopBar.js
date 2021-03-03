import React from 'react';
import './Resume.css';
import X from './images/x.svg'

export default  (props)=>{
    return(
            <div className="top-bar">
              <button onClick={props.close} className="cross-button"><img src={X} className="x-button" /></button>
            </div>
    )
}
