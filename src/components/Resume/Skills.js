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
              <SkillTag bgcolor="#FFD600" color="#E09320" skill="Java"/>
              <SkillTag bgcolor="#CFCFD1" color="#898989" skill="Android"/>
              <SkillTag bgcolor="#C48F63" color="#AF6E38" skill="Python"/>
              <SkillTag border="1px solid #D4D5DA " color="#000" skill="HTML"/>
              <SkillTag border="1px solid #D4D5DA " color="#000" skill="Python"/>
              <SkillTag border="1px solid #D4D5DA " color="#000" skill="HTML"/>
            </div>
    )
}
