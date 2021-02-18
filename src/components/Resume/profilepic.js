import { Component } from "react";
import React from 'react';
import './Resume.css';
import Profileimg from './images/profileimg.svg';

export default  ()=>{
    return(
            <div>
              <div className="profilepic">
                <img className="profileimg" style={{marginLeft:'-8px'}} src={Profileimg} />
              </div>
              <p className="applicant-name">Anuj Talwar</p>
              <p className="applicant-details">Electronics and Communication Technologies - Bachelors in Technologies (B.tech)  |  Visakhapatnam</p>
              <p className="applicant-bio">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type s
              </p>
              <div className="rating-box"><p className='rating-text'><span style={{color:"#898989"}}>Rating:</span> 4.5</p></div>
            </div>
    )
}
