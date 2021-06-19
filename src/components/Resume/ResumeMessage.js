import React from 'react';

const ResumeMessage = (props)=>{
    if(props.message)
        return <div className={`status-message ${props.type}`}>{props.message}</div>
    
    return null;
}

export default ResumeMessage;