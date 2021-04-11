import React from 'react';
import styles from './Slides.module.css';
import {Input, InputLabel} from '../shared/ui/Input/Input';
import SkillInput from '../AppliedStudents/FilterMultiTag';
import NewSkillInput from '../shared/Skills/SkillInput';
import QualInput from './QualInput';
import skillIllus from '../../assets/illustrations/skill_illustration.svg'

const inputStyles={
    'fontSize':14,
}

const linkStyles ={
    fontSize: 14,
    minHeight: 'unset',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: 74,
}

export const Slide2Open = (props)=>{
    return (
        <div className={styles.Slide}>
            {Object.keys(props.inputs).map((key, i) =>{
                if(key !="Skills")
                return <Input inputHandler={(e)=>props.inputHandler(e,props.step, key)} key={key} label={`${i+1}. ${key}`} {...props.inputs[key]} style={inputStyles}/>
            })}
            <div style={inputStyles}>
                <InputLabel {...props.inputs["Skills"]} label="Skills"/>
                <SkillInput style={{margin:0}} inputHandler={props.skillInputHandler}/>
            </div>
        </div>)
}

export const Slide1 = (props)=>{
    let easyApplyInput = props.inputs['Easy Apply'];
    let {validation, ...linkInput} = props.inputs['Link'];
    return (
            <div className={styles.Slide}>
                <div className={[styles.TwoCol].join(" ")}>
                    <Input inputHandler={props.jobHandler}  label={`1. Job Type`} {...props.inputs['Job Type']} style={inputStyles}/>
                    {Object.keys(props.inputs).map((key, i) =>
                    {   if(key !="Easy Apply" &&  key !="Link" && key!="Job Type")
                        return <Input inputHandler={(e)=>props.inputHandler(e,props.step, key)} key={key} label={`${i+1}. ${key}`} {...props.inputs[key]} style={inputStyles}/>})}
                </div>
                <div style={{display:'grid','gridTemplateColumns': 'auto 1fr', gap:20, paddingRight:114}}>
                    {props.inputs['Job Type'].value=="Off Campus"?<Input label="9. Recive applications at" style={inputStyles} inputHandler={props.easyHandler} {...easyApplyInput}/>:null}
                    {easyApplyInput.value=="External Website"?<Input style={linkStyles} inputHandler={(e)=>props.inputHandler(e,props.step, "Link")} {...linkInput} />:null}
                </div>
            </div>
)}

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

export const SkillSlide = (props)=>{
    
    return (<div className={[styles.Slide,styles.SkillSlide].join(" ")}>
        <InputLabel label="Skills Required" {...props.inputs['Skills']}/>
        <p className={styles.SkillsDesc}>We use these skills to find potential candidates for the job</p>
        <NewSkillInput value={props.inputs['Skills'].value} inputHandler={(e)=>props.inputHandler(e, props.step, "Skills")}/>
        {props.inputs['Skills'].value.length===0?<img className={styles.SkillImage} src={skillIllus}/>:null}

    </div>)
}

export const QualSlide = (props)=>{
    return  (<div className={styles.Slide}>
        <QualInput inviteHandler={props.inviteHandler} deleteHandler={props.deleteInviteHandler} label={`${9}. Qualifications`} {...props.inputs['Qualifications']}/>
        <InputLabel style={{marginTop:20, marginBottom:0}} label="Minimum Percentage Required"/>
        <div className={styles.Row}>
            {Object.keys(props.inputs).map((key, i) => {
                if(key !="Qualifications")
                return <Input inputHandler={(e)=>props.inputHandler(e,props.step, key)} key={key} label={`${key}`} style={inputStyles} {...props.inputs[key]}/>
            })}
        </div> 
    </div>)
}