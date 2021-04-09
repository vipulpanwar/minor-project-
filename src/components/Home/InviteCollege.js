import { render } from '@testing-library/react';
import React, { Component } from 'react';
import QualInput from '../NewJobForm/QualInput';
import { Input, InputLabel} from '../shared/ui/Input/Input';
import Button from '../shared/ui/Button/Button';
import styles from '../NewJobForm/Slides.module.css';
import TopBar from '../shared/ui/Modal/TopBar';
import { Fragment } from 'react';
import {db} from '../../firebase';
import {CreateAlert} from '../../store/actions/alert';
import {connect} from 'react-redux';

const inputStyles = {}

const ButtonTrayStyles ={
    display: 'flex',
    justifyContent: 'center',
    padding: '0 26px',
    gap:'20px',
    marginBottom:'20px'
}

class InviteCollegeForm extends Component{
    state={
        form:{
            "Qualifications":{
                value: [],
                validation:"required",
            },
        }
    }

    inputChangeHandler=(e, label)=>{
        let inputState = {...this.state.form[label], value: e.target.value};
        this.setState({form:{...this.state.form, [label]:inputState}})
    }

    inputValidator(input){
        if(!input.validation) return [];
        let errors = [], checks = input.validation.split(" ");

        if(checks.find(sub=> sub=='required'))
        {
            if (!input.value)
                errors.push("Required")
            else if (Object.keys(input.value).length == 0)
                errors.push("Required")
        }
        if(!errors.length && checks.find(sub=> sub=="future") && new Date(input.value) < new Date())
            errors.push("Date is in past");
        if(!errors.length && checks.find(sub=> sub=="url") && !this.validURL(input.value))
            errors.push("Invalid Url");
        return errors;
    }

    inviteHandler=(invited)=>{
    
        let qualifications = {...this.state.form.Qualifications};
        let oldInvited = [...this.state.form.Qualifications.value];

        let index = oldInvited.findIndex((val)=>{
            return val.degree == invited.degree &&
            val.course == invited.course &&
            val.college == invited.college
        })

        if(index > -1)
            oldInvited.splice(index,1)

        qualifications.value = [invited,...oldInvited];

        this.setState({form:{...this.state.form, Qualifications:qualifications}});
    }

    deleteInviteHandler=(i)=>{
        let invited = [...this.state.form.Qualifications.value];
        let qualifications = {...this.state.form.Qualifications};

        invited.splice(i,1);
        qualifications.value = invited;
        this.setState({form:{...this.state.form, Qualifications:qualifications}});
    }

    validateSection(){
        let hasErrors = false;
        let section = {...this.state.form};

        // console.log("validation section", step)
        for(let inputKey in section){
            let input = {...section[inputKey]};
            let errors= this.inputValidator(input);
            input['errors'] = errors;
            console.log(errors)
            section[inputKey] = input;
            if(errors.length > 0)
                hasErrors = true
        }

        console.log(section)
        return new Promise((resolve, reject)=>{
            this.setState({form:{...this.state.form, ...section}},()=>resolve(hasErrors))
        })
    }

    UpdateJob = async ()=>{

        if(await this.validateSection()) return;
        console.log('valid form')
        // let job ={};
        let form = {...this.state.form};
        
        // for(let inputKey in form){
        //     let input = section[inputKey];
        //     if(input.skip) continue;
        //     job[input.name] = input.value;
        // }
        

        let newEdu = {};
        let mergedQuals = [...this.props.qualifications];
        form['Qualifications'].value.forEach(qual=>{
            let index = mergedQuals.findIndex( oldQual => oldQual.college== qual.college && oldQual.degree == qual.degree && oldQual.course == qual.course);
            if(index>-1)
            {
                mergedQuals[index].branch = Array.from(new Set([...mergedQuals[index].branch, ...qual.branch]));
                mergedQuals[index].year = Array.from(new Set([...mergedQuals[index].year, ...qual.year]));
            }
            else mergedQuals.push({degree:qual.degree, college:qual.college, course:qual.course, branch:qual.branch, year:qual.year})
        })
        console.log('merged qual', mergedQuals);

        mergedQuals.forEach(invited=>{
            invited.year.forEach(year=>{
                invited.branch.forEach(branch=>{
                    newEdu[`${invited.college}#${invited.degree}#${invited.course}#${branch}#${year}`] = true;
                })
            })
        })

                   
        let recipients = new Set();
        Object.keys(newEdu).forEach(course=>{
            let college = course.split('#')[0];
            recipients.add(college);
        });

        const oldCollegeList = Object.keys(this.props.job.recipient)
        let newRecipient ={};
        Array.from(recipients).forEach(college=> {
            if(oldCollegeList.includes(college))
                newRecipient[college] = this.props.job.recipient[college];
            else
               newRecipient[college]= "pending";
        });
        


        let uid = this.props.job.uid;
        await db.collection('jobs').doc(uid).update({edu: newEdu, recipient:newRecipient});
        console.log(uid, newEdu, newRecipient)
        this.props.close();
        this.props.createAlert({code:"success2", title:"Success", subtitle:"Invited Successfully"})
    
    }

    render(){
        return(
        <Fragment>
            <TopBar title="Send Invite To More Colleges"/>
            <div className={styles.Slide}>
                <QualInput inviteHandler={this.inviteHandler} deleteHandler={this.deleteInviteHandler} label={`${1}. Qualifications`} {...this.state.form['Qualifications']}/>
            </div>
            <div style={ButtonTrayStyles} className={styles.ButtonTray}>
                <Button clicked={this.backButtonHandler} clicked={this.props.goBack}  style={{width:"unset"}}>Go Back</Button>
                <Button clicked={this.nextButtonHandler} clicked={this.UpdateJob} style={{width:"unset"}} primary>Send Invite</Button>
            </div>
        </Fragment>
        )
    }


}

const mapDispatchToProps = (disptach)=>({
    createAlert : (alert)=>disptach(CreateAlert(alert))
})

export default connect(null, mapDispatchToProps)(InviteCollegeForm)