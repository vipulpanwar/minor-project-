
import React from 'react';
import './Resume.css';
import SkillTag from './SkillTag.js'
import { Fragment } from "react";

export default  (props)=>{
    // const arr = [...myMap].map(([name, value]) => ({ name, value }));
    // if(props.hskills){
      // let hskills = Object.keys(props?.hskills);
      // hskills.sort()
      // console.log(hskills, "hskills")
    // }
    return(
            <div style={props.style} className="skills-section">
              {!props.loading && !props.offcampus && (props.softSkills || props.hardSkills)?
              <div className='skills-heading'>
                {(Object.keys(props.hardSkills).length !=0||Object.keys(props.softSkills).length !=0) && <p>Skills</p>}
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

                      { props.hardSkills && mapSkillToSkillTags(props.hardSkills)}
                      { props.softSkills && mapSkillToSkillTags(props.softSkills)}
                </div>
              </div>
              
            </div>
    )
}

const mapSkillToSkillTags=(skills)=>{
  return Object.keys(skills).map(skill=><SkillTag key={skill} level="no-level" skill={skill}/>)
}