import React, {Component} from 'react';
import LoginForm from './LoginForm';
import logo from '../../assets/images/ensvee-logo.svg';
import shapes from '../../assets/shapes/login-shapes.svg';
import styles from '../Login/Login.module.css';


class signup extends Component{
    render(){
        return(
            <div className={styles.LoginGrid}>
                
                <div className={styles.LoginSide}>
                    <img src={logo} className={styles.Logo}/>
                    <h1 className={styles.H1}>Please Sign Up.</h1>
                    <LoginForm></LoginForm>
                </div>
                <div className={styles.IllustrationSide}>
                    <img src={shapes} className={styles.LoginShapes}/>
                </div>
            </div>
        );
    }
}


export default signup