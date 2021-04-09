import React, { Component } from 'react';
import styles from './HomeInfo.module.css';
import ButtonImage from './images/buttonimage.svg'
import ThirdBox from './ThirdBox.js'
import moment from 'moment';
import { Link } from 'react-router-dom';
import ConfirmationModal  from '../shared/ui/Modal/deletionmodal';
import Button from '../shared/ui/Button/Button';

class homeInfo extends Component{
    formatDate = (timestamp)=>{
        var t = new Date(1970, 0, 1);
        let dateTime = t.setSeconds(timestamp.seconds);
        return moment(dateTime).format('DD MMM\'YY');
    }

    state={
        showConfirmation:false,
    }
    render (){
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className = {styles.headerInner}>
                    <div className = {styles.titleBox}>
                        <h1 className = {styles.title}>{this.props.job?.title}</h1>
                        <div className = {styles.desc}>{this.props.job?.type} |  {this.props.job?.ctc}  |  {this.formatDate(this.props.job?.deadline)}</div>
                    </div>
                    <div className = {styles.buttonsContainer}>
                        <button onClick={this.props.deleteJob} className = {styles.deletejobBox}>
                        Delete Job
                        </button>
                        <div className = {styles.appliedBox}>
                            <Link to={`jobs/${this.props.job.id}`}>
                                <span style={{display:'inline-block', marginRight: '11px'}}>{this.props.job?.count || 0} Students Applied </span><img style = {{display:'inline-block'}} src = {ButtonImage}></img>
                            </Link>
                        </div>
                    </div>     
                </div>
            </div>
            <div className = {styles.secondaryBox}>
            <div className = {styles.categoryBox}>
                <div className = {styles.catBox}>
                    <div className = {styles.catTitle}>Job Category:</div>
                    <div className = {styles.cat}>{this.props.job.category}</div>
                </div>
                <div className = {styles.catBox}>
                    <div className = {styles.catTitle}>Job Location:</div>
                    <div className = {styles.cat}>{this.props.job.drive_loc}</div>
                </div>
                <div className = {styles.catBox}>
                    <div className = {styles.catTitle}>Interview Location:</div>
                    <div className = {styles.cat}>{this.props.job.job_loc}</div>
                </div>
                {/* <div className = {styles.catBox}>
                    <div className = {styles.catTitle}>Who Can Apply:</div>
                    <div className = {styles.cat}>{this.props.job.placed?"All":"Unplaced"}</div>
                </div> */}
            </div>
        </div>
        <ThirdBox job={this.props.job}/>
        <div style = {{paddingLeft:"18px", paddingTop:"18px"}}>
            <div className = {styles.catTitle}>
                Schedule:
            </div>
            <div className = {styles.descpara}>
            {/* 11:00 AM - Apptitude    |    12:00 PM - GD    |    5:00 PM - PI */}
            {this.props.job.schedule}
            </div>
        </div>
        {this.props.job.edu?
        <div className={styles.Qualifications}>
            <div className = {styles.catTitle}>
                Qualifications:
            </div>
            {this.props.qualifications.map((qual,i)=> <Qualification {...qual} key={i} />)}
            <Button clicked={this.props.sendInvites} style={{fontSize:14, padding:'9px 19px', width:'unset'}}>
                Send Invites To More Colleges
            </Button>
        </div>:null}
        </div>
    )   
  }
}


const Qualification= ({college, degree, course, branch, year})=>{

    let Branches = branch.reduce((str, curBranch)=> str + curBranch + ', ', '');
    let Years = year.reduce((str, curYear)=> str + curYear + ', ', '');
    Years=Years.slice(0, Years.length -2)
    Branches=Branches.slice(0, Branches.length -2)


    return(
        <div className={styles.Qual}>
            <div className={styles.College}>
                {college}
            </div>
            <div className={styles.CourseList}>
                {Years} Year | {degree} | {course} | {Branches}
            </div>
        </div>)
}

export default homeInfo;
