import React from 'react'
import styles from './HomeInfo.module.css';
import tbr from './image.svg';
import MinimumQualifications from './MinimumQualifications'

function ThirdBox() {
    return (
        <div>
            <div className = {styles.thirdBox}>
                <img style = {{display:"inline-block"}} src={tbr}></img>
                {/* <MinimumQualifications /> */}
                <div style = {{width:"50%", display: "inline-block", verticalAlign: "top"}}>
                    <div className = {styles.jobdesc}>
                        <div className = {styles.catTitle}>
                            Job Description:
                        </div>
                        <p className = {styles.descpara}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            <p  className = {styles.list}>
                                <br/>
                                <li>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                </li>
                                <br />
                                <li>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                </li>
                            </p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThirdBox
