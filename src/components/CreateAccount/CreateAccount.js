import React, { Component } from 'react'
import Form from './Form'
import styles from './CreateAccount.module.css'
import {CreateAccountProvider} from './CreateAccountContext';

class CreateAccount extends Component {
    render() {
        return (
            <CreateAccountProvider>
                <div className = {styles.container}>   
                    <Form />
                </div>
            </CreateAccountProvider>
        )
    }
}

export default CreateAccount