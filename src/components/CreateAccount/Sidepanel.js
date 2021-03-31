import React, { Component } from 'react'
import styles from './StepOne.module.css'
import Logo from '../../assets/images/ensvee-logo.svg'
import CurrentStep from './images/currentstep.svg'
import IncompleteStep from './images/incompletestep.svg'
import Image from './images/createaccountimg.svg'
import CompletedStep from './images/completedstep.svg'

export default class Sidepanel extends Component {
    render() {
        return (
            <div className={styles.leftcontainer}>
                <div className={styles.uppercontainer}>
                    <img src={Logo} width="119px"/>
                    <div className={styles.CreateAccount}>Create Account</div>
                    <div className={styles.stepsContainer}>
                        {   this.props.stepOne && <span>
                                <img width="22px" src={CurrentStep} />
                                <p className={styles.currentstep}>Step 1</p>
                                <br />
                                <img width="22px" src={IncompleteStep} style={{paddingTop:'17px'}}/>
                                <p className={styles.incompletestep}>Step 2</p>
                            </span>
                        }
                        {   !this.props.stepOne && <span>
                                <img width="22px" src={CompletedStep} />
                                <p className={styles.completedstep}>Step 1</p>
                                <br />
                                <img width="22px" src={CurrentStep} style={{paddingTop:'17px'}}/>
                                <p style={{paddingTop: '16px'}} className={styles.currentstep}>Step 2</p>
                            </span>
                        }
                    </div>
                </div>
                    <img className={styles.bottomImage} src={Image}/>
                {/* <div className={styles.bottomImagecontainer}>
                </div> */}
            </div>
        )
    }
}
