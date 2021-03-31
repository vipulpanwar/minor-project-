import React, { createRef, Fragment} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './home.css';
import BottomNav from './BottomNav';
import {ModalWithHeader} from '../shared/ui/Modal/Modal';
import NewJobForm from '../NewJobForm/NewJobForm';
import JobList from './JobList';
import Profile from '../Profile/Profile';

class Home extends React.Component{
  
  modalCloseHandler = ()=>{
    this.props.history.push("/")
  }
    render(){
        return(
        <div>
          <Switch>          
            <Route path="/profile" component={Profile}/>
            <Route path="" >
              <JobList />
              <Route exact path={`/new`}  >
                <ModalWithHeader title="Create New Job Posting" show={true} closeHandler={this.modalCloseHandler}>
                    <NewJobForm close={this.modalCloseHandler}/>
                </ModalWithHeader>
              </Route>
            </Route>
          </Switch>
        
          <BottomNav/>
        </div>);
    }
}


export default withRouter(Home);
