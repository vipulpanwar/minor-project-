import React, {Component} from 'react';
import LoginForm from './LoginForm/LoginForm';

class Login extends Component{
    render(){
        return(
            <div>
                <h1>Login Page</h1>
                <LoginForm></LoginForm>
            </div>
        );
    }
}

export default Login;