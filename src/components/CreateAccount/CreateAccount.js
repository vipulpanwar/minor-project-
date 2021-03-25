import React, { Component } from 'react'
import StepOne from './StepOne.js';
import StepTwo from './StepTwo.js';
import styles from './CreateAccount.module.css'

class CreateAccount extends Component {
    state = {
        stepOne: false,
    }
    render() {
        return (
            <div className = {styles.container}>   
                {this.state.stepOne? <StepOne />: <StepTwo />}
            </div>
        )
    }
}

export default CreateAccount