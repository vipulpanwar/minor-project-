import React, { Component } from 'react'
import Form from './Form'
import styles from './CreateAccount.module.css'
import {CreateAccountProvider} from './CreateAccountContext';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

class CreateAccount extends Component {
    render() {

        const profile = this.props.profile;

        if(profile)
            return <Redirect to={{ pathname: '/' }} />


        return (
            <CreateAccountProvider>
                <div className = {styles.container}>   
                    <Form />
                </div>
            </CreateAccountProvider>
        )
    }
}


const mapStateToProps  = (state)=>({
    user: state.auth.user,
    profile: state.auth.profile,
    isAuthenticated: state.auth.isAuthenticated,
})




export default connect(mapStateToProps,null)(CreateAccount);