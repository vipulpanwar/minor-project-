import React from 'react';
import './Resume.css';
import X from './images/x.svg'

export default  ()=>{
    return(
            <div className="top-bar">
              <button className="cross-button"><img src={X} className="x-button" /></button>
            </div>
    )
}
