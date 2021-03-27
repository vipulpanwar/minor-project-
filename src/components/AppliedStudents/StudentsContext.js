import { render } from '@testing-library/react';
import React , { createContext, Component, createRef, useState, useEffect, useLayoutEffect} from 'react';
import {db} from '../../firebase'
export const StudentsContext = createContext();


class StudentsProviderComponent extends Component{
    state = {
        jobsdata: [],
        countdata: [],
        applicants: [],
        studentLoading: true,
        filters: {  degree: 'All',
                    course: 'All',
                    field: 'All',
                    flag: 'All',
                    collegeid: 'All',
                    skillValue: [],
        },
        options: {  degreeOptions: ['All'],
                    courseOptions: ['All'],
                    branchOptions: ['All'],
                    collegeOptions: ['All'],
        },        
        searchValue: '',
        showHired:false,
    }

    async componentDidMount (){
        console.log(this.props)
        if(this.props.hired){
            this.setState({showHired:true})
        }
        this.fetchStudents(this.state.filters, false, this.props.hired)
    }

    endOfPageHandler = ()=>{
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log("end of page")
            if(!this.state.studentLoading && !this.state.studentLoading && this.state.hasMore){
                console.log(this.state.applicants.length!=this.props.count.count);
                this.setState({studentLoading:true})
                this.fetchStudents(this.state.filters, true)
            }
        }
    }

    componentWillMount(){
        window.addEventListener('scroll', this.endOfPageHandler);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.endOfPageHandler);
    }

    updateflag = async (studentId, newflag)=>{
        let findingstudent = this.state.applicants.find((student)=>{return student.id == studentId});
        if(newflag==findingstudent.flag){
            return 0
        }
        await db.collection('jobs').doc(this.props.jobId).collection('applicants').doc(studentId).update({flag:newflag});
        console.log(newflag);
        let updatingstudent = {...findingstudent}
        updatingstudent.flag = newflag;
        let index = this.state.applicants.findIndex((student)=>{return student.id == studentId});
        let applicantsCopy = [...this.state.applicants]
        applicantsCopy[index] = updatingstudent;
        this.setState({applicants:applicantsCopy})
    }

    updatestatus = async (studentId, newstatus)=>{
        console.log(newstatus);
        let findingstudent = this.state.applicants.find((student)=>{return student.id == studentId});
        if(newstatus!=findingstudent.status){
            await db.collection('jobs').doc(this.props.jobId).collection('applicants').doc(studentId).update({status:newstatus});
            let updatingstudent = {...findingstudent}
            updatingstudent.status = newstatus;
            let index = this.state.applicants.findIndex((student)=>{return student.id == studentId});
            let applicantsCopy = [...this.state.applicants]
            applicantsCopy[index] = updatingstudent;
            this.setState({applicants:applicantsCopy})
        }
    }

    setSearch = (search)=>{
        let emails = {email:search}
        this.fetchStudents(emails);
    }

    fetchStudents = async (filters, moreStudents = false, showHired= false)=>{
            let applicants = []
            let query =  db.collection('jobs').doc(this.props.jobId).collection('applicants').where('status', '==', 'Applied').limit(10);
            console.log(this.props.hired, "showHired")
            if(this.props.hired){
                query =  db.collection('jobs').doc(this.props.jobId).collection('applicants').where('status', '==', 'Hire').limit(10);
            }
            for (let filterKey in filters){
                if(filters[filterKey]!='All' && filters[filterKey]!=''){
                    if(filterKey=="course"||filterKey=="field"){
                        query = query.where(`edu.${filters.degree}.${filterKey}`, '==', filters[filterKey])
                    }
                    else if(filterKey=="skillValue"){
                        query = query.where('skillKey', 'array-contains-any', filters[filterKey])
                    }
                    else{
                        query = query.where(filterKey, '==', filters[filterKey])
                    }
                }
            }
            if(moreStudents){
                let studs = this.state.applicants.length
                let lastStudent = this.state.applicants[studs - 1];
                console.log(lastStudent.id);
                let lastStudentDoc = await db.collection('jobs').doc(this.props.jobId).collection('applicants').doc(lastStudent.id).get();
                query = query.startAfter(lastStudentDoc)
            }
            let studentDocslist = await query.get();
            console.log(studentDocslist, "studoclist");
            studentDocslist.forEach(applicantsDoc=>{
                let applicant = applicantsDoc.data();
                applicant.id= applicantsDoc.id;
                applicants.push(applicant);
                console.log(applicant);
            });
            this.setState({hasMore: (applicants.length==10)});
            if(moreStudents){
                this.setState({applicants:[...this.state.applicants, ...applicants], studentLoading:false})
            }
            else{
                this.setState({applicants: applicants, studentLoading: false});
            }    
            this.setState({studentLoading: false});
            console.log(applicants, "applicants renewed")
    }

    applyFilterHandler = (filters, options)=>{
        console.log("filter Input Taker Called");
        if(this.state.filters!=filters){
            this.setState({filters:filters, options:options})
            console.log(filters, "filters")
            this.fetchStudents(filters);
        }
        else{
            console.log("same filters")
        }
    }

    render(){

        let contextData = {state: this.state, updatef: this.updateflag, updatestat: this.updatestatus, filterfunction: this.applyFilterHandler, setSearch: this.setSearch}
    return (
        <StudentsContext.Provider value={contextData}>
            {this.props.children}
            {/* {console.log('Context render')} */}
        </StudentsContext.Provider>)
    }
    
}

export const StudentsProvider = (StudentsProviderComponent);