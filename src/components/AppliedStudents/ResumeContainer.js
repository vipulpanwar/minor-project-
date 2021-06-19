import React, {useContext, useEffect, useState} from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import Resume from '../Resume/Resume';
import Modal from '../shared/ui/Modal/Modal';
import { StudentsContext }  from './StudentsContext.js';
import TopBar from '../Resume/TopBar';


const modalStyle = {
    maxWidth: 1100,
    margin:'150px 0',
    top:0,
    borderRadius:14,
    transform:"translateX(-50%)",
    position:'relative',
    background:'transparent'
}


 const ResumeContainer= (props)=>{
    const context = useContext(StudentsContext);
    const history = useHistory();
    const jobMatch = useRouteMatch(props.path);
    const resumeMatch = useRouteMatch(`${props.path}/student/:studentId`);
    const [prev, setPrev]= useState();
    const [next, setNext]= useState();
    const studentId =  resumeMatch?.params?.studentId;
    let students = context.state.applicants;
    let student = context.state.applicants.find(stud=> stud.email == studentId);
    if(!student && resumeMatch) history.push(jobMatch.url)

    const getPrevAndNextStudent = ()=>{
        let index = students.findIndex(stud=> studentId == stud.email);
        let prev, next;
        if(index == -1) return [];
        if( students[index - 1])
            prev = `${jobMatch.url}/student/${students[index - 1]?.email}`;
        
        if(!students[index + 1] && context.state.hasMore && !context.state.studentLoading)
        {
            console.log("Fetchin more", student[index + 1], context.state.hasMore)
            context.fetchBulk(undefined, true)
        }
        else if( students[index + 1])
            next = `${jobMatch.url}/student/${students[index + 1]?.email}`;
        
        return [prev, next]
    }



    useEffect(()=>{
        let [p, n] = getPrevAndNextStudent();
        setNext(n);
        setPrev(p);
    }, [context.state.applicants, studentId])

    if(!resumeMatch) return null;

    

    const modalCloseHandler = ()=>{
        history.push(jobMatch.url);
    }


    
    // let [ prev, next] = getPrevAndNextStudent();
    return (
            <Modal show={resumeMatch} style={modalStyle} closeHandler={modalCloseHandler}>
                <TopBar close={modalCloseHandler}/>
                <Resume 
                    student={student} 
                    updateFlag={(flag)=>context.updateFlag(student.id, flag)} 
                    updateStatus={(status)=>context.updateStatus(student.id, status)} 
                    close={modalCloseHandler}
                    prev={prev}
                    next={next}
                    />
            </Modal>
            );
}

export default ResumeContainer;