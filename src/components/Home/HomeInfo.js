import React, { Component } from 'react';
import styles from './HomeInfo.module.css';
import ButtonImage from './images/buttonimage.svg'
import ThirdBox from './ThirdBox.js'
import moment from 'moment';

 class homeInfo extends Component{
formatDate = (timestamp)=>{
    var t = new Date(1970, 0, 1);
    let dateTime = t.setSeconds(timestamp.seconds);
    return moment(dateTime).format('DD MMM\'YY');
}

  render (){
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className = {styles.headerInner}>
                    <div className = {styles.titleBox}>
                        <h1 className = {styles.title}>{this.props.job.title}</h1>
                        <div className = {styles.desc}>{this.props.job.type} |  {this.props.job.ctc}  |  {this.formatDate(this.props.job.deadline)}</div>
                    </div>
                    <div className = {styles.appliedBox}>
                        <span style={{display:'inline-block', marginRight: '11px'}}>{this.props.job.appliedStudentsCount || 0} Students Applied </span><img style = {{display:'inline-block'}} src = {ButtonImage}></img>
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
                    <div className = {styles.catTitle}>Drive Location:</div>
                    <div className = {styles.cat}>{this.props.job.job_loc}</div>
                </div>
                <div className = {styles.catBox}>
                    <div className = {styles.catTitle}>Who Can Apply:</div>
                    <div className = {styles.cat}>{this.props.job.placed?"All":"Unplaced"}</div>
                </div>
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
        </div>
    )   
  }
}

export default homeInfo;
