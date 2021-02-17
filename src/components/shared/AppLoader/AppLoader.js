import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import logo from '../../../assets/images/ensvee-logo.svg'

import styles from './AppLoader.module.css';

class AppLoader extends React.Component {

    render() {
        const isAuthenticated =this.props.isAuthenticated;
        
        if(isAuthenticated=== undefined)
        return  (
            <div className={styles.LoadingLogo}>
                <img src={logo}/>
                {/* <p>Starting up...</p> */}
            </div>);

        return this.props.children;
    }
}

const mapStateToProps  = (state)=>({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, null)(AppLoader);