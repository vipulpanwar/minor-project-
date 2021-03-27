import React, {Component} from 'react';
import LoginForm from './LoginForm';
import logo from '../../assets/images/ensvee-logo.svg';
import shapes from '../../assets/shapes/login-shapes.svg';
import styles from '../Login/Login.module.css';
import { Link } from 'react-router-dom'

class signup extends Component{
    render(){
        return(
            <div className={styles.LoginGrid}>
                
                <div className={styles.LoginSide}>
                    <img src={logo} className={styles.Logo}/>
                    <h1 className={styles.H1}>Please Sign Up.</h1>
                    <LoginForm></LoginForm>
                    <div className={styles.linksContainer}>
                        <Link style={{ textDecoration: 'none' }} to='/forgorpassword'><p className={styles.linkText}>Forgot Password?</p></Link>
                        <Link style={{ textDecoration: 'none' }} to='/'><p style={{marginTop:'10px'}}className={styles.linkText}>Already a member? Login now</p></Link>
                    </div>
                </div>
                <div className={styles.IllustrationSide}>
                    <img src={shapes} className={styles.LoginShapes}/>
                </div>
            </div>
        );
    }
}


export default signup