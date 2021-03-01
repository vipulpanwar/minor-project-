import React from 'react';
import { Component } from 'react';
import StudentCard from './StudentCard';
import styles from './StudentList.module.css';
import {StudentsContext} from './StudentsContext';
import Loader from '../shared/ui/Loader/Loader';

class StudentList extends Component{
    render(){
        console.log(this.context)
        return(
        <div className={styles.StudentListContainer}>
            { this.props.jobLoading?<Loader color="#232d4c"/>:
            <div className={styles.StudentList}>
                {mapStudentListToCards(this.context.students)}
            </div>
            }
        </div>)
    }
}
StudentList.contextType = StudentsContext;

const mapStudentListToCards = (studentList)=>{
    return studentList.map((student, i)=><StudentCard key={i} student={student}/>)
}

const mapLoadingStudentList = ()=>{
    let arr = [1,2,3,4];
    return arr.map(student=><StudentCard key={student} student={{loading:true}}/>)
}

export default StudentList;