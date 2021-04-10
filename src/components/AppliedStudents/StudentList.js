import React from 'react';
import { Component } from 'react';
import StudentCard from './StudentCard';
import styles from './StudentList.module.css';
import {StudentsContext} from './StudentsContext';
import Loader from '../shared/ui/Loader/Loader';
import {LoadingStudentCard} from './StudentCard';

class StudentList extends Component{
    render(){
        return(
        <div className={styles.StudentListContainer}>
            {/* { this.props.jobLoading?<Loader color="#232d4c"/>: */}           
            <div className={styles.StudentList}>
            {mapStudentListToCards(this.context.state.applicants, this.props)}
            { this.context.state.studentLoading ? mapLoadingStudentList() : null }
            {/* { this.context.state.newStudentsLoading ? mapLoadingStudentList() : null } */}
            </div>
        </div>)
    }
}
StudentList.contextType = StudentsContext;

const mapStudentListToCards = (studentList, props)=>{
    return studentList.map((student, i)=>{if(i<props.count.newCount){student.flag='New'} return<StudentCard loaded={true} key={i} student={student}/>})
}

const mapLoadingStudentList = ()=>{
    let arr = [1,2,3,4];
    return arr.map(student=><LoadingStudentCard key={student} student={{loading:true, name:"Anuj Talwar"}}/>)
}

export default StudentList;