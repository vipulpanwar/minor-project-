import React, { Component } from "react";
import './Resume.css';

import TopBar from './TopBar.js';
import Profile from './Profile.js';
import NextArrow from './images/NextArrow.svg';
import Skills from './Skills.js';
import Section from './Section.js';


import {connect} from 'react-redux';
import {FetchStudent as getStudentAction} from '../../store/actions/jobs';
import {withRouter, Link} from 'react-router-dom';
import { Fragment } from "react";
import { StudentsContext } from '../AppliedStudents/StudentsContext';
import { CSSTransition } from "react-transition-group";


class Resume extends Component{
    componentDidMount(){
        if(this.props.student.loading==false && this.props.student.loaded==false)
        this.props.getStudent(this.props.match.params.studentId)
    }
    componentDidUpdate(){
        if(this.props.student.loading==false && this.props.student.loaded==false)
        this.props.getStudent(this.props.match.params.studentId)
    }

    render (){
        let student = this.props.student;
        // console.log(this.props.student);
        let [prev,next] = getPrevAndNextStudent (this.props.student.email, this.context.students)
        return(

            <div>
                {!this.props.student.loaded?<h1>Loading...</h1>: 
                <Fragment>
                    <TopBar close={this.props.close} />
                    <div className="resume-container">
                    <Profile student={student}/>

                    <CSSTransition appear unmountOnExit in={Boolean(next)} timeout={100}>
                        <div className='next-button-container'>
                            <Link className="next-button" to={`/jobs/${this.props.match.params.jobId}/student/${next}`}>
                                <img src={NextArrow} />
                            </Link>
                        </div>
                    </CSSTransition>

                    <CSSTransition appear unmountOnExit in={Boolean(prev)} timeout={100} >
                        <div className='prev-button-container'>
                            <Link className="prev-button" to={`/jobs/${this.props.match.params.jobId}/student/${prev}`}>
                                <img src={NextArrow} />
                            </Link>
                        </div>
                    </CSSTransition>


                    <Skills hardSkills={student.hardSkills} softSkills={student.softSkills} />
                
                    {student.workExperience && <Section type="Experience" data={student.workExperience}/>}
                    
                    {student.projects && <Section type="Projects" data={student.projects}/>}
                    
                    {student && <Section type="Education" data={student} />}
                
                    {student.courses && <Section type="Courses" data={student.courses}/>}
            
                    {student.accomplishments && <Section type="Accomplishments" data={student.accomplishments}/>}
                    </div>
                </Fragment>
                }
            </div>
        )
    }
} 

const getPrevAndNextStudent = (email, students)=>{
    let index= students.findIndex(student=> student.email == email);
    let prev, next;
    if( index > 0)
        prev = students[index - 1]?.email;
    if( index < students.length)
        next = students[index + 1]?.email;

    return [prev, next]
}

const mapDispatchToProps = (dispatch)=>({
    getStudent: (email)=>dispatch(getStudentAction(email))
})

const mapStateToProps = (state, ownProps)=>{ 
    let student = state.jobs.appliedStudents.find(stud=> stud.email== ownProps.match.params.studentId)
    return {
        student: student
    }
}
Resume.contextType = StudentsContext;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Resume))