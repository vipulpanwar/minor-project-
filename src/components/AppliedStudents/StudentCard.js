import React from 'react';
import { Component } from 'react';
import styles from './StudentCard.module.css'
import userPlaceholder from '../../assets/images/user_placeholder.jpg'
import Button from '../shared/ui/Button/Button';
import Skills from '../Resume/Skills';
import {withRouter} from 'react-router-dom';



export default (props)=>{
    return(
        // !props.student.loading?
        <div className={[styles.StudentCard, props.student.loading?styles.Loading:null].join(' ')}>
            <div className={styles.StudentInfo}>
                <img className={styles.StudentImage} src={ props.student.profilePicture || userPlaceholder}/>
                <StudentData student={props.student}/>
            </div>
            <Skills loading={props.student.loading} style={{margin:0, padding:0}} hardSkills={props.student.hardSkills} softSkills={props.student.softSkills}/>
        </div>
        //: <h1>Loading...</h1>
        )
}

// const Skills = ()=>{
//     return(
//         <div className={styles.SkillsRow}>
//             <h4>Skills :</h4>
//             <ul className={styles.SkillList}>
//                 <li>Java</li>
//                 <li>Android</li>
//                 <li>React</li>
//             </ul>
//         </div>

//     )
// }

const StudentData = withRouter((props)=>{
    let degree = props.student.degree
    return(<div className={styles.StudentData}>
        <h3 className={styles.StudentName}>{props.student.name}</h3>
        <p className={styles.StudentSubTitle}>{props.student[degree]?.branch} - {props.student[degree]?.course} | New Delhi</p>
        <div className={styles.RatingAndView}>
            {/* <span className={styles.Rating}>
                <span>Rating: </span>
                <span>4.5</span>
            </span> */}
            <Button clicked={()=>props.history.replace(props.location.pathname + `/student/${props.student.email}`)} style={{padding:"13px 25px", width:'unset'}}>
                View Profile
            </Button>
        </div>
    </div>)
})
