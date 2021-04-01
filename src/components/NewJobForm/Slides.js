import React from 'react';
import styles from './Slides.module.css';
import {Input, InputLabel} from '../shared/ui/Input/Input';
import SkillInput from '../AppliedStudents/FilterMultiTag';
import QualInput from './QualInput';

const inputStyles={
    'fontSize':14
}

export const Slide2Open = (props)=>{
    return (
        <div className={styles.Slide}>
            {Object.keys(props.inputs).map((key, i) =>{
                if(key !="Skills")
                return <Input inputHandler={(e)=>props.inputHandler(e,props.step, key)} key={key} label={`${i+1}. ${key}`} {...props.inputs[key]} style={inputStyles}/>
            })}
            <div style={inputStyles}>
                <InputLabel  {...props.inputs["Skills"]} label="Skills"/>
                <SkillInput style={{margin:0}} inputHandler={props.skillInputHandler}/>
            </div>
        </div>)
}

export const OneColSlide = (props)=>{
    return (
    <div className={styles.Slide}>
        {Object.keys(props.inputs).map((key, i) =><Input inputHandler={(e)=>props.inputHandler(e,props.step, key)} key={key} label={`${i+1}. ${key}`} {...props.inputs[key]} style={inputStyles}/>)}
    </div>)
}

export const TwoColSlide = (props)=>{
    return  (<div className={[styles.Slide,styles.TwoCol].join(" ")}>
        {Object.keys(props.inputs).map((key, i) =><Input inputHandler={(e)=>props.inputHandler(e,props.step, key)} key={key} label={`${i+1}. ${key}`} {...props.inputs[key]} style={inputStyles}/>)}
    </div>)
}

export const QualSlide = (props)=>{
    return  (<div className={styles.Slide}>
        <QualInput inviteHandler={props.inviteHandler} deleteHandler={props.deleteInviteHandler} label={`${9}. Qualifications`} {...props.inputs['Qualifications']}/>
        <div className={styles.Row}>
            {Object.keys(props.inputs).map((key, i) => {
                if(key !="Qualifications")
                return <Input inputHandler={(e)=>props.inputHandler(e,props.step, key)} key={key} label={`${key}`} style={inputStyles} {...props.inputs[key]}/>
            })}
        </div> 
    </div>)
}