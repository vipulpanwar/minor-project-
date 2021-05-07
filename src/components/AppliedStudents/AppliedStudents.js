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
import axios from 'axios';

const modalStyle = {
    maxWidth: 1100,
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
        if(this.props.hired)
            this.props.history.push("/jobs/" + this.props.computedMatch.params.jobId +'/hired')
        else
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
        let countdata =[];

        let jd = await db.collection('jobs').doc(this.props.computedMatch.params.jobId).get();
        this.setState({jobsdata: jd.data()});
        
        let res = await axios.get('https://asia-south1-ensveeproduction.cloudfunctions.net/app/get_applied_count/' + this.props.computedMatch.params.jobId);


        // let cd = await db.collection('jobs').doc(this.props.computedMatch.params.jobId).collection('count').get();
        // cd.forEach(jobDoc=>{
        //     let job = jobDoc.data();
        //     countdata.push(job);
        //     console.log(job);
        // });
        if(res.data.newCount)
        db.collection('jobs').doc(this.props.computedMatch.params.jobId).collection('count').doc(this.props.computedMatch.params.jobId).update({newCount: 0}).then(()=>{
            console.log("new count reseted")
        })
        else{
            console.log("New Count Already 0")
        }
        this.setState({countdata: res.data});
        this.setState({countLoading:false})
    }

    componentWillUnmount(){
        document.body.style.background = "";
    }

    searchInputHandler=(e)=>{
        this.setState({'query': e.target.value});
    }

    render(){
        let Modalstyling = {maxWidth:791}
        if(!this.state.jobsdata.campus){
            Modalstyling = {maxWidth: 400}
        }
        console.log(this.props.hired, "applied studs props")
        return(<div>
        
            <StudentsProvider hired={this.props.hired} count ={this.state.countdata} jobId={this.props.computedMatch.params.jobId}>
                <StudentsHeader jobId={this.props.computedMatch.params.jobId} loading={this.state.countLoading} counts={this.state.countdata} subTitle={this.state.jobsdata.title} filterToggle={this.toggleFilterHandler}/>
                
                <StudentList count={this.state.countdata}/>
                {this.state.countLoading? null :
                <Fragment>
                    <Modal show={this.state.showFilters} style={Modalstyling} closeHandler={this.toggleFilterHandler}>
                        <Filters job={this.state.jobsdata} campus={this.state.jobsdata.campus} closeHandler={this.toggleFilterHandler} />
                    </Modal>

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
