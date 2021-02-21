import { Component } from "react";
import React from 'react';
import './Resume.css';
import Profileimg from './images/profileimg.svg';

export default  ()=>{
    return(
            <div>
              <div className="profilepic">
                <img className="profileimg" src="https://s3-alpha-sig.figma.com/img/38b0/691a/88e72745dd03c930a56f612b8cc63cac?Expires=1614556800&Signature=fz6fFJVuLWcnM2Ll7hbHPYI7ZW1GvKv59NKNGe03o3174kldB9PIRM~zHIqqZ5Cjxz0S57wbisbH7vNB9pcjM5f27hSSZxjLmPqaXYD7USArXABk~9t7WAz2gOKGaq7oFdvH3wUeDCnkaS-AqeZLwPPIGRx5FT0tBZkYYuFRaP3qXb1jv1fmnhH9yFoqRQ32~pyqWWei9S7jTT3dXJoSd4G3zcY51bTQXgh2CBr7W5tyhpth4vDkqshzC3srVEAKlGhlbWFBF70MliYJIFaz3YFZmRR1vLvIrK8gxUs1J-xqGPeCqx1O3zfRCQmXvr8F7oOTRuPv-q~Fof-JkNhLWA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
              </div>
              <div className="applicant-info">
                <p className="applicant-name">Anuj Talwar</p>
                <p className="applicant-details">Electronics and Communication Technologies - Bachelors in Technologies (B.tech)  |  Visakhapatnam</p>
                <p className="applicant-bio">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type s
                </p>
                <div className="rating-box"><p className='rating-text'><span style={{color:"#898989"}}>Rating:</span> 4.5</p></div>
              </div>
            </div>
    )
}
