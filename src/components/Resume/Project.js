import { Component } from "react";
import React from 'react';
import './Resume.css';
import ExperiencePic from './images/ExperiencePic.svg';
import CoursesPic from './images/CoursesPic.svg';
import EducationPic from './images/EducationPic.svg';
import AccomplishmentsPic from './images/AccomplishmentsPic.svg';
import ProjectPic from './images/projectpic.svg';

export default (props)=>{
    return(
            <div className="project">

                {(props.type=="Experience")?<div className="experience-pic"><img className="experience-img" src={ExperiencePic} /></div>:null}
                {(props.type=="Education")?<div className="education-pic"><img className="education-img" src={EducationPic} /></div>:null}
                {(props.type=="Projects")?<div className="project-pic"><img className="project-img" src={ProjectPic}  /></div>:null}
                {(props.type=="Accomplishments")?<div className="accomplishments-pic"><img className="project-img" src={AccomplishmentsPic}  /></div>:null}
                {(props.type=="Courses")?<div className="courses-pic"><img className="project-img" src={CoursesPic}  /></div>:null}
              <div className="project-name">
                <div className="title-date-div">
                <p className="project-title">{props.type} 1</p>
                <p className="project-date">23 Sept' 20 - 25 Oct' 20</p>
                </div>
                <button style={(props.type=="Projects"||props.type=="Courses")?{}:{display:'none'}} className="visit-link-button"><span className="visit-text">Visit Link</span></button>
              </div>
              <div className="project-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type a
              </div>
            </div>
    )
}
