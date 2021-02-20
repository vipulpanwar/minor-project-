import React, {Component} from 'react';
import StudentsHeader from './StudentsHeader';
import StudentList from './StudentList';
import {FetchJobDetails as fetchJobAction} from '../../store/actions/jobs';

import Modal from '../shared/ui/Modal/Modal';
import Resume from '../Resume/Resume';
import {Route, withRouter} from 'react-router-dom';
import Filters from './Filter';
import {connect} from 'react-redux';

const modalStyle = {
    maxWidth: 886,
    top: '50%',
    maxHeight: '80vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRadius:14,
    transform:"translate(-50%, -50%)"
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
    }

    render(){
        return(<div>
                <StudentsHeader title="42 Students Applied" subTitle="Android Developer" filterToggle={this.toggleFilterHandler}/>
                <StudentList/>

                <Modal show={this.state.showFilters} style={{width:'853px'}} closeHandler={this.toggleFilterHandler}>
                    <Filters />
                </Modal>

                <Route path={`${this.props.path}/student/:studentId`}  >
                    <Modal show style={modalStyle} closeHandler={this.modalCloseHandler}>
                        <Resume/>
                    </Modal>
                </Route>

            </div>);
    }
}

const mapDispatchToProps = (dispatch)=>({
    getJob: (id)=> dispatch(fetchJobAction(id))
})

const mapStateToProps = (state)=>({
    job: state.jobs.job,
    loading: state.jobs.jobLoading,
    appliedStudents: state.jobs.appliedStudents
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppliedStudents));
