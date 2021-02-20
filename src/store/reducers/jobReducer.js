import * as actionTypes from "../actions/actionTypes";
import firebase from '../../firebase';

const initialState = {
    jobs: undefined,
    refLoading:true,
}

const reducer = (state = initialState, action)=>{

    switch(action.type)
    {
        case actionTypes.FETCH_ALL_JOB_REFS_SUCCESS :
            let jobs = action.payload;
            jobs.forEach(job=>job['loading'] = true)
            return {...state, jobs: action.payload, refLoading:false}

        case actionTypes.FETCH_JOB_SUCCESS:
            let newJobs = state.jobs.map(job=>{
                if(job.id == action.payload.id)
                    return {...job, ...action.payload.data(), loading: false}
                return job;
            })
        
            return {...state, jobs:newJobs}

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

        return {...state, appliedStudents, job};

        default:
        return state;
    }
}

export default reducer;