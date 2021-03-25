import React, { Component } from 'react'
import StepOne from './StepOne.js';
import StepTwo from './StepTwo.js';
import { CreateAccountContext } from './CreateAccountContext'

class Form extends Component {
    render() {
        return (
                <div>   
                    {this.context.state.stepOne? <StepOne />: <StepTwo />}
                </div>
        )
    }
}

Form.contextType = CreateAccountContext;

export default Form