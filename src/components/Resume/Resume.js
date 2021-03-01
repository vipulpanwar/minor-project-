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


class Resume extends Component{
    componentDidMount(){
        // this.props.getStudent(this.props.match.params.studentId)
    }

    render (){
        let student = this.props.student;
        // console.log(this.props.student);
        let [prev,next] = getPrevAndNextStudent (this.props.student.email, this.context.students)
        return(

            <div>
                {this.props.student.loading?<h1>Loading...</h1>: 
                <Fragment>
                    <TopBar />
                    <div className="resume-container">
                    <Profile student={student}/>
                    {next?
                        <div className='next-button-container'>
                            <Link to={`/jobs/${this.props.match.params.jobId}/student/${next}`}>
                                <button className="next-button"><img src={NextArrow} /></button>
                            </Link>
                        </div>
                    :null}

                    {prev?
                        <div className='prev-button-container'>
                            <Link to={`/jobs/${this.props.match.params.jobId}/student/${prev}`}>
                                <button className="prev-button"><img src={NextArrow} /></button>
                            </Link>
                        </div>
                    :null}

                    <Skills hardSkills={student.hardSkills} softSkills={student.softSkills} />
                    <hr />
                    <Section type="Experience" data={student.workExperience}/>
                    <hr />
                    <Section type="Projects" data={student.projects}/>
                    <hr />
                    <Section type="Education" data={student} />
                    <hr />
                    <Section type="Courses" data={student.courses}/>
                    <hr />
                    <Section type="Accomplishments" data={student.accomplishments}/>
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