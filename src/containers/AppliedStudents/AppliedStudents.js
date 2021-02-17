import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import StudentsHeader from '../../components/AppliedStudents/StudentsHeader/StudentsHeader';

class Home extends Component{
    render(){
        return(<div>
                <StudentsHeader title="42 Students Applied" subTitle="Android Developer"/>
                <h1>Applied Students Page</h1>
                <Link to="/" > Home</Link>
            </div>);
    }
}

export default Home;