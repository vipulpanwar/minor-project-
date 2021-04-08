import React from 'react'
import styles from './HomeInfo.module.css';
import tbr from './image.svg';
import MinimumQualifications from './MinimumQualifications'

function ThirdBox(props) {
    return (
        <div>
            <div className = {styles.thirdBox}>
                <MinimumQualifications job={props.job}/>
                <div style = {{verticalAlign: "top"}}>
                    <div className = {styles.jobdesc}>
                        <div className = {styles.catTitle}>
                            Job Description:
                        </div>
                        {props.job.desc}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThirdBox
