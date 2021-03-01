import React, { createRef, Fragment} from 'react';
import {connect} from 'react-redux';
import {Logout as logoutAction} from '../../store/actions/auth';
import {FetchAllJobs as FetchJobsAction } from '../../store/actions/jobs';

import './home.css';
import Logo from './images/ensvee-logo.svg';
import Card from './Card.js';
import Slider from './Slider.js';
import NoSlider from './NoSlider.js';
import Button from '../../components/shared/ui/Button/Button.js';

var no_of_cards=4;


class Home extends React.Component{

    no_of_cards = 4;


    constructor(props){
      super(props);
    };


  componentDidMount(){
    this.props.getJobs();
    console.log('Component did mount');
  }

    render(){
        return(
        <div className="home-container">
          {this.props.jobsState.refLoading?<h1>Loading...</h1>: <Fragment>
            <div className='home-top-bar'>
              <img className='logo' src= {Logo} />
              <Button className='log-out' onClick={this.props.logout} width="127px" height="51px" style={{position:'absolute', right:'29px', top:'30px'}}>Log Out</Button>
              <p className='job-postings'>Job Postings</p>
            </div>
            
            {/*}<div className="middle-container slide-container">
              <button onClick={this.Leftscroll} className={!this.state.left?'hidden':"slider-button left-arrow"}>
                <img width='12.5px' src={LeftArrow}/>
              </button>
              <div className='items-container' ref={this.listRef}>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                {cardList(this.props.jobsState.jobs)}
              </div>*/}
              <Slider className={(no_of_cards>3)?'hidden':''}/>
              {/*<NoSlider className={(no_of_cards<4)?'hidden':''} />*/}

            <div className='bottom-container'>
              <p className='announcement-text'>
                more features comming soon
              </p>
            </div></Fragment>}
        </div>);
    }
}

const cardList = (jobsList)=>{
  return jobsList.map(job=>(
    <Fragment key={job.id}>
      <Card  className="single-item" job={job}/>
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

export default connect(mapStateToProps, mapDispatchToProps) (Home);
