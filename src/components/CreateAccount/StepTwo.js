import React, { Component } from 'react'
import leftimg from './images/leftimgForm2.svg'
import styles from './StepOne.module.css'
import TextInput from './TextInput'
import logoinput from './images/inputlogo.svg'

class StepTwo extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.leftcontainer}>
                    <img className = {styles.leftimage} src={leftimg} />
                </div>
                <div className={styles.rightcontainer}>
                    <p className={styles.tellus}>Tell Us About Your Company</p>
                    <br /><br/>
                    <form>
                        <div className={styles.leftForm}>
                            <TextInput display="inlineBlock" width='147px' label="Founded In"/>
                            <TextInput display="inlineBlock" width='147px' label="Industry Type"/>
                            <TextInput display="inlineBlock" width='315px' label="Contact Number"/>
                            <TextInput padding='7px' display="inlineBlock" width='315px' label="Social Media Link"/>
                            <p className = {styles.addmore}>+Add More Social Media Links</p>
                        </div>
                        <div className={styles.leftForm}>
                            <TextInput display="inlineBlock" width='315px' label="Company Email ID"/>
                            <TextInput textarea width='315px' height="131px" label="About" />
                        </div>

                        <button type = "submit" className={styles.createButton}>Create Account</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default StepTwo
