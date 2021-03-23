import React, { Component } from 'react'
import leftimg from './images/leftimgForm1.svg'
import styles from './StepOne.module.css'
import TextInput from './TextInput'
import logoinput from './images/inputlogo.svg'

class StepOne extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.leftcontainer}>
                    <img className = {styles.leftimage} src={leftimg} />
                </div>
                <div className={styles.rightcontainer}>
                    <p className={styles.tellus}>Tell Us About Your Company</p>
                    <br />
                    <div className={styles.companylogodiv}>
                        <label>
                            <img className = {styles.leftimage} src={logoinput} />
                            <input className={styles.hide} id="CompanyLogo" type="file"></input>
                        </label>
                    </div>
                    <form>
                        <TextInput label="Company Name"/>
                        <TextInput label="Industry Type"/>
                        <TextInput label="Company Website"/>
                        <TextInput label="Company Address"/>
                        <button type = "submit" className={styles.submitButton}>Next</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default StepOne
