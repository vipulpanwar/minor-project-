//jshint esversion:6

import { Component } from "react";
import React from 'react';
import './Resume.css';
import ProjectPic from './images/projectpic.svg';

export default ()=>{
    return(
            <div className="project">
              <div className="project-pic">
                <img className="project-img" src={ProjectPic} />
              </div>
              <div className="project-name">
                <div className="title-date-div">
                <p className="project-title">Project 1</p>
                <p className="project-date">23 Sept' 20 - 25 Oct' 20</p>
                </div>
                <button className="visit-link-button"><span className="visit-text">Visit Link</span></button>
              </div>
              <div className="project-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type a
              </div>
            </div>
    )
}
