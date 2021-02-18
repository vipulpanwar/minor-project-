import { Component } from "react";
import React from 'react';
import './Resume.css';
import Project from './Project.js'

export default  ()=>{
    return(
            <div className="section-section">
              <p className="section-title"> Projects </p>
              <Project />
              <Project />
              <Project />
            </div>
    )
}
