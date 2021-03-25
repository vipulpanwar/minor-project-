import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated =this.props.isAuthenticated;
        
        if(isAuthenticated=== undefined)
        return <h1>Loading authState...</h1>;

        return isAuthenticated ? (
            Component ?<Component {...this.props} /> : this.props.render(this.props)
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

const mapStateToProps  = (state)=>({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, null)(ProtectedRoute);