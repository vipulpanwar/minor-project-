import { Component } from "react";
import React from 'react';
import './Resume.css';
import SkillTag from './SkillTag.js'

export default  ()=>{
    return(
            <div className="skills-section">
              <div className='skills-heading'>
                Skills
              </div>

              <SkillTag level="gold" skill="Java"/>
              <SkillTag level="silver" skill="Android"/>
              <SkillTag level="bronze" skill="Python"/>
              <SkillTag level="no-level" skill="HTML"/>
              <SkillTag level="no-level" skill="Python"/>
              <SkillTag level="no-level" skill="HTML"/>
            </div>
    )
}

// const mapSkillToSkillTags=(skills)=>{
//   return skill.map
// }