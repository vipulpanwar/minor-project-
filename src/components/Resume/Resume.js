import React, { Component } from "react";
import './Resume.css';

import TopBar from './TopBar.js';
import Profile from './Profile.js';
import NextArrow from './images/NextArrow.svg';
import Skills from './Skills.js';
import Section from './Section.js';
import CandidateTagger from './CandidateTagger.js';

import {connect} from 'react-redux';
import {FetchStudent as getStudentAction} from '../../store/actions/jobs';
import {withRouter, Link} from 'react-router-dom';
import { Fragment } from "react";
import { StudentsContext } from '../AppliedStudents/StudentsContext';
import { CSSTransition } from "react-transition-group";
import ReactToPrint from 'react-to-print';
import Button from '../shared/ui/Button/Button'


class Resume extends React.PureComponent{
    state = {
        student : undefined,
    }
    async componentDidMount(){
        let selectedstudent = this.context.state.applicants.find((stud)=> this.props.match.params.studentId === stud.email)
        this.setState({student: selectedstudent});
    }
    componentDidUpdate(){
        let selectedstudent = this.context.state.applicants.find((stud)=> this.props.match.params.studentId === stud.email)
        if((this.state.student.email!=this.props.match.params.studentId)||(this.state.student.flag!=selectedstudent.flag)||((this.state.student.status!=selectedstudent.status))){
            this.setState({student: selectedstudent});
        }
    }

    render (){
        let student = this.state.student;
        let prev, next 
        if(student != undefined){
            [prev,next] = getPrevAndNextStudent (this.state.student?.email, this.context.state.applicants)
        }
        return(

            <div ref={el => (this.componentRef = el)}>
                {!this.state.student?<h1>Loading...</h1>: 
                <Fragment>
                    <TopBar close={this.props.close} />
                    <div className="resume-container">
                    <CandidateTagger student={student}/>
                    <CSSTransition appear unmountOnExit in={Boolean(next)} timeout={100}>
                        <div className='next-button-container hideOnPrint'>
                            <Link className="next-button" to={`/jobs/${this.props.match.params.jobId}/student/${next}`}>
                                <img src={NextArrow} />
                            </Link>
                        </div>
                    </CSSTransition>

                    <CSSTransition appear unmountOnExit in={Boolean(prev)} timeout={100} >
                        <div className='prev-button-container hideOnPrint'>
                            <Link className="prev-button" to={`/jobs/${this.props.match.params.jobId}/student/${prev}`}>
                                <img src={NextArrow} />
                            </Link>
                        </div>
                    </CSSTransition>

                    <ReactToPrint
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return <div className="hideOnPrint" style={{padding:'20px'}}><Button width="150px" href="#">Download</Button></div>;
                    }}
                    content={() => this.componentRef}
                    />

                    <Profile jobid={this.props.match.params.jobId} student={student}/>

                    <Skills hardSkills={student.hskills} softSkills={student.sskills} />
                
                    {Object.keys(student.exp).length !=0 && <Section type="Experience" data={student.exp}/>}
                    
                    {Object.keys(student.project).length !=0 && <Section type="Projects" data={student.project}/>}
                    
                    {Object.keys(student.edu).length !=0 && <Section type="Education" data={student.edu} />}
                
                    {Object.keys(student.course).length !=0 && <Section type="Courses" data={student.course}/>}
            
                    {Object.keys(student.accomp).length !=0 && <Section type="Accomplishments" data={student.accomp}/>}
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