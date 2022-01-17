import { CreateToast } from '../../store/actions/alert';
import { connect } from 'react-redux';
import axios from 'axios';
import React , { createContext, Component} from 'react';
import { cloudFnURL, db } from '../../firebase';
import userPlaceholder from '../../assets/images/user_placeholder.jpg';
export const StudentsContext = createContext();



class StudentsProviderComponent extends Component {
    state = {
        filters:{   
            degree: 'All',
            course: 'All',
            field: 'All',
            flag: 'All',
            collegeid: 'All',
            skills: [],    
            status: null,
        },
        searchQuery:"",
        hasMore: true,
        applicants:[ ]
    }

    updateFlag = async (studentId, newflag)=>{

        let findingstudent = this.state.applicants.find((student)=>{return student.id == studentId});
        if(newflag==findingstudent.flag) return 0;
        
      
        try{
            await db.collection('jobs').doc(this.props.jobId).collection('applicants').doc(studentId).update({flag:newflag});
            let updatingstudent = {...findingstudent}
            updatingstudent.flag = newflag;

            let index = this.state.applicants.findIndex((student)=>{return student.id == studentId});
            let applicantsCopy = [...this.state.applicants]

            applicantsCopy[index] = updatingstudent;
            this.setState({applicants:applicantsCopy})
        }
        catch(error){
            console.log(error)
            this.props.createToast({message:"Something Went Wrong"})
        }    
    }

    updateStatus = async (studentId, newstatus, callback=()=>{})=>{

        let student = this.state.applicants.find((student)=>{return student.id == studentId});
        if(newstatus!=student.status){
            console.log(studentId, newstatus);
            try {
                
                await axios.post( cloudFnURL + '/change_applicant_status/', {'applicantId':studentId, jobId:this.props.jobId, status:newstatus})
                // await axios.post('https://us-central1-oneios.cloudfunctions.net/app/change_applicant_status/', {'applicantId':studentId, jobId:this.props.jobId, status:newstatus})
                let updatedStudent = {...student}
                let index = this.state.applicants.findIndex((student)=>{return student.id == studentId});
                let applicantsCopy = [...this.state.applicants]
                updatedStudent.status = newstatus; 
                updatedStudent.resumeMessage = {
                    message: newstatus== 'Hired' ? "This applicant has been hired" : "This applicant has been rejected and will be removed from the list.",
                    type:newstatus
                }
                applicantsCopy[index] = updatedStudent;

                callback();
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
        this.fetchBulk(emails);
    }

    setFilters = (filters)=>{
        this.setState({filters: filters});
        this.fetchBulk(filters);    
    }

    fetchBulk = async (filters= this.state.filters, more=false, limit=10)=>{
        
        this.setState({studentLoading:true});
        if(!more)
        this.setState({applicants:[]})

        
        let applicants = [];
        let query = db.collection('jobs').doc(this.props.jobId).collection('applicants').limit(limit);        
        query = this.mapFiltersToQuery(query, filters);

        if(more) {
            let studentsLength= this.state.applicants.length;
            let lastStudent = this.state.applicants[studentsLength - 1]
            let lastStudentDoc = await db.collection('jobs').doc(this.props.jobId).collection('applicants').doc(lastStudent.id).get();
            query = query.startAfter(lastStudentDoc)
        }

        let studentDocslist = await query.get();
        applicants = this.mapApplicantDocsToObj(studentDocslist);

        let newApplicants = applicants;
        if(more)
            newApplicants = [...this.state.applicants, ...applicants];

        
        this.setState({studentLoading: false, hasMore: (applicants.length==limit)});
    }

    fetchSingle = async (email) =>{
        let query =  db.collection('jobs').doc(this.props.jobId).collection('applicants').limit(1);
        // query = this.mapFiltersToQuery(query);
        let applicant = this.state.applicants.find(applicant=> applicant.email == email);
        if(!applicant){
            let snapshot = (await query.where("email", '==', email).get());
            applicant = this.mapApplicantDocsToObj(snapshot)[0];
            
            // this.setState({applicants:[applicant]});
        }
    }

    mapFiltersToQuery =(query, filters = this.state.filters)=>{
        for (let filterKey in filters){
            if(!filters[filterKey] || filters[filterKey]?.length === 0) continue;
            if(filters[filterKey] == "All") continue;
            if(filterKey == 'selectedCollegeData') continue;
            console.log(filterKey, filters[filterKey])
            switch(filterKey){
                case 'All':
                case '':
                    break;
                
                case 'course':
                case 'field':
                    query = query.where(`edu.${filters.degree}.${filterKey}`, '==', filters[filterKey]);
                    break;
                
                case 'skills':
                    query = query.where('skillkey', 'array-contains-any', filters[filterKey]);
                    break;
                
                default:
                    query = query.where(filterKey, '==', filters[filterKey])
                    break;
            }
        }
        return query;
    }

    mapApplicantDocsToObj=(snapshot)=>{
        let applicants = [];
        snapshot.forEach(applicantDoc=>{
            let applicant = applicantDoc.data();
            applicant.hskills = this.skillSorter(applicant.hskills)
            applicant.sskills = this.skillSorter(applicant.sskills)
            applicant.id= applicantDoc.id;
            applicant.profilePic = userPlaceholder;
            applicant.doc = applicantDoc
            applicants.push(applicant);
            // console.log(applicant);
        });
        return applicants;
    }

    skillSorter = (propskills) =>{
        let skills = Object.keys(propskills);
        let skillMap = {}
        skills.sort()
        skills.forEach((skill)=>{
            skillMap[skill] = true
        })
        return skillMap
    }


    render(){
        let contextData = {
            state: this.state,
            fetchBulk : this.fetchBulk,
            setFilters:this.setFilters,
            updateFlag:this.updateFlag,
            updateStatus:this.updateStatus,
            setSearch: this.setSearch,
        }
        return (
            <StudentsContext.Provider value={contextData}>
                {this.props.children}
            </StudentsContext.Provider>)
    }
}


const mapDispatchToProps = (dispatch)=>({
    createToast: (toast)=>dispatch(CreateToast(toast))
});

export const StudentsProvider = connect(null, mapDispatchToProps)(StudentsProviderComponent);