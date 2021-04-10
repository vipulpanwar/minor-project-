import React, {useState} from 'react';
import {useHistory, Link } from "react-router-dom";
import BgImage from './background-1.svg';
import './home.css';
import HomeInfo from './HomeInfo.js';
import Modal from '../shared/ui/Modal/Modal';
import styles from './Card.module.css';
import Ibutton from '../../assets/icons/ibutton.svg';
import CardSkeletonLoader from './CardSkeletonLoader';
import blueNextButton from '../../assets/icons/next-button.svg';
import moment from 'moment';
import { CSSTransition } from "react-transition-group";
import InviteCollgeForm from './InviteCollege';

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

  const [showHomeInfo, ToggleHomeInfo] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  let job = props.job;
  let history = useHistory();
  const goto = (url, disabled)=>{
    if(!disabled)
      history.push(url)  
 
  }

  let hiredDisabled = true, appliedDisabled =true;
  if(!job.countLoading && job.count)
    appliedDisabled = false;
  if(!job.countLoading && job.hiredCount)
    hiredDisabled = false;
  
  return(
    <div className={styles.CardContainer}>
      <div style={{ position: 'absolute' }}>
          <Modal show={showHomeInfo} style={{ maxHeight:'90vh',overflow:'auto',maxWidth: 840, background: "#FFFFFF", boxShadow: "0px 26px 24px -20px rgba(0, 0, 0, 0.25)", borderRadius: "14px", }} closeHandler={() => { ToggleHomeInfo(false) }}>
            {/* <HomeInfo qualifications={formatQual(props.job.edu)  deleteJob={()=>{ props.deleteJob(); ToggleHomeInfo(false)}} job={props.job} /> */}
            { showInviteModal 
            ? <InviteCollgeForm goBack={()=>setShowInviteModal(false)} close={()=>{ ToggleHomeInfo(false); setShowInviteModal(false)}} job={props.job} qualifications={formatQual(props.job.edu)}/>
            : <HomeInfo qualifications={formatQual(props.job.edu)} sendInvites={()=>setShowInviteModal(true)}  deleteJob={()=>{ props.deleteJob(); ToggleHomeInfo(false)}} job={props.job} />}
          </Modal>
      </div>
      <CSSTransition appear unmountOnExit in={Boolean(props.job.newCount)} timeout={500} 
      classNames={{enter: styles.NewApplicantsAppear, enterActive: styles.NewApplicantsAppearActive}}>
        <div className={styles.NewApplicants}>
          {props.job.newCount} New Applicants
        </div>
      </CSSTransition>
      <div className={styles.Card} style={style}>
        <div onClick={()=>goto(`jobs/${props.job.id}`, appliedDisabled)} className={[styles.Container, styles.CardContentContainer, appliedDisabled?styles.Disabled:styles.Active].join(" ")}>
          <div>
            <div className={styles.JobTitleDiv}>
              <h1 className={styles.JobTitle}>{props.job.title}</h1>
              {/* <img src={Ibutton} className={styles.IButton} /> */}
            </div>
            <p className={styles.JobDetails}>{props.job.type} | {props.job.ctc} | {formatDate(props.job.deadline)}</p>
          </div>
          <p className={[styles.StudentsApplied, props.job.countLoading?styles.Loading:null].join(" ")}><span className={styles.StudentsNumber}>{props.job.count || 0}</span> Applicants</p>
          
          <img src={blueNextButton} style={{ position: "absolute", right: 17, bottom: 20}} />
        </div>
        <div onClick={() => ToggleHomeInfo(true)} className={[styles.Container, styles.SingleContainer, styles.Active].join(" ")}>
          <span>Job Details</span>
          <img className={styles.BlueNextButton} src={blueNextButton} />
        </div>
        <div onClick={()=>goto(`jobs/${props.job.id}/hired`, hiredDisabled)} className={[styles.Container, styles.SingleContainer,  hiredDisabled?styles.Disabled:styles.Active].join(" ")}>
          <span>Hired Students</span>
          <img className={styles.BlueNextButton} src={blueNextButton} />
        </div>
      </div>
    </div>
    )
}

const AddNewJobCard = ()=>{
  return(
    <div className={styles.CardContainer}>
      <Link className={[styles.Card, styles.NewCard].join(" ")} to="/new">
          <div className={styles.NewCardContent}>
            <div className={styles.Plus}>+</div>
            <p>Create A New Job Posting</p>
          </div>
      </Link>
    </div>

  )
}

const formatDate = (timestamp)=>{
  var t = new Date(1970, 0, 1);
  let dateTime = t.setSeconds(timestamp.seconds);
  return moment(dateTime).format('DD MMM\'YY');
}

const formatQual = (edu)=>{
  let formatedEdu = [];
  if(!edu) return null;
 Object.keys(edu).forEach(qual=>{
      let [college,degree,course,branch,year] = qual.split('#');
      let index = formatedEdu.findIndex(fQual=> fQual.course == course && fQual.degree == degree && fQual.college == college);
      if(index>-1)
      {
          if(formatedEdu[index].branch.includes(branch)==false)
              formatedEdu[index].branch.push(branch);
          if(formatedEdu[index].year.includes(year)==false)
              formatedEdu[index].year.push(year);
      }
      else
          formatedEdu.push({college, degree, course, branch:[branch], year:[year]})
  });
  return formatedEdu
}

export default Card;
