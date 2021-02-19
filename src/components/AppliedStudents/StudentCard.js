import React from 'react';
import { Component } from 'react';
import styles from './StudentCard.module.css'
import placeholderImage from '../../assets/images/Placeholder Image.png';
import Button from '../shared/ui/Button/Button';
import {withRouter} from 'react-router-dom';

export default ()=>{
    return(
        <div className={styles.StudentCard}>
            <div className={styles.StudentInfo}>
                <img className={styles.StudentImage} src={placeholderImage}/>
                <StudentData/>
            </div>
            <Skills/>
        </div>)
}

const Skills = ()=>{
    return(
        <div className={styles.SkillsRow}>
            <h4>Skills :</h4>
            <ul className={styles.SkillList}>
                <li>Java</li>
                <li>Android</li>
                <li>React</li>
            </ul>
        </div>

    )
}

const StudentData = withRouter((props)=>{
    
    return(<div>
        <h3 className={styles.StudentName}>Shikha Sharma</h3>
        <p className={styles.StudentSubTitle}>IT - BCA | New Delhi</p>
        <div className={styles.RatingAndView}>
            <span className={styles.Rating}>
                <span>Rating: </span>
                <span>4.5</span>
            </span>
            <Button clicked={()=>props.history.replace(props.location.pathname + '/student/someone')} style={{padding:"13px 25px"}}>
                View Profile
            </Button>
        </div>
    </div>)
})
