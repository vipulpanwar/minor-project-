import * as actionTypes from './actionTypes';
import firebase from '../../firebase';

const db = firebase.firestore();


export const FetchAllJobs = ()=>{
    return async (dispatch, getState) => {
        const {auth} = getState();

        dispatch(FetchAllJobsStart())
        let companyDocSnap = await db.collection('companies').where('email','==', auth.user.email).get();
        if(companyDocSnap.empty);

        //getting refDocs
        let companyDocRef = companyDocSnap.docs[0].ref;
        let jobsRefsDocList = await companyDocRef.collection('jobs').orderBy('time').get();
        
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

export const FetchJob = (ref)=>{
    return async (dispatch)=>{
        dispatch(FetchJobStart())
        try{
            let jobDoc = await ref.get();
            dispatch(FetchJobSuccess(jobDoc))
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

export const FetchJobSuccess = (jobDoc)=>({
    type: actionTypes.FETCH_JOB_SUCCESS,
    payload: jobDoc
});

export const FetchJobFailed = (error)=>({
    type: actionTypes.FETCH_JOB_FAILED,
    payload: error
});





export const FetchAppliedStudents = (jobId)=>{
    return (dispatch, getState)=>{
        
    }
}

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
    }
}

export const FetchJobDetailsSuccess = (jobInfo)=>({
    type: actionTypes.FETCH_JOB_DETAILS_SUCCESS,
    payload: jobInfo
})