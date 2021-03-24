import React from 'react';
import {  useEffect, useRef} from 'react';
import styles from './StudentCard.module.css'
import userPlaceholder from '../../assets/images/user_placeholder.jpg'
import Button from '../shared/ui/Button/Button';
import Skills from '../Resume/CompactSkills';
import {withRouter} from 'react-router-dom';
import Excellent from './images/excellent.svg';
import Good from './images/good.svg';
import Average from './images/average.svg';
import New from './images/new.svg';


const StudentCard = (props)=>{
    let cardRef = useRef(null);
    return(
        // !props.student.loading?
        <div ref={cardRef} className={styles.StudentCard}>
            {console.log(props, "props")}
            {props.student.flag=="Excellent" && <div className={styles.excellent}><img src={Excellent} alt={props.student.flag}/></div>}
            {props.student.flag=="Good" && <div className={styles.excellent}><img src={Good} alt={props.student.flag}/></div>}
            {props.student.flag=="Average" && <div className={styles.excellent}><img src={Average} alt={props.student.flag}/></div>}
            {props.student.flag=="New" && <div className={styles.excellent}><img src={New} alt={props.student.flag}/></div>}
            <div className={styles.StudentInfo}>
                <img className={styles.StudentImage} src={ props.student.profilePicture || userPlaceholder}/>
                <StudentData student={props.student}/>
                
            </div>
            <Skills  oneLiner="oneLiner" style={{margin:0, padding:0}} hardSkills={props.student.hskills} softSkills={props.student.sskills}/>
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
        {props.student.edu && <p className={styles.StudentSubTitle}>{getDegree(props.student).field} - {getDegree(props.student).course}</p>}
        <div className={styles.RatingAndView}>
            {/* <span className={styles.Rating}>
                <span>Rating: </span>
                <span>4.5</span>
            </span> */}
            <Button clicked={()=>props.history.replace(props.location.pathname + `/student/${props.student.email}`)} style={{padding:"13px 25px", width:'unset'}}>
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