import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './home.css';
import Background1 from './background-1.svg';
import Content from './images/content-to-be-replaced.svg';
import Ibutton from './images/ibutton.svg';
import { Fragment } from 'react';

function Card (props) {
  return(
    <div className='card'>
      {props.job.loading ? <h2>Loading...</h2>: 
      <Fragment>
        <br />
        <br />
        <img className='card-logo' src={`https://firebasestorage.googleapis.com/v0/b/ensveetest.appspot.com/o/${props.job.logo}?alt=media`} alt="google logo icon png transparent background osteopathy" />
        <br /><br /><br /><br /><br />
        <div className='card-container'>
          <Link to={`jobs/${props.job.id}`}>
            <h1 className="job-title">{props.job.profile}</h1>
          </Link>
          <img src={Ibutton} className="i-button"/>
          <p className='job-details'>{props.job.type ='Full-time' ? 'Full Time' : 'Internship'} | {props.job.ctc} {props.job.type ='Full-time' ? "LPA" : "KPM"} | 12 Jan’20</p>
          <p className='students-applied'>Students Applied</p>
          <p className='students-number'>{props.job.appliedStudentsCount}</p>
        </div>
      </Fragment>}
    </div>
  );
}

export default Card;
