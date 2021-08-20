import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skill from '../shared/Skills/Skill';
import styles from './SkillSuggestions.module.css';

const SkillSuggestion = (props)=>{
    
    const [skillsList, setSkillList]= useState([]);

    useEffect(()=>{
        axios.get("https://elasticsearch.ensvee.com/resume/skills_agg")
            .then(res=>{
                setSkillList(res.data.aggregations.skills.buckets)
            })
            .catch(e=>{
                console.log(e);
            })
    },[])

    const SkillClickHandler = (skill)=>{
        let selectedSkills = [...props.value];
        if(!selectedSkills.includes(skill))
            selectedSkills.push(skill);
        else{
            let i = selectedSkills.findIndex(s=> s== skill)
            selectedSkills.splice(i, 1);
        }

        props.inputHandler({target:{value: selectedSkills}});
    }

    return(<div>
        <p className={styles.SuggestionTitle}>Suggestions</p>
        <div className={styles.SuggestionContainer}>    
        {skillsList.map((skill, i)=>{
            let className = !props.value.includes(skill.key)?styles.SkillNotSelected: styles.SkillSelected;
            return <Skill size={12} className={ `${styles.Skill} ${className}`} skill={`${skill.key} `} count={skill.doc_count} key={i} clicked={()=>SkillClickHandler(skill.key)}/>
        })}
    </div>   
    </div>
    )
}

export default SkillSuggestion;