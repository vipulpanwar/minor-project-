import React,{Component} from "react";
import Button from "../../components/shared/ui/Button/Button";
import {FloatingInput as Input} from '../../components/shared/ui/Input/Input';
import ErrorBox from './ErrorBox';
import { auth } from '../../firebase'
import SuccessModal from '../shared/ui/Modal/SuccessModal'

import { connect } from "react-redux";
import {Login as loginAction} from '../../store/actions/auth';

class LoginForm extends Component {
    state = {
        form:{
            "email": {
                inputType: "input",
                label:"Email ID",
                elementConfig: {
                  type: "email",
                  placeholder: "email",
                },
                value: "",
              },
        },
        isLoading: false,
        errorMsg: '',
        showError: false,
        showModal: false,
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

    forgotHandler = (e)=>{
        e.preventDefault();
        this.setState({isLoading:true})
        auth.sendPasswordResetEmail(this.state.form["email"].value).then(()=>{
            this.setState({isLoading: false, showModal:true})
          }).catch((err)=>{
                let message = ''
                if(err.code=="auth/wrong-password"){
                    message = 'The email and password do not match'
                }
                else if(err.code=="auth/invalid-email"){
                    message = "Please enter a valid email address"
                }
                else if(err.code=="auth/user-not-found"){
                    message = "No data of a user associated with this email exists"
                }
                else{
                    message = err.message
                }
                this.setState({isLoading:false, errorMsg: message, showError: true})
          });
    }

    render()
    {
        return (
            <form>
                {this.state.showError && <ErrorBox error={this.state.errorMsg} />}
                {this.renderForm()}
                {this.state.showModal && <SuccessModal title="Password reset link sent" show subtitle="Please reset your password and login again" link="/" buttonText="Go to Login Page"/>}
                <Button primary style={{'marginTop': 25}} clicked={this.forgotHandler} loading={this.state.isLoading}>
                    Send Password Reset Link
                </Button>
            </form>
        )
    }
}

export default LoginForm