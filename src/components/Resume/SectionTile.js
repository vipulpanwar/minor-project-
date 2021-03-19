import React, {Fragment} from 'react';
import './Resume.css';

import ExperiencePic from './images/ExperiencePic.svg';
import CoursesPic from './images/CoursesPic.svg';
import EducationPic from './images/EducationPic.svg';
import AccomplishmentsPic from './images/AccomplishmentsPic.svg';
import ProjectPic from './images/projectpic.svg';



export default (props)=>{
    return(
      <div className="section-section">
            <div className="project">
                {(props.type=="Experience")?<div className="experience-pic"><img className="experience-img" src={ExperiencePic} /></div>:null}
                {(props.type=="Education")?<div className="education-pic"><img className="education-img" src={EducationPic} /></div>:null}
                {(props.type=="Projects")?<div className="project-pic"><img className="project-img" src={ProjectPic}  /></div>:null}
                {(props.type=="Accomplishments")?<div className="accomplishments-pic"><img className="project-img" src={AccomplishmentsPic}  /></div>:null}
                {(props.type=="Courses")?<div className="courses-pic"><img className="project-img" src={CoursesPic}  /></div>:null}
              <div className="project-name">
                <div className="title-date-div">
                  <p className="project-title">{props.info.title}</p>
                  <p className="project-date"> 
                    { props.info.subTitle ? <span>{props.info.subTitle}</span> : null }
                    { props.info.subTitle2 ? <span>{props.info.subTitle2}</span> : null }
                  </p>
                </div>
                {props.info.link ? <a href={props.info.link} className="visit-link-button"><span className="visit-text">Visit Link</span></a> : null}
              </div>
              {
                props.info.description ?
                  <div className="project-description">
                    {props.info.description}
                  </div>
                : null }
            </div>
            </div>
    )
}


