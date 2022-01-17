import logo from './logo.svg';
import './App.css';
import {  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import firebase from './firebase';
import {connect} from 'react-redux';
import {AuthStateChanged} from './store/actions/auth';
import HomeContainer  from "./components/Home/home"; 
import LoginContainer  from "./components/Login/Login";
import Signup from "./components/CreateAccount/Signup";
import AppliedStudentsContainer from './components/AppliedStudents/AppliedStudents';
import StandaloneResumeContainer from './components/AppliedStudents/StandaloneResumeContainer';
import ProtectedRoute from './components/shared/ProtectedRoute/ProtectedRoute';
import AppLoading from './components/shared/AppLoader/AppLoader';
import CreateAccount from './components/CreateAccount/CreateAccount';
import ForgotPassword from './components/Login/ForgotPassword';
import Alerts from './components/Alerts/Alerts';
import Toasts from './components/Alerts/Toasts'
import Modal from './components/shared/ui/Modal/SuccessModal2';
import StudentNavLayout from './components/StudentNavigatorLayout/Layout';
import StudentNavHome from './components/StudentNav-Home/Home';
import StudentNavInvites from './components/StudentNav-Invites/InvitesSent';


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
          <Route path="/forgotpassword" component={ForgotPassword} />
          <ProtectedRoute path="/createaccount" component={CreateAccount} ignoreVerification  />
          <ProtectedRoute path="/jobs/:jobId/hired" render= {(props)=><AppliedStudentsContainer hired {...props}/>}/>
          <ProtectedRoute path="/jobs/:jobId/v2/resume/:studentId" component= {StandaloneResumeContainer}/>
          <ProtectedRoute path="/jobs/:jobId" component= {AppliedStudentsContainer}/>


          {/* Student Navigator Routes */}
          <Route path="/studentnav">
            <StudentNavLayout>
              <Switch>
                <Route path={"/studentnav/home"} component={StudentNavHome}/>
                <Route path={"/studentnav/invites"} component={StudentNavInvites}/>
              </Switch>
            </StudentNavLayout>
          </Route>
          <ProtectedRoute matchPath={true} path="/" component={HomeContainer}/>
        </Switch>
      </Router>
      <Alerts/>
      <Toasts/>
    </AppLoading>
    
  );
}

const mapDispatchToProps = (dispatch)=>({
  authStateChange: (user)=> dispatch(AuthStateChanged(user))
})
export default connect( null , mapDispatchToProps)(App);
