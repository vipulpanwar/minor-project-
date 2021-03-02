import React, {Component} from 'react';
import { Link } from "react-router-dom";
import BgImage from './background-1.svg';
import './home.css';
import Ibutton from './images/ibutton.svg';
import { Fragment } from 'react';
import CardSkeletonLoader from './CardSkeletonLoader';

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
        <img className='card-logo' src={`https://firebasestorage.googleapis.com/v0/b/ensveetest.appspot.com/o/${props.job.logo}?alt=media`} alt="google logo icon png transparent background osteopathy" />
        <br /><br /><br /><br /><br />
        <Link to={`jobs/${props.job.id}`}>
          <div className='card-container'>
            <h1 className="job-title">{props.job.profile}</h1>
            <img src={Ibutton} className="i-button"/>
            <p className='job-details'>{props.job.type ='Full-time' ? 'Full Time' : 'Internship'} | {props.job.ctc} {props.job.type ='Full-time' ? "LPA" : "KPM"} | 12 Jan’20</p>
            <p className='students-applied'>Students Applied</p>
            <p className='students-number'>{props.job.appliedStudentsCount}</p>
          </div>
        </Link>
      </Fragment>}
    </div>
  );
}

export default Card;
