import React, {Component} from 'react';
import { Link } from "react-router-dom";
import BgImage from './background-1.svg';
import './home.css';
import Ibutton from './images/ibutton.svg';
import { Fragment } from 'react';
import CardSkeletonLoader from './CardSkeletonLoader';
import blueNextButton from './images/next-button.svg';
import moment from 'moment';

const style={
  background:`url(${BgImage})`,
  // border: `1px solid #D4D5DA`,
}

function Card (props) {
  return(
    <div className='card' style={props.job.loading?null:style}>
      {props.job.loading? <CardSkeletonLoader />: 
      <Fragment>
        <br />
        <br />
        <img className='card-logo' src={`https://firebasestorage.googleapis.com/v0/b/ensvee${process.env.MODE=='test'?'test':'web'}.appspot.com/o/${props.job.logo}?alt=media`} alt="google logo icon png transparent background osteopathy" />
        <br /><br /><br /><br /><br />
        <Link to={`jobs/${props.job.id}`}>
          <div className='card-container'>
            <h1 className="job-title">{props.job.profile}</h1>
            <img src={Ibutton} className="i-button"/>
            <p className='job-details'>{props.job.type =='Full-time' ? 'Full Time' : 'Internship'} | {props.job.ctc} {props.job.type == 'Full-time' ? "LPA" : "KPM"} | {formatDate(props.job.deadline)}</p>
            <p className='students-applied'>Students Applied</p>
            <p className='students-number'>{props.job.appliedStudentsCount}</p>
            <button className="blueNextButton"><img src={blueNextButton}></img></button>
          </div>
        </Link>
      </Fragment>}
    </div>
  );
}

const formatDate = (timestamp)=>{
  var t = new Date(1970, 0, 1);
  let dateTime = t.setSeconds(timestamp.seconds);
  if(timestamp.seconds==4102425000)
    return "Present";
  else
    // return moment(dateTime).format('Do MMM YYYY')
    return moment(dateTime).format('DD MMM\'YY');
    ;
}

export default Card;
