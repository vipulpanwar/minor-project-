import { Component } from "react";
import React from 'react';
import './Resume.css';
import userPlaceholder from '../../assets/images/user_placeholder.jpg';
import Button from '../shared/ui/Button/Button';

export default  (props)=>{
  console.log(props.student)
  let student = props.student;
  let degrees = Object.keys(props.student.edu);
  let degree = props.student.edu[degrees[0]];
  for (let degreeKey in props.student.edu){
    if(degree.year<=props.student.edu[degreeKey].year){
      degree = props.student.edu[degreeKey];
    }
  }

    return(
            <div className="profile-container">
              <div className="profilepic">
                <img className="profileimg" src={student.profilePicture || userPlaceholder} />
              </div>
              <div className="applicant-info">
                <p className="applicant-name">{student.name}</p>
                <p className="applicant-details">{degree.field} - {degree.course}  |  {student.city}</p>
                <p className="applicant-bio">
                  {student.about}
                </p>
                <div style={{paddingTop:"20px"}}>
                  <div className="rating-box"><p className='rating-text'><span style={{color:"#898989"}}>Rating:</span> 4.5</p></div>
                  <div style={{display:"inline-block", float:"right"}}>
                    <Button width="129px" height="50px" style={{marginRight:"12px", color: "#D0021B", borderColor:"#D0021B"}}>Reject</Button>
                    <Button width="129px" height="50px">Hire</Button>
                  </div>
                </div>
              </div>
            </div>
    )
}
