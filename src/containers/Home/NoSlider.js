import React, { createRef, Fragment} from 'react';
import {connect} from 'react-redux';
import {Logout as logoutAction} from '../../store/actions/auth';
import {FetchAllJobs as FetchJobsAction } from '../../store/actions/jobs';

import './home.css';
import Background1 from './background-1.svg';
import Card from './Card.js';

class NoSlider extends React.Component{

  constructor(props){
    super(props);

    this.listRef = createRef();
  };

  componentDidMount(){
    this.props.getJobs();
    console.log('Component did mount');
  }

    render(){
        return(
              <div className='no-slider-container middle-container'>
                {cardList(this.props.jobsState.jobs)}
              </div>
        );
    }
}

const cardList = (jobsList)=>{
  return jobsList.map(job=>(
    <Fragment key={job.id}>
      <Card  className="single-item" job={job}/>
    </Fragment>))
}

const mapDispatchToProps = (dispatch) => ({
    logout : ()=> dispatch(logoutAction()),
    getJobs: ()=> dispatch(FetchJobsAction()),
})

const mapStateToProps = (state)=>({
  jobsState: state.jobs
})

export default connect(mapStateToProps, mapDispatchToProps) (NoSlider);
