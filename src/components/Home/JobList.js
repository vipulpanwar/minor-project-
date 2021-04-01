import React, { createRef, Fragment} from 'react';
import {connect} from 'react-redux';
import {Logout as logoutAction} from '../../store/actions/auth';
import {FetchAllJobs as FetchJobsAction } from '../../store/actions/jobs';
import {Route, withRouter} from 'react-router-dom';


import './home.css';
import Logo from '../../assets/images/ensvee-logo.svg';
import Slider from './Slider.js';
import Button from '../../components/shared/ui/Button/Button.js';
import HomeInfo from './HomeInfo.js';
import Modal from '../shared/ui/Modal/Modal';
import Loader from '../shared/ui/Loader/Loader';
import BottomNav from './BottomNav';
import {ModalWithHeader} from '../shared/ui/Modal/Modal';
import NewJobForm from '../NewJobForm/NewJobForm';
import {db} from '../../firebase';
import axios from 'axios';

class JobList extends React.Component{
  state = {
    jobs:[],
    loading:true,
  }
  

  async componentDidMount(){


    let unsubscribeJobs = db.collection('jobs').where('creatorid', '==', this.props.user.uid).onSnapshot(async jobsSnap=>{
        let jobs = [];
        jobsSnap.forEach(jobDoc=>{
            let job = jobDoc.data();
            job.id = jobDoc.id;
            jobs.push(job);    
          })
          console.log('test', jobs)
        await Promise.all(jobs.map( async (job, i)=>{
          let newJob = job;
          let res = await axios.get('https://us-central1-oneios.cloudfunctions.net/app/get_applied_count/' + job.id);
          console.log(res.data,"count")
          newJob['newCount'] =  res.data['newCount'];
          newJob['count'] = res.data.count;
          jobs[i] = newJob;
        }))
        console.log(jobs);
        this.setState({jobs, loading:false})
    });    
    console.log('Component did mount');

    this.unsubscribe = ()=>{
      unsubscribeJobs();
    }
  }

  componentWillUnmount(){
      this.unsubscribe()
  }

  modalCloseHandler = ()=>{
    this.props.history.push("/")
  }
    render(){
        return(
        <div className="home-container">
            <Modal show={false} style={ {maxWidth: 840, background: "#FFFFFF", boxShadow: "0px 26px 24px -20px rgba(0, 0, 0, 0.25)", borderRadius: "14px",}} closeHandler={console.log("band 1")}>
              <HomeInfo closeHandler={console.log("band 2")} />
            </Modal>
            <div className='home-top-bar'>
              <img className='logo' src= {Logo} />
              <Button className='log-out' clicked={this.props.logout} width="127px" height="51px" style={{position:'absolute', right:'29px', top:'30px'}}>Log Out</Button>
              <p className='job-postings'>Job Postings</p>
            </div>
            { this.state.loading ? 
            <div className="central-loader"><Loader/></div>
            : 
            <Fragment>
              <Slider jobs={this.state.jobs}/>
            </Fragment>}
        </div>);
    }
}


const mapDispatchToProps = (dispatch) => ({
    logout : ()=> dispatch(logoutAction()),
    getJobs: ()=> dispatch(FetchJobsAction()),
})

const mapStateToProps = (state)=>({
  user: state.auth.user
})

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(JobList));
