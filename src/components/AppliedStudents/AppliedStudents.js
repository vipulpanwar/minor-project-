import React, {Component} from 'react';
import StudentsHeader from './StudentsHeader';
import StudentList from './StudentList';
import {FetchJobDetails as fetchJobAction, Search as SearchAction, FetchStudent as getStudentAction} from '../../store/actions/jobs';

import Modal from '../shared/ui/Modal/Modal';
import Resume from '../Resume/Resume';
import {Route, withRouter} from 'react-router-dom';
import Filters from './Filter';
import {connect} from 'react-redux';
import { Fragment } from 'react';
import {StudentsProvider} from './StudentsContext';

const modalStyle = {
    maxWidth: 886,
    margin:'150px 0',
    top:0,
    borderRadius:14,
    transform:"translateX(-50%)",
    position:'relative',
    background:'transparent'
}


class AppliedStudents extends Component{
    state = {
        showFilters:false,
    }
    modalCloseHandler = ()=>{
        this.props.history.push("/jobs/" + this.props.computedMatch.params.jobId)
    }
    toggleFilterHandler = ()=>{
        this.setState((prevState)=>({
            showFilters : !prevState.showFilters,
        }))
    }

    componentDidMount (){
        let jobId = this.props.computedMatch.params.jobId;
        this.props.getJob(jobId);
        document.body.style.background = "#F4F4F6";
    }

    componentWillUnmount(){
        document.body.style.background = "";
    }

    searchInputHandler=(e)=>{
        this.setState({'query': e.target.value});
    }

    render(){
        console.log("applied student render")
        return(<div>
        
            <StudentsProvider>
                <StudentsHeader loading={this.props.loading} title={`${this.props?.job?.appliedStudentsCount} Students Applied`} subTitle={this.props?.job?.profile} filterToggle={this.toggleFilterHandler}/>
                <StudentList getStudent={this.props.getStudent} jobLoading={this.props.loading}/>
                {this.props.loading? null :
                <Fragment>
                    <Modal show={this.state.showFilters} style={ {maxWidth: 791}} closeHandler={this.toggleFilterHandler}>
                        <Filters eligibleCourses={this.props.job.eligibleCourses} closeHandler={this.toggleFilterHandler} />
                    </Modal>

                    <Route path={`${this.props.path}/student/:studentId`}  >
                        <Modal show={!this.props.loading} style={modalStyle} closeHandler={this.modalCloseHandler}>
                            <Resume/>
                        </Modal>
                    </Route>
                </Fragment>
                }
            </StudentsProvider>
            </div>);
    }
}

const mapDispatchToProps = (dispatch)=>({
    getJob: (id)=> dispatch(fetchJobAction(id)),
    search: (query)=> dispatch(SearchAction),
    getStudent: (email)=>dispatch(getStudentAction(email))
    
})

const mapStateToProps = (state)=>({
    job: state.jobs.job,
    loading: state.jobs.jobLoading,
    appliedStudents: state.jobs.appliedStudents
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppliedStudents));
