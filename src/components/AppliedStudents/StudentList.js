import React from 'react';
import StudentCard from './StudentCard';
import styles from './StudentList.module.css';



export default (props)=>{
    return(
    <div className={styles.StudentListContainer}>
        <div className={styles.StudentList}>
            {mapStudentListToCards(props.students)}
            {mapStudentListToCards(props.students)}
            {mapStudentListToCards(props.students)}
            {mapStudentListToCards(props.students)}
            {mapStudentListToCards(props.students)}
        </div>

    </div>)
}

const mapStudentListToCards = (studentList)=>{
    return studentList.map(student=><StudentCard key={student.email} student={student}/>)
}