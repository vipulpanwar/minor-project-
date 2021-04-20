import { render } from '@testing-library/react';
import { CreateToast } from '../../store/actions/alert';
import { connect } from 'react-redux';
import axios from 'axios';
import React , { createContext, Component, createRef, useState, useEffect, useLayoutEffect} from 'react';
import { db } from '../../firebase'
import userPlaceholder from '../../assets/images/user_placeholder.jpg';
import { storage } from '../../firebase'
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
                    selectedCollegeData: undefined,     
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
        this.getCollegeList();
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
        else{
            try{
                await db.collection('jobs').doc(this.props.jobId).collection('applicants').doc(studentId).update({flag:newflag});
                console.log(newflag);
                let updatingstudent = {...findingstudent}
                updatingstudent.flag = newflag;
                let index = this.state.applicants.findIndex((student)=>{return student.id == studentId});
                let applicantsCopy = [...this.state.applicants]
                console.log(applicantsCopy, "applicantsCopy")
                console.log(index, "index")
                applicantsCopy[index] = updatingstudent;
                console.log(applicantsCopy, "New Copy")
                this.setState({applicants:applicantsCopy})
            }
            catch(error){
                console.log(error)
                this.props.createToast({message:"Something Went Wrong"})
            }
        }   
    }

    updatestatus = async (studentId, newstatus, callback=()=>{})=>{
        console.log(newstatus);
        let findingstudent = this.state.applicants.find((student)=>{return student.id == studentId});
        if(newstatus!=findingstudent.status){
            console.log(studentId, newstatus);
            try {
                await axios.post('https://asia-south1-ensveeproduction.cloudfunctions.net/app/change_applicant_status/', {'applicantId':studentId, jobId:this.props.jobId, status:newstatus})
                let updatingstudent = {...findingstudent}
                updatingstudent.status = newstatus;
                let index = this.state.applicants.findIndex((student)=>{return student.id == studentId});
                let applicantsCopy = [...this.state.applicants]
                applicantsCopy[index] = updatingstudent;
                callback();
                applicantsCopy.splice(index,1);
                this.setState({applicants:applicantsCopy})
                let message = "Student " + newstatus + "!"
                this.props.createToast({message:message});
            } catch (error) {
                this.props.createToast({message:"Something went wrong"});
                console.log(error)
            }
                            // await db.collection('jobs').doc(this.props.jobId).collection('applicants').doc(studentId).update({status:newstatus});
        }
    }

    setSearch = (search)=>{
        let emails = {email:search}
        this.fetchStudents(emails);
    }

    fetchStudents = async (filters, moreStudents = false, showHired= false)=>{
            let applicants = []
            let query =  db.collection('jobs').doc(this.props.jobId).collection('applicants').where('status', '==', 'Applied').limit(20);
            console.log(this.props.hired, "showHired")
            if(this.props.hired){
                query =  db.collection('jobs').doc(this.props.jobId).collection('applicants').where('status', '==', 'Hired').limit(20);
            }
            for (let filterKey in filters){
                if(filters[filterKey]!='All' && filters[filterKey]!='' && filterKey!='selectedCollegeData'){
                    if(filterKey=="course"||filterKey=="field"){
                        query = query.where(`edu.${filters.degree}.${filterKey}`, '==', filters[filterKey])
                    }
                    else if(filterKey=="skillValue"){
                        query = query.where('skillkey', 'array-contains-any', filters[filterKey])
                        console.log(filters[filterKey])
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
                console.log("Skills", applicant.hskills, applicant.sskills)
                // let hskills = new Map([...applicant.hskills].sort())
                // let hskills = new Map([...applicant.hskills.entries()].sort());
                // let hskills = Object.keys(applicant.hskills).sort(function(a,b) { return applicant.hskills[a] - applicant.hskills[b]; });
                // console.log("sorted skills", hskills)
                applicant.hskills = this.skillSorter(applicant.hskills)
                applicant.sskills = this.skillSorter(applicant.sskills)
                applicant.id= applicantsDoc.id;
                applicant.profilePic = userPlaceholder
                applicants.push(applicant);
                console.log(applicant);
            });
            if(moreStudents){
                this.setState({applicants:[...this.state.applicants, ...applicants], studentLoading:false, hasMore: (applicants.length==20)},()=>this.getImages(applicants))
            }
            else{
                this.setState({applicants: applicants, studentLoading: false, hasMore: (applicants.length==20)},()=>this.getImages(applicants));
            }
            // this.setState({studentLoading: false});
            console.log(applicants, "applicants renewed")
    }

    skillSorter = (propskills) =>{
        let skills = Object.keys(propskills);
        let skillMap = {}
        skills.sort()
        skills.forEach((skill)=>{
            skillMap[skill] = true
        })
        console.log(skillMap)
        return skillMap
    }

    getCollegeList = async () =>{
        let colleges = []
        let collegesDocs = await db.collection('suggestion').get();
        collegesDocs.forEach(collegeDoc=>{
            let college = collegeDoc.data();
            // college.id = collegeDoc.id;
            colleges.push(college);
            console.log(college);
    });
    
    let collegeNames = colleges[0].name
    console.log(collegeNames, "colleges")
    collegeNames.unshift("All")
    let options = {...this.state.options}
    options.collegeOptions = collegeNames
    console.log(options, "Options")
    this.setState({options: options})
    }

    getImages = async (applicants) =>{
        applicants.forEach(async applicant=>{
            let src = ""
            let profilepicLink = "users/"+ applicant.uid + '/myphoto.png'
            try{
                src = await storage.ref().child(profilepicLink).getDownloadURL()
                applicant.profilePic = src
                console.log(applicant.profilePic)
                let index = this.state.applicants.findIndex((app)=>app.uid==applicant.uid);
                let fetchedApplicant = {...this.state.applicants[index]}
                fetchedApplicant.profilePic = src
                let applicantsCopy = [...this.state.applicants]
                applicantsCopy[index] = fetchedApplicant
                this.setState({applicants: applicantsCopy})
            }
            catch(error){
                console.log(error)
            }
        })
    }

    getDegrees = async (college)=>{
        // let collegeDat
        console.log("getting data for ", college)
        let collegeDocs = await db.collection('clginfo').doc(college).get();
        // console.log(collegeDat, "dat")
        // console.log(collegeDocs.data(), "College Data")
        return collegeDocs.data()
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

        let contextData = {state: this.state, updatef: this.updateflag, updatestat: this.updatestatus, filterfunction: this.applyFilterHandler, fetchStudents: this.fetchStudents, setSearch: this.setSearch, getDegrees: this.getDegrees}
    return (
        <StudentsContext.Provider value={contextData}>
            {this.props.children}
            {/* {console.log('Context render')} */}
        </StudentsContext.Provider>)
    }
    
}

const mapDispatchToProps = (dispatch)=>({
    createToast: (toast)=>dispatch(CreateToast(toast))
})

export const StudentsProvider = connect(null, mapDispatchToProps)(StudentsProviderComponent);