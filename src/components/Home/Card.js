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
    <div className={styles.CardContainer}>
      {props.job.newCount?
      <div className={styles.NewApplicants}>
        {props.job.newCount} New Applicants
      </div>
      :null}
      <div className={styles.Card} style={style}>
        <Link to={`jobs/${props.job.id}`}>
          <div className={[styles.Container, styles.CardContentContainer].join(" ")}>
            <div>
              <div className={styles.JobTitleDiv}>
                <h1 className={styles.JobTitle}>{props.job.title}</h1>
                <img src={Ibutton} className={styles.IButton} />
              </div>
              <p className={styles.JobDetails}>{props.job.type} | {props.job.ctc} | {formatDate(props.job.deadline)}</p>
            </div>
            <p className={styles.StudentsApplied}><span className={styles.StudentsNumber}>{props.job.count || 0}</span> Applicants</p>
            
            <img src={blueNextButton} style={{ position: "absolute", right: 17, bottom: 2}} />
          </div>
        </Link>
        <div style={{ position: 'absolute' }}>
          <Modal show={showHomeInfo} style={{ maxWidth: 840, background: "#FFFFFF", boxShadow: "0px 26px 24px -20px rgba(0, 0, 0, 0.25)", borderRadius: "14px", }} closeHandler={() => { ToggleHomeInfo(false) }}>
            <HomeInfo job={props.job} />
          </Modal>
        </div>
        {/* <button> */}
        <div onClick={() => ToggleHomeInfo(true)} className={[styles.Container, styles.SingleContainer].join(" ")}>
          <span>Job Details</span>
          <img className={styles.BlueNextButton} src={blueNextButton} />
        </div>
        {/* </button> */}
        <Link to={`jobs/${props.job.id}/hired`}>
          <div className={[styles.Container, styles.SingleContainer].join(" ")}>
            <span>Hired Students</span>
            <img className={styles.BlueNextButton} src={blueNextButton} />
          </div>
        </Link>
      </div>
    </div>
    )
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
