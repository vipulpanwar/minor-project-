import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {Logout as logoutAction} from '../../store/actions/auth';

class Home extends Component{
    render(){
        return(<div>
            <h1>Home Page</h1>
            <Link to="/jobs/something" >Applied students page</Link>
            <button onClick={this.props.logout}>
                Logout
                </button>
        </div>);
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout : (email,password)=> dispatch(logoutAction())
})


export default connect(null, mapDispatchToProps) (Home);