import React,{Component} from "react";
import Button from "../../components/shared/ui/Button/Button";
import {FloatingInput as Input} from '../../components/shared/ui/Input/Input';
import ErrorBox from './ErrorBox';

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

    render()
    {
        return (
            <form>
                <ErrorBox error={this.props.error?.message}/>
                {this.renderForm()}
                <Button primary style={{'marginTop': 25}} clicked={()=>alert('Link')} loading={this.props.isLoading}>
                    Send Password Reset Link
                </Button>
            </form>
        )
    }
}

export default LoginForm