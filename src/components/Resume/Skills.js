import { Component } from "react";
import React from 'react';
import './Resume.css';
import SkillTag from './SkillTag.js'

export default  (props)=>{
    return(
            <div className="skills-section">
              <div className='skills-heading'>
                Skills
              </div>
                {mapSkillToSkillTags(props.softSkills)}
                {mapSkillToSkillTags(props.hardSkills)}

              {/* <SkillTag level="gold" skill="Java"/>
              <SkillTag level="silver" skill="Android"/>
              <SkillTag level="bronze" skill="Python"/>
              <SkillTag level="no-level" skill="HTML"/>
              <SkillTag level="no-level" skill="Python"/>
              <SkillTag level="no-level" skill="HTML"/> */}
            </div>
    )
}

const mapSkillToSkillTags=(skills)=>{
  return Object.keys(skills).map(skill=><SkillTag key={skill} level="no-level" skill={skill}/>)
}