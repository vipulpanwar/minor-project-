import React, {Fragment, useState} from 'react';
import { Link } from "react-router-dom";
import BgImage from './background-1.svg';
import './home.css';
import HomeInfo from './HomeInfo.js';
import Modal from '../shared/ui/Modal/Modal';
import styles from './Card.module.css';
import Ibutton from '../../assets/icons/ibutton.svg';
import CardSkeletonLoader from './CardSkeletonLoader';
import blueNextButton from '../../assets/icons/next-button.svg';
import moment from 'moment';

const style={
  background:`url(${BgImage})`,
}

function Card (props) {
  let card;

  if(props?.job?.loading)
    card = <LoadingCard/>;
  else if(props.newCard)
    card = <AddNewJobCard {...props}/>
  else
    card = <DetailCard {...props}/>

  return card;
}

const LoadingCard = () => (
  <div className={styles.Card}>
    <CardSkeletonLoader />
  </div>)

function DetailCard(props){
const [showHomeInfo, ToggleHomeInfo] = useState(false)
  return(
    <div className={styles.Card} style={style}>
    <Link to={`jobs/${props.job.id}`}>
      <div className={[styles.Container,styles.CardContainer].join(" ")}>
        <div className={styles.JobTitleDiv}>
          <h1 className={styles.JobTitle}>{props.job.title}</h1>
          <img src={Ibutton} className={styles.IButton}/>
        </div>
        <p className={styles.JobDetails}>{props.job.type =='Full-time' ? 'Full Time' : 'Internship'} | {props.job.ctc} {props.job.type == 'Full-time' ? "LPA" : "KPM"} | {formatDate(props.job.deadline)}</p>
        <p className={styles.StudentsApplied}>Students Applied</p>
        <p className={styles.StudentsNumber}>{props.job.appliedStudentsCount || 0}</p>
        <img src={blueNextButton} style={{position:"absolute", right:17, bottom:33}}/>
      </div>
    </Link>
    <div style={{position:'absolute'}}>
    <Modal show={showHomeInfo} style={ {maxWidth: 840, background: "#FFFFFF", boxShadow: "0px 26px 24px -20px rgba(0, 0, 0, 0.25)", borderRadius: "14px",}} closeHandler={()=>{ToggleHomeInfo(false)}}>
      <HomeInfo job={props.job}/>
    </Modal>
    </div>
    {/* <button> */}
      <div onClick={()=>ToggleHomeInfo(true)} className={[styles.Container,styles.SingleContainer].join(" ")}>
        <span>Job Details</span>
        <img className={styles.BlueNextButton} src={blueNextButton}/>
      </div>
    {/* </button> */}
    <Link to={`jobs/${props.job.id}/hired`}>
      <div className={[styles.Container,styles.SingleContainer].join(" ")}>
        <span>Hired Students</span>
        <img className={styles.BlueNextButton} src={blueNextButton}/>
      </div>
    </Link>
  </div>)
}

const AddNewJobCard = ()=>{
  return(
    <Link className={[styles.Card, styles.NewCard].join(" ")} to="/new">

        <div className={styles.NewCardContent}>
          <div className={styles.Plus}>+</div>
          <p>Create New Job Posting</p>
        </div>
    </Link>

  )
}

const formatDate = (timestamp)=>{
  var t = new Date(1970, 0, 1);
  let dateTime = t.setSeconds(timestamp.seconds);
  return moment(dateTime).format('DD MMM\'YY');
}

export default Card;
