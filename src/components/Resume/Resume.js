import React, { Component, useRef } from "react";
import './Resume.css';

import TopBar from './TopBar.js';
import Profile from './Profile.js';
import NextArrow from './images/NextArrow.svg';
import Skills from './Skills.js';
import Section from './Section.js';
import CandidateTagger from './CandidateTagger.js';

import { Link} from 'react-router-dom';
import { Fragment } from "react";

import { CSSTransition } from "react-transition-group";
import ResumeMessage from "./ResumeMessage";

const loadingResume ={
    edu: {
        bachelors: {
            field: "ramdi baazi",
            course :"test course",
            clg_board:"sfsjlks",
            year: 2002
        }
    },
    name:"TEST NAME",
    degree:"Test",
    about: "kslkdjfslkdjflksj sfn lksfn dlk dl jfkljfkgldjf glkdjflgdjf  lkgdjflkg  jdlkfgjldkfjg ldkflg fjkdflk gdjlkfjldkf ldkf jgldfj ld fjl djflgdj flgjfl  kslkdjfslkdjflksj sfn lksfn dlk dl jfkljfkgldjf glkdjflgdjf  lkgdjflkg  jdlkfgjldkfjg ldkflg fjkdflk gdjlkfjldkf ldkf jgldfj ld fjl djflgdj flgjfl kslkdjfslkdjflksj sfn lksfn dlk dl jfkljfkgldjf glkdjflgdjf  lkgdjflkg  jdlkfgjldkfjg ldkflg fjkdflk gdjlkfjldkf ldkf jgldfj ld fjl djflgdj flgjfl ",
    phone: "sdksl",
    email: "test",
    hskills:{},
    sskills: {},
    exp :{
        "1": {
            title:"test title",
            desc : "test desc skd slk dj slkdjlksjdkflsj lk slkjdlsjdlk sld sl d\n test desc skd slk dj slkdjlksjdkflsj lk slkjdlsjdlk sld sl d"
        }
    },
    loading:true
}

const Resume = (props) => {
    const student = props.student ? props.student : loadingResume;
    let componentRef = useRef(null);

    let prev = props.prev, next = props.next;
    let loading = student.loading;

    return(
        <div ref={componentRef}>
            <Fragment>
                <div className="resume-container">
                <ResumeMessage {...student?.resumeMessage}/>
                <CandidateTagger updateFlag={props.updateFlag} student={student}/>
                <CSSTransition unmountOnExit appear classNames='side-button' in={Boolean(next)} timeout={100}>
                    <div className='next-button-container hideOnPrint'>
                        <Link className="button next-button" to={props.next || ""}>
                            <img src={NextArrow} />
                        </Link>
                    </div>
                </CSSTransition>

                <CSSTransition unmountOnExit appear classNames="side-button" in={Boolean(prev)} timeout={100} >
                    <div className='prev-button-container hideOnPrint'>
                        <Link className=" button prev-button" to={props.prev || ""}>
                            <img src={NextArrow} />
                        </Link>
                    </div>
                </CSSTransition>
                <Profile refer={componentRef} updateStatus={props.updateStatus} student={student}/>
                <Skills hardSkills={student.hskills} softSkills={student.sskills} loading={student.loading} />
                { Object.keys(student.exp).length !=0 && <Section type="Experience" data={student.exp} loading={student.loading}/>}
                { !loading && Object.keys(student.project).length !=0 && <Section type="Projects" data={student.project}/>}
                { !loading && Object.keys(student.edu).length !=0 && <Section type="Education" data={student.edu} />}
                { !loading && Object.keys(student.course).length !=0 && <Section type="Courses" data={student.course}/>}
                { !loading && Object.keys(student.accomp).length !=0 && <Section type="Accomplishments" data={student.accomp}/>}
                </div>
            </Fragment>
        </div>
    )
} 

export default Resume;