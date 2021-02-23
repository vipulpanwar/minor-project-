import * as actionTypes from './actionTypes';
import firebase from '../../firebase';

const db = firebase.firestore();


//-----------------Fetch All Job---------------------

export const FetchAllJobs = ()=>{
    return async (dispatch, getState) => {
        const {auth} = getState();

        dispatch(FetchAllJobsStart())
        let companyDocSnap = await db.collection('companies').where('email','==', auth.user.email).get();
        if(companyDocSnap.empty);

        //getting refDocs
        let companyDocRef = companyDocSnap.docs[0].ref;
        let jobsRefsDocList = await companyDocRef.collection('jobs').orderBy('time', 'desc').get();
        
        let jobs = [];
        jobsRefsDocList.forEach(doc=>{
            let jobRef = doc.data().jobRef;
            jobs.push({ref:jobRef, id: jobRef.id});
        }) 
        dispatch(FetchAllJobRefsSuccess(jobs))

        jobs.forEach(job=>{
            dispatch(FetchJob(job.ref))
        })
    }
}

export const FetchAllJobsStart = ()=>({
    type: actionTypes.FETCH_ALL_JOBS,
});


export const FetchAllJobRefsSuccess = (jobs)=>({
        type: actionTypes.FETCH_ALL_JOB_REFS_SUCCESS,
        payload: jobs,
    })


//-----------------Fetch Single Job---------------------

export const FetchJob = (ref)=>{
    return async (dispatch)=>{
        dispatch(FetchJobStart())
        try{
            let jobDoc = await ref.collection('jobInformation').doc('allDetails').get();
            dispatch(FetchJobSuccess(jobDoc, ref.id))
        }
        catch(e){
            dispatch(FetchJobFailed(e))
            console.log(e);
        }
    }
}

export const FetchJobStart = ()=>({
    type: actionTypes.FETCH_JOB,
});

export const FetchJobSuccess = (jobDoc, id)=>({
    type: actionTypes.FETCH_JOB_SUCCESS,
    payload: {jobDoc, id},
});

export const FetchJobFailed = (error)=>({
    type: actionTypes.FETCH_JOB_FAILED,
    payload: error
});





export const FetchAppliedStudents = (jobId)=>{
    return (dispatch, getState)=>{
        
    }
}

//-----------------Fetch Job Details---------------------

export const FetchJobDetails = (jobId) =>{
    return async (dispatch, getState) => {
        const {auth}=getState();

        let companyDocSnap = await db.collection('companies').where('email','==', auth.user.email).get();
        if(companyDocSnap.empty);
        let companyDocRef = companyDocSnap.docs[0].ref;

        let jobRefDoc = (await companyDocRef.collection('jobs').doc(jobId).get()).data()['jobRef'];
        let jobInfo = await jobRefDoc.collection('jobInformation').get();
        console.log('Dispatch')
        dispatch(FetchJobDetailsSuccess(jobInfo))
        let {jobs} = getState();
        jobs.appliedStudents.forEach(student=>{
            dispatch(FetchStudent(student.email))
        })
    }
}

export const FetchJobDetailsSuccess = (jobInfo)=>({
    type: actionTypes.FETCH_JOB_DETAILS_SUCCESS,
    payload: jobInfo
})


//-----------------Fetch Student---------------------

export const FetchStudent = (email)=>{
    return async (dispatch)=>{
        try{
            let studentDoc = await db.collection('student').doc(email).get();
            dispatch(FetchStudentSuccess(studentDoc));
        }
        catch(e)
        {
            console.log(e);
            dispatch(FetchStudentFailed(e, email))
        }

    }
}

export const FetchStudentSuccess = (student)=>({
    type: actionTypes.FETCH_STUDENT_SUCCESS,
    payload:student
})

export const FetchStudentFailed = (error, id)=>({
    type: actionTypes.FETCH_STUDENT_FAILED,
    payload: {studentId:id,  error}
})

// ---------------- Filters -------------------

export const ApplyFilters = (filters)=>{
    return (dispatch)=>{
        dispatch(ApplyFilterStart(filters));

    }
}

export const ApplyFilterStart = (filters)=>({
    type: actionTypes.APPLY_FILTERS,
    payload: filters
})


export const Search = (query)=>({
    type:actionTypes.SEARCH,
    payload:query
})