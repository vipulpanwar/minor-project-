import { Component } from "react";
import React from 'react';
import './Resume.css';
import Profileimg from './images/profileimg.svg';

export default  (props)=>{
  console.log(props.student)
  let student = props.student;
    return(
            <div>
              <div className="profilepic">
                <img className="profileimg" style={{marginLeft:'-8px'}} src={Profileimg} />
              </div>
              <div className="applicant-info">
                <p className="applicant-name">{student.name}</p>
                <p className="applicant-details">Electronics and Communication Technologies - Bachelors in Technologies (B.tech)  |  Visakhapatnam</p>
                <p className="applicant-bio">
                  {student.about}
                </p>
                {/* <div className="rating-box"><p className='rating-text'><span style={{color:"#898989"}}>Rating:</span> 4.5</p></div> */}
              </div>
            </div>
    )
}
