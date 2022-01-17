import React,{createContext, useState} from "react";
import axios from 'axios';

export const SearchContext = createContext();
export const SearchContextConsumer = SearchContext.Consumer;

const SearchContextComponent = (props)=>{
    const [skills, setSkills] = useState([]);
    const [skillPref, setSkillPref] = useState({});
    const [students, setStudents] = useState([]);
    
    const addSkill = (skill)=>{
        let oldSkills = [...skills];
        let skillSet = new Set(oldSkills);

        if(Array.isArray(skill)) skill.forEach(s=> skillSet.add(s))
        else skillSet.add(skill);

        setSkills(Array.from(skillSet));
    }

    const removeSkill = (skill)=>{
        let oldSkills = [...skills];
        let newSkills =oldSkills.filter(s=>s!==skill);
        setSkills(newSkills);
    }

    const search = async ()=>{
        if(skills.length==0) return;
        let resp = await axios.get("http://localhost:8000/studentnav/students/", {params:{query:skillPref}});
        console.log(resp.data.hits.hits)
        let studentsArray = resp.data.hits.hits.map(doc=>{
            let student = doc._source;
            student.uid = doc._id;
            return student;
        })

        setStudents(studentsArray);
    }

    return(<SearchContext.Provider value={{
        skills,
        addSkill,
        removeSkill,
        setSkillPref,
        search,
        students
    }}>
        {props.children}
    </SearchContext.Provider>)
}

export default SearchContextComponent;