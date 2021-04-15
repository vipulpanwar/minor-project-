import React, {Fragment} from 'react';
import './Resume.css';

import ExperiencePic from './images/MaskGroup-4.svg';
import CoursesPic from './images/MaskGroup-2.svg';
import EducationPic from './images/MaskGroup-1.svg';
import AccomplishmentsPic from './images/MaskGroup-3.svg';
import ProjectPic from './images/MaskGroup.svg';



export default (props)=>{

    return(
            <div className="project">
              <div className="project-name-flexbox nobreakOnPrint">
                {(props.type=="Experience")?<div style={{backgroundColor: '#ead2ff'}} className="experience-pic"><img style={{display:'block'}} className='project-pic' src={ExperiencePic} /></div>:null}
                {(props.type=="Education")?<div style={{backgroundColor: '#ffe9e9'}} className="experience-pic"><img className='project-pic' style={{display:'block'}} src={EducationPic} /></div>:null}
                {(props.type=="Projects")?<div style={{backgroundColor: '#daf7f0'}} className="experience-pic"><img className='project-pic' style={{display:'block'}} src={ProjectPic}  /></div>:null}
                {(props.type=="Accomplishments")?<div style={{backgroundColor: '#e1edfa'}} className="experience-pic"><img className='project-pic' style={{display:'block'}} src={AccomplishmentsPic}  /></div>:null}
                {(props.type=="Courses")?<div style={{backgroundColor: '#fdedd3'}} className="experience-pic"><img className='project-pic' style={{display:'block'}} src={CoursesPic}  /></div>:null}
              <div className="project-name nobreakOnPrint">
                <div className="title-date-div nobreakOnPrint">
                  <p className="project-title nobreakOnPrint">{props.info.title}</p>
                  <p className="project-date nobreakOnPrint"> 
                    { props.info.subTitle ? <span>{props.info.subTitle}</span> : null }
                    { props.info.subTitle2 ? <span>{props.info.subTitle2}</span> : null }
                  </p>
                </div>
                <span className="hideOnPrint">
                {props.info.link ? <a href={`${ !props.info.link.startsWith('http') ?'http://' :""}${props.info.link}`} target="_blank" className="visit-link-button"><span className="visit-text">Visit Link</span></a> : null}
                </span>
              </div>
              </div>
              {
                props.info.description ?
                  <div className="nobreakOnPrint project-description">
                    {props.info.description}
                  </div>
                : null }
            </div>
    )
}


