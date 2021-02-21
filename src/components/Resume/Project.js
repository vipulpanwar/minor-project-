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
              <div className="project-pic">

                { props.type=="Experience"? <img className="experience-img" src={ExperiencePic} /> :null} {/*REACT WAY*/}
                <img style={(props.type=="Experience")?{}:{display:'none'}} className="experience-img" src={ExperiencePic} /> {/*Traditional Way*/}

                <img style={(props.type=="Education")?{}:{display:'none'}} className="education-img" src={EducationPic} />
                <img style={(props.type=="Projects")?{}:{display:'none'}} className="project-img" src={ProjectPic} />
                <img style={(props.type=="Accomplishments")?{}:{display:'none'}} className="project-img" src={AccomplishmentsPic} />
                <img style={(props.type=="Courses")?{}:{display:'none'}} className="project-img" src={CoursesPic} />
              </div>
              <div className="project-name">
                <div className="title-date-div">
                <p className="project-title">{props.type} 1</p>
                <p className="project-date">23 Sept' 20 - 25 Oct' 20</p>
                </div>
                <button style={(props.type=="Projects" || props.type=="Courses")?{}:{display:'none'}} className="visit-link-button"><span className="visit-text">Visit Link</span></button>
              </div>
              <div className="project-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type a
              </div>
            </div>
    )
}
