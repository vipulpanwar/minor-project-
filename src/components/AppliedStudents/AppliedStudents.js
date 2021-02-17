import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import StudentsHeader from './StudentsHeader';
import StudentList from './StudentList';

import Modal from '../shared/ui/Modal/Modal';
import Resume from '../Resume/Resume';
import {Route, withRouter} from 'react-router-dom';

class AppliedStudents extends Component{
    modalCloseHandler = ()=>{
        this.props.history.push("/jobs/" + this.props.computedMatch.params.jobId)
    }
    render(){
        return(<div>
                <StudentsHeader title="42 Students Applied" subTitle="Android Developer"/>
                <StudentList/>
                <Route path={`${this.props.path}/student/:studentId`}  >
                    <Modal closeHandler={this.modalCloseHandler}>
                        <Resume/>
                    </Modal>
                </Route>

            </div>);
    }
}

export default withRouter(AppliedStudents);