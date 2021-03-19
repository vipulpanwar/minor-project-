import { render } from '@testing-library/react';
import React , { createContext, Component, useState, useEffect, useLayoutEffect} from 'react';
import {db} from '../../firebase'
export const StudentsContext = createContext();



class StudentsProviderComponent extends Component{
    state = {
        jobsdata: [],
        countdata: [],
        applicants: [],
        applicantsData: [],
        countLoading: true,
    }
    async componentDidMount (){
        let applicants = [];

        let ad = await db.collection('jobs').doc(this.props.jobId).collection('applicants').get();
        this.setState({applicantsData: ad});
        this.state.applicantsData.forEach(applicantsDoc=>{
            let applicant = applicantsDoc.data();
            applicant.id= applicantsDoc.id;
            applicants.push(applicant);
            console.log(applicant);
        });
        this.setState({applicants: applicants});
        this.setState({countLoading: false});
    }

    updateflag = async (studentId, newflag)=>{
        await db.collection('jobs').doc(this.props.jobId).collection('applicants').doc(studentId).update({flag:newflag});
        let findingstudent = this.state.applicants.find((student)=>{return student.id == studentId});
        let updatingstudent = {...findingstudent}
        updatingstudent.flag = newflag;
        let index = this.state.applicants.findIndex((student)=>{return student.id == studentId});
        let applicantsCopy = [...this.state.applicants]
        applicantsCopy[index] = updatingstudent;
        this.setState({applicants:applicantsCopy})
    }

    updatestatus = async (studentId, newstatus)=>{
        await db.collection('jobs').doc(this.props.jobId).collection('applicants').doc(studentId).update({status:newstatus});
        let findingstudent = this.state.applicants.find((student)=>{return student.id == studentId});
        let updatingstudent = {...findingstudent}
        updatingstudent.status = newstatus;
        let index = this.state.applicants.findIndex((student)=>{return student.id == studentId});
        let applicantsCopy = [...this.state.applicants]
        applicantsCopy[index] = updatingstudent;
        this.setState({applicants:applicantsCopy})
    }

    render(){
        let contextData = {state: this.state, updatef: this.updateflag, updatestat: this.updatestatus,}
    return (
        <StudentsContext.Provider value={contextData}>
            {this.props.children}
            {/* {console.log('Context render')} */}
        </StudentsContext.Provider>)
    }
    
}

export const StudentsProvider = (StudentsProviderComponent);