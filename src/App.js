import logo from './logo.svg';
import './App.css';
import {  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import firebase from './firebase';
import {connect} from 'react-redux';
import {AuthStateChanged} from './store/actions/auth';

import HomeContainer  from "./components/Home/home"; 
import LoginContainer  from "./components/Login/Login";
import AppliedStudentsContainer from './components/AppliedStudents/AppliedStudents';
import ProtectedRoute from './components/shared/ProtectedRoute/ProtectedRoute';
import AppLoading from './components/shared/AppLoader/AppLoader';

function App(props) {

  firebase.auth().onAuthStateChanged(user=>
    {
      props.authStateChange(user);
      console.log('Auth State Changed');
    });
  console.log("Rendering App")
  return (
    <AppLoading>
      <Router>
        <Switch>
          <Route path="/login" component={LoginContainer}/>
          <ProtectedRoute path="/jobs/:jobId" component= {AppliedStudentsContainer}/>
          <ProtectedRoute matchPath={true} path="/" component={HomeContainer}/>
        </Switch>
      </Router>
    </AppLoading>
  );
}

const mapDispatchToProps = (dispatch)=>({
  authStateChange: (user)=> dispatch(AuthStateChanged(user))
})
export default connect( null , mapDispatchToProps)(App);
