
import React from 'react';
import './Resume.css';
import SkillTag from './SkillTag.js'
import { Fragment } from "react";

export default  (props)=>{

    return(
            <div style={props.style} className="skills-section">
              {!props.loading ?
              <div className='skills-heading'>
                Skills
              </div>:null}
              <div className="skills-container">
                <div>
                {props.loading ?
                  <Fragment>
                    <SkillTag skill="" level="loading"/>
                    <SkillTag skill="" level="loading"/>
                    <SkillTag skill="" level="loading"/>
                    <SkillTag skill="" level="loading"/>
                    <SkillTag skill="" level="loading"/>
                  </Fragment>
                  : null}

                      { props.softSkills && mapSkillToSkillTags(props.softSkills)}
                      { props.hardSkills && mapSkillToSkillTags(props.hardSkills)}
                </div>
              </div>
              
            </div>
    )
}

const mapSkillToSkillTags=(skills)=>{
  return Object.keys(skills).map(skill=><SkillTag key={skill} level="no-level" skill={skill}/>)
}