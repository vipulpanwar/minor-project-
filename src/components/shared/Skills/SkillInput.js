import React, {useState} from 'react';
import styles from './SkillInput.module.css';
import Skill from './Skill';
import RoundedPlus from '../../../assets/icons/rounded_plus.svg'
const SkillInput = (props)=>{
    let [inputVal, setInputVal] = useState("");
    // let [skills,setSkills] = useState([]);
    let skills = props.value;

    const setSkills= (newSkills)=>{
        props.inputHandler({target:{ value: newSkills }})
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        if(!inputVal) return
        let newSkills = new Set(skills);
        newSkills.add(inputVal.toLowerCase());
        setSkills(Array.from(newSkills));
        setInputVal("")
    }
    const removeSkill=(skillName)=>{
        let newSkills = skills.filter(skill=> skill!= skillName);
        setSkills(newSkills);
    }
    return (
        <div>
            <form onSubmit={submitHandler} className={styles.SkillInput}>
                <input value={inputVal} onChange={(e)=> setInputVal(e.target.value)} name="skill" className={styles.SkillTextInput} type="text" placeholder="Type skills and press enter"/>
                <button className={[styles.AddBtn,inputVal?styles.Active:null].join(" ")}><img src={RoundedPlus}/></button>
            </form>
            <div className={styles.SkillList}>
                {skills.map((skill, i)=><Skill skill={skill} key={i} crossClicked={()=>removeSkill(skill)}/>)}
            </div>

        </div>

    )
}

export default SkillInput;