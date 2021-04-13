
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import './Resume.css';
import SkillTag from './SkillTag.js'
import { Fragment } from "react";

export default  (props)=>{
    let compactSkillsRef= useRef(null);
    let [moreSkills, setMoreSkills]= useState(null);
    let [windowWidth, setWindowWidth] =useState(window.innerWidth);


    useEffect(()=>{
             window.addEventListener('resize',e=>{
            // console.log('resize')
            if(windowWidth != window.innerWidth)
            setWindowWidth(window.innerWidth);
        })    

        return ()=>{
            window.removeEventListener('resize', (e)=>{})
        }

    },[]);
    useEffect(()=>{
        // console.log("run");
        let count=0;
        let bottom = compactSkillsRef.current.getBoundingClientRect().bottom;
        
        Array.from(compactSkillsRef.current.children).forEach(skill=>{
            if( bottom < skill.getBoundingClientRect().bottom)
            {
                skill.style.background="red";
                // skill.style.display="none";
                count++;
            }
            else
            {
                skill.style.background="";
                // skill.style.display="";
            }

        setMoreSkills(count);
        })

    },[props, windowWidth])

    return(
            <div style={props.style} className="skills-section">
              {!props.loading && (props.softSkills || props.hardSkills) ? <div className='skills-heading'>Skills</div> : null}
              <div className="skills-container" style={{flexWrap:"nowrap"}}>
                <div ref={compactSkillsRef} className="compact-skills">
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
                {moreSkills?<SkillTag style={{flexShrink:0}} skill={"+ " + moreSkills + " more"} level="no-level"/>:null}
                
              </div>
              
            </div>
    )
}

const mapSkillToSkillTags=(skills)=>{
  return Object.keys(skills).map(skill=><SkillTag key={skill} level="no-level" skill={skill}/>)
}