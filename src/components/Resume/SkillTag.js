import { Component } from "react";
import React from 'react';
import './Resume.css';

export default  (props)=>{
    return(
            <div style={{backgroundColor:props.bgcolor, border:props.border}} className="skillBox">
              <p style={{color: props.color}} className="skillText">{props.skill}</p>
            </div>
    )
}
