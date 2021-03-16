import React from 'react';
import Button from '../shared/ui/Button/Button';
import {Input} from '../shared/ui/Input/Input';
import QaulInput from './QualInput';
import styles from './NewJobForm.module.css';
import QualInput from './QualInput';


export default class NewJobForm extends React.Component{
    state = {
        form : {
            step:2,
            1:{
                "Job Type":{ 
                    value:"", 
                    elementConfig:{
                        name:"position", 
                        options:["On Campus", "Off Campus"]
                    },
                    elementType:"radio"
                },
                "Job Position":{value:"", elementType:"input"},
                "Job Location": {value:"", elementType:"input"},
                "Placement Drive Location":{value:"", elementType:"input"},
                "Employment Type":{ 
                    value:"", 
                    elementConfig:{
                        name:"employment Type", 
                        options:["Full Time", "Internship", 'Freelance']
                    },
                    elementType:"radio"
                },
                "CTC": {value:"", elementType:'input'},
                "Job Category":{value:"",elementType:'input'},
                "Deadline":{value:'', elementType:'input', elementConfig:{
                    type:'date'
                }},
            },
            2:{
                "Qualifications":[],
            }
        }
    }

    nextButtonHandler=(e)=>{
        this.setState({form:{...this.state.form, step: this.state.form.step+1}})
    }

    inputChangeHandler=(e,step, label)=>{
        let inputState = {...this.state.form[step][label], value: e.target.value};

        this.setState({form:{...this.state.form, [step]:{...this.state.form[step], [label]:inputState}}})
        console.log(e.target.value)
    }

    render(){
        let Slide;
        if(this.state.form.step != 1 )
        Slide = QualSlide;
        else 
        Slide = TwoColSlide;

        return(
        <div style={{background:"white",paddingBottom:24}}>
            <Slide step={this.state.form.step} inputs={this.state.form[this.state.form.step]} inputHandler={this.inputChangeHandler}/>
            
            <Button clicked={this.nextButtonHandler} style={{width:"unset", display:'block', margin:'auto'}} primary>Next</Button>
        </div>)
    }
}

const OneColSlide = (props)=>{
    return (
    <div className={styles.Slide}>
        {Object.keys(props.inputs).map((key, i) =><Input inputHandler={(e)=>props.inputHandler(e,props.step, key)} key={key} label={`${i+1}. ${key}`} {...props.inputs[key]}/>)}
    </div>)
}

const TwoColSlide = (props)=>{
    return  (<div className={[styles.Slide,styles.TwoCol].join(" ")}>
        {Object.keys(props.inputs).map((key, i) =><Input inputHandler={(e)=>props.inputHandler(e,props.step, key)} key={key} label={`${i+1}. ${key}`} {...props.inputs[key]}/>)}
    </div>)
}

const QualSlide = (props)=>{
    return  (<div className={[styles.Slide].join(" ")}>
        {Object.keys(props.inputs).map((key, i) =><QualInput inputHandler={(e)=>props.inputHandler(e,props.step, key)} key={key} label={`${i+1}. ${key}`} {...props.inputs[key]}/>)}
    </div>)
}