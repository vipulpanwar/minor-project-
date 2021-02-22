import { Component } from "react";
import React from 'react';
import './Resume.css';
import Profileimg from './images/profileimg.svg';

export default  (props)=>{
  console.log(props.student)
  let student = props.student;
  let degree = props.student.degree;

    return(
            <div>
              <div className="profilepic">
                <img className="profileimg" src={student.profilePicture} />
              </div>
              <div className="applicant-info">
                <p className="applicant-name">{student.name}</p>
                <p className="applicant-details">{student[degree].branch} - {student[degree].course}  |  {student.address}</p>
                <p className="applicant-bio">
                  {student.about}
                </p>
                {/* <div className="rating-box"><p className='rating-text'><span style={{color:"#898989"}}>Rating:</span> 4.5</p></div> */}
              </div>
            </div>
    )
}
