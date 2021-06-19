import React, {Component} from 'react';
import StudentsHeader from './StudentsHeader';
import StudentList from './StudentList';

import Modal from '../shared/ui/Modal/Modal';
import Filters from './Filter';
import ResumeContainer from './ResumeContainer';
import {Switch, Route} from 'react-router-dom';
import {db, cloudFnURL} from '../../firebase';
import {StudentsProvider, StudentsContext} from './StudentsContext.js';
import axios from 'axios';



class AppliedStudents extends Component {
    state = {
        showFilters:false,
        jobsdata: null,
        countdata: null,
        countLoading: true,
        beenInforeground : this.props.computedMatch.isExact,
    }

    toggleFilterHandler = ()=>{
        this.setState((prevState)=>({
            showFilters : !prevState.showFilters,
        }))
    }

    async componentDidMount (){
        document.body.style.background = "#F4F4F6";
        let filters = {...this.context.state.filters};
        filters.status = this.props.hired ? "Hired" : "Applied";
        this.context.setFilters(filters)

        const jobId = this.props.computedMatch.params.jobId;

        let jd = await db.collection('jobs').doc(jobId).get();
        this.setState({jobsdata: jd.data()});
        
        let res = await axios.get( `${cloudFnURL}/get_applied_count/${jobId}`);

        //RESET NEW COUNT TO ZERO
        if(res.data.newCount)
            db.collection('jobs').doc(jobId).collection('count').doc(jobId).update({newCount: 0})

        this.setState({countdata: res.data, countLoading:false});
    }

    componentDidUpdate(){
        if(this.props.computedMatch.isExact && this.state.beenInforeground == false)
            this.setState({beenInforeground:true})
    }

    componentWillUnmount(){
        document.body.style.background = "";
    }

    searchInputHandler=(e)=>{
        this.setState({'query': e.target.value});
    }

    render(){
        const Modalstyling = {maxWidth: this.state.jobsdata?.campus ? 791 : 400}

        return (
            <>
                <StudentsHeader showHired={this.props.hired} jobId={this.props.computedMatch.params.jobId} loading={this.state.countLoading} counts={this.state.countdata} subTitle={this.state.jobsdata?.title} filterToggle={this.toggleFilterHandler}/>
                <StudentList count={this.state.countdata}/>
                <Modal show={this.state.showFilters && !this.state.countLoading} style={Modalstyling} closeHandler={this.toggleFilterHandler}>
                    <Filters job={this.state.jobsdata} campus={this.state.jobsdata?.campus} closeHandler={this.toggleFilterHandler} />
                </Modal>
                <ResumeContainer path={this.props.path}/>
            </>
        );
    }
}

AppliedStudents.contextType = StudentsContext;

export default (props) => (
    <StudentsProvider jobId={props.computedMatch.params.jobId}>
        <AppliedStudents {...props}/>
    </StudentsProvider>)


