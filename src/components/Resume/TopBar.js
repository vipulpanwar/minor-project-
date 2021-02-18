import { Component } from "react";
import React from 'react';
import './Resume.css';
import X from './images/x.svg'
import Minusbutton from './images/minus.svg'

export default  ()=>{
    return(
            <div className="top-bar">
              <button className="cross-button"><img src={X} className="x-button" /></button>
              <button className="minus-button"><img src={Minusbutton} className="minus-img" /></button>
              <button className="holo-circle-button"></button>
            </div>
    )
}
