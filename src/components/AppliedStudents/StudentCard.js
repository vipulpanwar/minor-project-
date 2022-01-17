import React from 'react';
import { useState, useEffect, useRef} from 'react';
import styles from './StudentCard.module.css'
import userPlaceholder from '../../assets/images/user_placeholder.jpg'
import Button from '../shared/ui/Button/Button';
import Skills from '../Resume/CompactSkills';
import {withRouter} from 'react-router-dom';
import Excellent from './images/excellent.svg';
import Good from './images/good.svg';
import Average from './images/average.svg';
import { storage } from '../../firebase'
import New from './images/new.svg';
import ProfilePicture from '../Resume/ProfilePicture';


const StudentCard = (props)=>{

    return(
        // !props.student.loading?
        <div  className={styles.StudentCard}>
            <div className={styles.StudentInfo}>
                <ProfilePicture className={styles.StudentImage} uid={props.student.uid} />
                <StudentData student={props.student}/>
            </div>
            <Skills  oneLiner="oneLiner" style={{margin:0, marginRight:18, padding:0}} hardSkills={props.student.hskills} softSkills={props.student.sskills}/>
        </div>
        // : <h1>Loading...</h1>
        )
}

const getDegree = (student)=>{
    let degrees = Object.keys(student.edu);
    let degree = student.edu[degrees[0]];
    for (let degreeKey in student.edu){
        if(degree.year<=student.edu[degreeKey].year){
          degree = student.edu[degreeKey];
        }
    }
    return degree
}

const StudentData = withRouter((props)=>{
    
    
    return(<div>
        <div className={styles.StudentData}>
        <h3 className={styles.StudentName}>{props.student.name}</h3>
        {props.student.edu && <p className={styles.StudentSubTitle}>{ getDegree(props.student)?.field || "" } - {getDegree(props.student)?.course || ""}</p>}
        <div className={styles.RatingAndView}>
            {/* <span className={styles.Rating}>
                <span>Rating: </span>
                <span>4.5</span>
            </span> */}
            <Button clicked={()=>{window.location.replace("https://drive.google.com/file/d/1LaR2PbtiiyU-m2WZdGfifDFEHu7qRjad/view?usp=sharing")}} style={{padding:"13px 25px", width:'unset'}}>
                View Profile
            </Button>
        </div>
    </div>
    </div>)
})


export const LoadingStudentCard = (props)=>{
    return(
        <div className={[styles.StudentCard, styles.Loading].join(' ')}>
            <div className={styles.StudentInfo}>
                <img className={styles.StudentImage} src={ props.student.profilePicture || userPlaceholder}/>
                <StudentData student={props.student}/>
                
            </div>
            <Skills  oneLiner="oneLiner" loading style={{margin:0, padding:0}}/>
        </div>
    )
}

export default StudentCard