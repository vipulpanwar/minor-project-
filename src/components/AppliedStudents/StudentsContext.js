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
        this.state.applicantsData.forEach(jobDoc=>{
            let job = jobDoc.data();
            applicants.push(job);
            console.log(job);
        });
        this.setState({applicants: applicants});
        this.setState({countLoading: false});
        console.log(applicants, "applicants");

    }

    render(){
        let contextData = this.state
    return (
        <StudentsContext.Provider value={contextData}>
            {this.props.children}
            {/* {console.log('Context render')} */}
        </StudentsContext.Provider>)
    }
    
}

export const StudentsProvider = (StudentsProviderComponent);