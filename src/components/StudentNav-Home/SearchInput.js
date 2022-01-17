import React, {useState, useEffect, useContext} from 'react';
import styles from './SearchInput.module.css'
import searchIcon from '../../assets/icons/search2.svg'
import axios from 'axios';
import SkillSlider from './SkillSlider';
import cross from "../../assets/icons/cross-gray.svg";
import {SearchContext} from './SearchContext';


const COLORS = [
    "linear-gradient(0deg, #4C1B1A 0%, #D1322E 100%)",
    "linear-gradient(0deg, #236685 14.09%, #55B3DE 82.41%)",
    "linear-gradient(0deg, #006622 14.09%, #00B322 82.41%)"
]

function SearchInput() {
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputHandler = (e)=>{
        setSearchQuery(e.target.value);
    }

    const {addSkill, removeSkill,skills, search} = useContext(SearchContext);
    const CancelToken = axios.CancelToken;
    const [source, setSource] = useState();
    const [suggestions, setSuggestions] = useState([]);

    useEffect(async () => {
        
        if(!searchQuery) return;
        
        if(source) source.cancel();
        let newSource = CancelToken.source();
        setSource(newSource);

        try{
            let res = await axios.get("http://localhost:8000/resume/skills_suggestion", { cancelToken:newSource.token, params:{skill:searchQuery}});
            console.log(res.data.suggest.Skill[0]);
            let newSuggestions = res.data.suggest.Skill[0].options.map(doc=> doc.text);
            setSuggestions(newSuggestions)
        }
        catch(e){
            if(axios.isCancel(e))
            console.log("request canceled");
            else console.log(e);
        }
        // source.cancel("aise hi")

    }, [searchQuery])

    const selectSkill = (skillName)=>{
        // console.log("selecting", skillName)
        setSearchQuery("")
        addSkill(skillName);
        // if(selectedSkills[skillName]) return;
        // setSelectedSkills({...selectedSkills, [skillName]: 1});
    }
    return (
        <>
            <div className={styles.SearchContainer}>
                <div className={styles.SkillsList}>{skills.map((skill, i)=> <span className={styles.Skill} key={i}><img onClick={()=>removeSkill(skill)} className={styles.Cross} src={cross}/><span style={{background:COLORS[i%COLORS.length]}}></span>{skill}</span>)}</div>
                <input value={searchQuery} onInput={searchInputHandler} className={styles.Input} placeholder="Search students by skill"/>
                <button onClick={search} className={styles.SearchBtn}><img src={searchIcon} className={styles.Icon}/></button>
                <Suggestions show={searchQuery} suggestions={suggestions} selectSkill={selectSkill}/>
            </div>
            <SkillSlider/>
        </>
    )
}

function Suggestions(props){
    if(!props.show) return null;

    return (<div className={styles.Suggestions}>
        {   props.suggestions.length == 0
            ?   <span className={styles.NoSuggestions}>No suggestions...</span>
            :   props.suggestions.map(suggestion=> <span className={styles.SuggestionItem} onClick={()=> { console.log("selecting2", suggestion);props.selectSkill(suggestion)}} key={suggestion}>{suggestion}</span>)}
        
    </div>)
}

export default SearchInput
