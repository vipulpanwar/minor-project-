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
import {db} from '../../firebase';
import {StudentsProvider} from './StudentsContext';
import StudentsCard from './StudentCard';

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
        jobsdata: [],
        countdata: [],
        applicants: [],
        applicantsData: [],
        countLoading: true,
    }
    modalCloseHandler = ()=>{
        this.props.history.push("/jobs/" + this.props.computedMatch.params.jobId)
    }
    toggleFilterHandler = ()=>{
        this.setState((prevState)=>({
            showFilters : !prevState.showFilters,
        }))
    }

    async componentDidMount (){
        // let jobId = this.props.computedMatch.params.jobId;
        // this.props.getJob(jobId);
        document.body.style.background = "#F4F4F6";
        let applicants = [];
        let countdata =[];
        let jobdata = [];

        let jd = await db.collection('jobs').doc(this.props.computedMatch.params.jobId).get();
        this.setState({jobsdata: jd.data()});
        console.log(this.state.jobsdata, "see me");
        
        let cd = await db.collection('jobs').doc(this.props.computedMatch.params.jobId).collection('count').get();
        cd.forEach(jobDoc=>{
            let job = jobDoc.data();
            countdata.push(job);
            console.log(job);
        });
        this.setState({countdata: countdata[0]});
        

        let ad = await db.collection('jobs').doc(this.props.computedMatch.params.jobId).collection('applicants').get();
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

    componentWillUnmount(){
        document.body.style.background = "";
    }

    searchInputHandler=(e)=>{
        this.setState({'query': e.target.value});
    }

    render(){
        console.log("applied student render")
        return(<div>
        
            <StudentsProvider jobId={this.props.computedMatch.params.jobId}>
                <StudentsHeader loading={this.state.countLoading} title={`${this.state.countdata.count} Students Applied`} subTitle={this.state.jobsdata.title} filterToggle={this.toggleFilterHandler}/>
                
                {/* {!this.state.countLoading && <StudentsCard getStudent={this.state.applicants} student={this.state.applicants[0]}/>} */}
                <StudentList/>
                {this.state.countLoading? null :
                <Fragment>
                    {/* <Modal show={this.state.showFilters} style={ {maxWidth: 791}} closeHandler={this.toggleFilterHandler}>
                        <Filters eligibleCourses={this.props.job.eligibleCourses} closeHandler={this.toggleFilterHandler} />
                    </Modal> */}

                    <Route path={`${this.props.path}/student/:studentId`}  >
                        <Modal show={!this.state.countLoading} style={modalStyle} closeHandler={this.modalCloseHandler}>
                            <Resume close={this.modalCloseHandler}/>
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
