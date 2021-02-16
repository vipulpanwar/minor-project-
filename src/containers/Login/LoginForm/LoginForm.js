import React,{Component} from "react";
import Button from "../../../components/UI/Button/Button";
import Input from '../../../components/UI/Input/Input';
import ErrorBox from '../../../components/Login/ErrorBox/ErrorBox';

import { connect } from "react-redux";
import {Login as loginAction} from '../../../store/actions/auth'

class LoginForm extends Component {
    state = {
        form:{
            "email": {
                inputType: "input",
                label:"Email",
                elementConfig: {
                  type: "email",
                  placeholder: "email",
                },
                value: "",
              },
            "password": {
                inputType: "input",
                label:"Password",
                elementConfig: {
                  type: "password",
                  placeholder: "password",
                },
                value: "",
              },
        }
    }

    inputHandler = (e, elName)=>{
        let newForm = {...this.state.form};
        newForm[elName] = {...this.state.form[elName]};
        newForm[elName].value = e.target.value;
        this.setState({...this.state, form:newForm})
    }

    renderForm = ()=>{
        return  Object.keys(this.state.form).map(elName=>{ 
            let el= this.state.form[elName];
            return <Input key={elName} changed={(e)=> this.inputHandler(e, elName)} {...el} />
        });
    }
    
    onLoginHandler =(e)=>{
        e.preventDefault();
        this.props.login(this.state.form.email.value, this.state.form.password.value)
    }

    render()
    {
        return (
            <form>
                <ErrorBox error={this.props.error?.message}/>
                {this.renderForm()}
                <Button primary style={{'marginTop': 25}} clicked={this.onLoginHandler} loading={this.props.isLoading}>
                    Login
                </Button>
            </form>
        )
    }
}

const mapStateToProps = (state)=>({
    user : state.auth.user,
    isLoading : state.auth.isLoginFormLoading, 
    error: state.auth.loginError,
})

const mapDispatchToProps = (dispatch) => ({
    login : (email,password)=> dispatch(loginAction(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)