import * as actionTypes from "../actions/actionTypes";
import firebase from '../../firebase';

const initialState = {
    jobs: undefined,
    refLoading:true,
    jobLoading: true,
    appliedStudents: []
}

const reducer = (state = initialState, action)=>{

    switch(action.type)
    {
        case actionTypes.FETCH_ALL_JOBS:
            return {...state, refLoading:true}

        case actionTypes.FETCH_ALL_JOB_REFS_SUCCESS :
            let jobs = action.payload;
            jobs.forEach(job=>job['loading'] = true)
            return {...state, jobs: action.payload, refLoading:false}

        case actionTypes.FETCH_JOB_SUCCESS:
            let newJobs = state.jobs.map(job=>{
                if(job.id == action.payload.id)
                    return {...job, ...action.payload.jobDoc.data(), loading: false}
                return job;
            })
        
            return {...state, jobs:newJobs}
        
        
        case actionTypes.FETCH_JOB_DETAILS:
            return {...state, jobLoading:true}
        
        case actionTypes.FETCH_JOB_DETAILS_SUCCESS:
            let jobInfo = action.payload;
            let appliedStudents = [];
            let job= {}
            jobInfo.forEach(doc=>{
                if(doc.id == "allDetails")
                    job = doc.data();
                else
                    appliedStudents = doc.data()['studentsApplied'].concat(appliedStudents);  
            })
            appliedStudents.forEach(stud=> stud['loading']=true)

        return {...state, appliedStudents, job, jobLoading: false};

        case actionTypes.FETCH_STUDENT_SUCCESS:
            let newAppliedStudents = state.appliedStudents.map(student=>{
                if(student.email == action.payload.data().email)
                    return {...student, ...action.payload.data(), loading: false}
                return student;
            })
        
            return {...state, appliedStudents: newAppliedStudents, loading:false}

        case actionTypes.APPLY_FILTERS:
            let filters = action.payload;
            let filtersActive = filters.degree !='All' || filters.course!='All' || filters.degree !='All'  ? true: false;
            let visibleStudentsIndices = [];
            state.appliedStudents.forEach((student, i)=>{
                let select = true;
                if(filters.degree!='All' && student.degree != filters.degree )
                    select = select && false;
                if(filters.course!='All' && student[student.degree].course != filters.course)
                    select = select && false;
                if(filters.branch!='All' && student[student.degree].branch != filters.branch)
                    select = select && false;
                
                if(select)
                    visibleStudentsIndices.push(i);
            })

            return {...state, filters, filtersActive, visibleStudentsIndices}

            // case actionTypes.SEARCH:
            //     let query = action.payload;
            //     state.appliedStudents.forEach((student, i)=>{
            //         visibleStudentsIndices.push(i);
            //     })

            // return {...state, query: action.payload}
        default:
        return state;
    }
}

export default reducer;