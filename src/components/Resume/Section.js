import { Component } from "react";
import React from 'react';
import './Resume.css';
import Project from './Project.js'

export default  (props)=>{
    return(
            <div className="section-section">
              <p className="section-title"> {props.type} </p>
              <Project type={props.type}/>
              <Project type={props.type}/>
              <Project type={props.type}/>
            </div>
    )
}
