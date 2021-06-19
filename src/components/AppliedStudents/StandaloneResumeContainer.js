import React, { useContext, useEffect } from 'react';
import Resume from '../Resume/Resume';
import styles from './StandaloneResume.module.css';
import {Link} from 'react-router-dom';
import { StudentsContext, StudentsProvider } from './StudentsContext';
import logo from '../../assets/images/ensvee-logo.svg'
import backIcon from '../../assets/icons/back-black.svg'


const StandaloneResumeContainer = (props)=>{
    const context =  useContext(StudentsContext);
    let studentId = props.computedMatch.params.studentId;
    let jobId = props.computedMatch.params.jobId;

    useEffect(()=>{
        context.setSearch(studentId);
    },[studentId])

    let student = context.state.applicants.find(stud=> stud.email== studentId)
    return  (<ResumeContainer jobId={jobId}>
                <Resume student={student} updateFlag={(flag)=> context.updateFlag(student.id, flag)} updateStatus={(status)=>context.updateStatus(student.id, status)} />
            </ResumeContainer>)
        
}

const ResumeContainer = (props)=>(
    <div className={styles.Main}>
        <div className={styles.Header}>
            <Link to={`/jobs/${props.jobId}`}><img className={styles.Back} src={backIcon}/></Link>
            <Link to="/"><img className={styles.Logo} src={logo}/></Link>
        </div>
        <div className={styles.ResumeWrapper}>
            {props.children}
        </div>
</div>)



export default (props)=>(
    <StudentsProvider jobId={props.computedMatch.params.jobId}>
        <StandaloneResumeContainer {...props}/>
    </StudentsProvider>)