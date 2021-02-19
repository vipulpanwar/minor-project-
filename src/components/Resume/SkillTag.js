import { Component } from "react";
import React from 'react';
import './Resume.css';

export default  (props)=>{
  var styleNames = props.level + ' ' + 'skillBox';
    return(
            <div className={styleNames} >
              <p className="skillText">{props.skill}</p>
            </div>
    )
}
