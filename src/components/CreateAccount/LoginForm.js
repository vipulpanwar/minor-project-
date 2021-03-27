import React,{Component} from "react";
import Button from "../../components/shared/ui/Button/Button";
import {FloatingInput as Input} from '../../components/shared/ui/Input/Input';
import ErrorBox from './ErrorBox';
import firebase from '../../firebase'

import { connect } from "react-redux";
import {Login as loginAction} from '../../store/actions/auth'
import { Route, Redirect } from "react-router";

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

            "confirm password": {
                inputType: "input",
                label: "Confirm Password",
                elementConfig: {
                    type: "password",
                    placeholder: "confirm password"
                },
                value: "",
            },
        },

        signedUp: false,
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
    
    signup =(e)=>{
        e.preventDefault();
        if(this.state.form["password"].value==this.state.form["confirm password"].value){
            let email = this.state.form["email"].value;
            let password = this.state.form["password"].value;
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("created");
                console.log(userCredential)
                this.setState({signedUp:true})
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });
        }
        else{
            alert("please enter same passwords");
        }
    }

    render()
    {
        if(this.state.signedUp){
            return <Redirect to='/createaccount' />
        }
        return (
            <form>
                <ErrorBox error={this.props.error?.message}/>
                {this.renderForm()}
                <Button primary style={{'marginTop': 25}} clicked={this.signup} loading={this.props.isLoading}>
                    Sign Up
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