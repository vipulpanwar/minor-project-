import React from 'react';
import { Component } from 'react';
import StudentCard from './StudentCard';
import styles from './StudentList.module.css';


class StudentList extends Component{
    render(){
        return(
        <div className={styles.StudentListContainer}>
            <div className={styles.StudentList}>
                {mapStudentListToCards(this.props.students)}
            </div>
        </div>)
    }
}


const mapStudentListToCards = (studentList)=>{
    return studentList.map(student=><StudentCard key={student.email} student={student}/>)
}

export default StudentList;