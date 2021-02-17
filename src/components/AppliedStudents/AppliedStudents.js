import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import StudentsHeader from './StudentsHeader';
import StudentList from './StudentList';

class Home extends Component{
    render(){
        return(<div>
                <StudentsHeader title="42 Students Applied" subTitle="Android Developer"/>
                <StudentList/>
            </div>);
    }
}

export default Home;