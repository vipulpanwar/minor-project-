import { Component } from "react";
import React from 'react';
import style from './CandidateTagger.module.css';
import Phone from './images/phone.svg'
import Email from './images/email.svg'

import './Resume.css';
import Button from '../shared/ui/Button/Button';
import { StudentsContext } from '../AppliedStudents/StudentsContext.js';
import { connect } from 'react-redux';
import { CreateToast } from '../../store/actions/alert';
import { withRouter } from "react-router";
import ReactToPrint from 'react-to-print';
import Download from './images/download.svg'
import ProfilePicture from "./ProfilePicture";

class Profile extends Component{
  state = {
    loading : null,
  }


  render(){
    let student = this.props.student;
    let degrees = Object.keys(this.props.student.edu);
    let degree = this.props.student.edu[degrees[0]];
    for (let degreeKey in this.props.student.edu){
      if(degree.year<=this.props.student.edu[degreeKey].year){
        degree = this.props.student.edu[degreeKey];
      }
    }

    let rejectstyle = {color: "#D0021B", borderColor:"#D0021B"};
    let status = this.props.student.status;
   
    
    return(
            <div className={`profile-container ${student.loading? 'Loading':""}`}>
              <div className="profilepic">
                  <ProfilePicture uid={student.uid}/>
              </div>
              <div className="applicant-info">
                <p className="applicant-name">{student.name}</p>
                
                <p className="applicant-details">{degree ? `${degree?.year} • ${degree?.field} • ${degree?.course}` :null} {(degree && student.city)? " • ":""} {student.city}</p>
                <p className="applicant-bio">
                  {student.about}
                </p>
                <div className="contact-container">
                  <div style={{fontSize:'14px', fontWeight:'300'}}>
                    Contact
                    <div style={{display:'flex', gap:"16px"}}>
                      <div className={style.numberdiv}>
                          <img src={Phone}/>
                          <div className={style.number}>
                              {this.props.student.phone}
                          </div>
                      </div>
                      <div className={style.numberdiv}>
                          <img src={Email}/>
                          <div className={style.number}>
                              {this.props.student.email}
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='hideOnPrint' style={{paddingTop:"20px"}}>
                  
                  {/* <div className="rating-box"><p className='rating-text'><span style={{color:"#898989"}}>Rating:</span> 4.5</p></div> */}
                  <div style={{display:"flex", float:"right", gap:'12px'}}>
                    {status=="Applied" 
                    ? 
                      <>
                        <Button width="129px" height="50px" loading={this.state.loading=="Hired"} clicked={()=>{this.props.updateStatus("Hired")}} primary={this.props.student.status=="Hired"}>Hire</Button>
                        <Button width="129px" height="50px" loading={this.state.loading=="Rejected"} clicked={()=>{this.props.updateStatus("Rejected")}} style={rejectstyle}>Reject</Button>
                      </>
                    :
                      <>
                        <div className={`status ${status}`}>{this.props.student.status}</div>
                      </>
                    }
                    <ReactToPrint
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return <a><Button style={{borderRadius:'100%', padding:'0',width:'58px', height:'58px', backgroundColor:'#dbe9f9', border:'#dbe9f9', display:'grid', placeItems:'center'}}><img height="25.5px" src={Download}></img></Button></a>;
                    }}
                    content={() => this.props.refer}
                    />
                  </div>
                </div>
              </div>
              
            </div>
    )
}
}

Profile.contextType = StudentsContext;

const mapDispatchToProps = (dispatch)=>({
  createToast: (toast)=>dispatch(CreateToast(toast))
})

export default (connect(null, mapDispatchToProps))(withRouter(Profile))
