import React,{Component} from "react";
import Button from "../../components/shared/ui/Button/Button";
import {FloatingInput as Input} from '../../components/shared/ui/Input/Input';
import ErrorBox from './ErrorBox';

import { connect } from "react-redux";
import {Login as loginAction} from '../../store/actions/auth'
import { auth } from '../../firebase';
import {withRouter} from 'react-router-dom';

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
        },
        errorMsg: '',
        showError: false,
        isLoading: false,
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
            return <Input key={elName} style={{'marginBottom':10}} changed={(e)=> this.inputHandler(e, elName)} {...el} />
        });
    }
    
    onLoginHandler =(e)=>{
        e.preventDefault();
        this.setState({isLoading: true})
        this.login(this.state.form.email.value, this.state.form.password.value)
    }

    login = (email, password)=>{
        auth.signInWithEmailAndPassword(email, password)
            .then( user=>{
                this.setState({isLoading:false})                
            }
            )
            .catch(err=>{
                // dispatch(LoginFailed(err))
                let message = ''
                if(err.code=="auth/wrong-password"){
                    message = 'The email and password do not match'
                }
                else if(err.code=="auth/invalid-email"){
                    message = "Invalid Email"
                }
                else if(err.code=="auth/user-not-found"){
                    message = "User not found"
                }
                else{
                    message = err.message
                }
                this.setState({isLoading:false, showError: true, errorMsg: message})  
                console.log(err)              
            })
    }

    render()
    {
        return (
            <form>
                {this.state.showError && <ErrorBox error={this.state.errorMsg} />}
                {this.renderForm()}
                <Button primary style={{'marginTop': 25}} clicked={this.onLoginHandler} loading={this.state.isLoading}>
                    Login
                </Button>
            </form>
        )
    }
}

const mapStateToProps = (state)=>({
    user : state.auth.user,
})

const mapDispatchToProps = (dispatch) => ({
    login : (email,password)=> dispatch(loginAction(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)