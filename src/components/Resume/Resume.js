import React, { Component } from "react";
import './Resume.css';

import TopBar from './TopBar.js';
import Profile from './Profile.js';
import NextArrow from './images/NextArrow.svg';
import Skills from './Skills.js';
import Section from './Section.js';

import {connect} from 'react-redux';
import {FetchStudent as getStudentAction} from '../../store/actions/jobs';
import {withRouter} from 'react-router-dom';
import { Fragment } from "react";


class Resume extends Component{
    componentDidMount(){
        // this.props.getStudent(this.props.match.params.studentId)
    }

    render (){
        let student = this.props.student;
        // console.log(this.props.student);
        return(
            <div>
                {this.props.student.loading?<h1>Loading...</h1>: 
                <Fragment>
                    <TopBar />
                    <div className="resume-container">
                    <Profile student={student}/>
                    <div className='next-button-container'>
                        <button className="next-button"><img src={NextArrow} /></button>
                    </div>
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


const mapDispatchToProps = (dispatch)=>({
    getStudent: (email)=>dispatch(getStudentAction(email))
})

const mapStateToProps = (state, ownProps)=>{ 
    let student = state.jobs.appliedStudents.find(stud=> stud.email== ownProps.match.params.studentId)
    return {
        student: student
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Resume))