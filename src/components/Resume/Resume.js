import { Component } from "react";
import React from 'react';
import './Resume.css';
import TopBar from './TopBar.js';
import ProfilePic from './profilepic.js';
import NextArrow from './images/NextArrow.svg';
import Skills from './Skills.js';
import Section from './Section.js';

export default ()=>{
    return(
        <div>
            <TopBar />
            <div className="resume-container">
              <ProfilePic />
              <button className="next-button"><img src={NextArrow} /></button>
              <Skills />
              <hr />
              <Section type='Education'/>
              <hr />
              <Section type='Experience'/>
              <hr />
              <Section type='Projects'/>
              <hr />
              <Section type='Accomplishments'/>
              <hr />
              <Section type='Courses'/>
            </div>
        </div>
    )
}
