import { Component } from "react";
import React from 'react';
import './Resume.css';
import ExperiencePic from './images/ExperiencePic.svg';
import CoursesPic from './images/CoursesPic.svg';
import EducationPic from './images/EducationPic.svg';
import AccomplishmentsPic from './images/AccomplishmentsPic.svg';
import ProjectPic from './images/projectpic.svg';
import moment from 'moment';


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
                  <p className="project-title">{props.title}</p>
                  <p className="project-date"> {props.info.company} • {props.info.employmentType} | {formatDate(props.info.durationStartTime)} - {formatDate(props.info.durationEndTime)}</p>
                </div>
                <button style={(props.type=="Projects" || props.type=="Courses")?{}:{display:'none'}} className="visit-link-button"><span className="visit-text">Visit Link</span></button>
              </div>
              <div className="project-description">
                {props.info.description}
              </div>
            </div>
    )
}


const formatDate = (timestamp)=>{
  var t = new Date(1970, 0, 1);
  let dateTime = t.setSeconds(timestamp.seconds);
  if(timestamp.seconds==4102425000)
    return "Present";
  else
    // return moment(dateTime).format('Do MMM YYYY')
    return moment(dateTime).format('MMM\'YY');
    ;
}
