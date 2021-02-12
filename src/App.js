import logo from './logo.svg';
import './App.css';
import {  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import HomeContainer  from "./containers/Home/home"; 
import LoginContainer  from "./containers/Login/Login";
import AppliedStudentsContainer from './containers/AppliedStudents/AppliedStudents'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginContainer}/>
        <Route path="/jobs/:jobId" component= {AppliedStudentsContainer}/>
        <Route matchPath={true} path="/" component={HomeContainer}/>
      </Switch>
    </Router>
  );
}

export default App;
