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
import Profile from './components/Profile/Profile.js';
import HomeContainer  from "./components/Home/home"; 
import LoginContainer  from "./components/Login/Login";
import Signup from "./components/CreateAccount/Signup";
import AppliedStudentsContainer from './components/AppliedStudents/AppliedStudents';
import ProtectedRoute from './components/shared/ProtectedRoute/ProtectedRoute';
import AppLoading from './components/shared/AppLoader/AppLoader';
import CreateAccount from './components/CreateAccount/CreateAccount';
import ForgotPassword from './components/Login/ForgotPassword';
import Alerts from './components/Alerts/Alerts'

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
          <Route path="/signup" component={Signup} />
          <Route path="/createaccount" component={CreateAccount} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <ProtectedRoute path="/jobs/:jobId/hired" render= {(props)=><AppliedStudentsContainer hired {...props}/>}/>
          <ProtectedRoute path="/jobs/:jobId" component= {AppliedStudentsContainer}/>
          <ProtectedRoute path="/profile" component= {Profile}/>
          <ProtectedRoute matchPath={true} path="/" component={HomeContainer}/>
        </Switch>
      </Router>
      <Alerts/>
    </AppLoading>
    
  );
}

const mapDispatchToProps = (dispatch)=>({
  authStateChange: (user)=> dispatch(AuthStateChanged(user))
})
export default connect( null , mapDispatchToProps)(App);
