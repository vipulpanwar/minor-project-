import React, { Component } from 'react'
import styles from './forgot.module.css'
import ForgotForm from './ForgotForm';
import logo from '../../assets/images/ensvee-logo.svg';
import ForgotImage from './images/forgotimage.svg'

export default class ForgotPassword extends Component {
    render() {
        return(
            <div className={styles.LoginGrid}>
                
                <div className={styles.LoginSide}>
                    <div>
                        <div style={{textAlign:'left'}}>
                            <h1 className={styles.H1}>Forgot Password</h1>
                            <p className={styles.DescriptionText}>A password reset link will be sent to your email ID, but first let’s find your account</p>
                            <p className={styles.label}>Email ID</p>
                            <ForgotForm></ForgotForm>
                        </div>
                    </div>
                </div>
                <div className={styles.IllustrationSide}>
                    <img src={ForgotImage} className={styles.LoginShapes}/>
                </div>
            </div>
        )
    }
}
