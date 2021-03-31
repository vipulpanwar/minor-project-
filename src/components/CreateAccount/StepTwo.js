import React, { Component } from 'react'
import leftimg from './images/leftimgForm2.svg'
import styles from './StepOne.module.css'
import TextInput from './TextInput'
import logoinput from './images/inputlogo.svg'
import { CreateAccountContext } from './CreateAccountContext'
import Sidepanel from './Sidepanel'

class StepTwo extends Component {
    state={
        count:1,
        form: {
            founded_in: '',
            size: '',
            about: '',
            email: '',
            phone: '',
            social_media:{

            }
        }
    }

    counter = (e)=>{
        e.preventDefault();
        let count = this.state.count
        count = count +1;
        this.setState({count:count})
        console.log(count)
    }

    socialinputhandler = (i, e)=>{
        // console.log(i,e, "i e")
        let social = this.state.form.social_media;
        social[i] = e.target.value
        console.log(social, 'social');
        this.setState({social_media:social})
    }

    inputHandler = (thing, e)=>{
        let form = this.state.form
        form[thing] = e.target.value
        this.setState({form:form})
        console.log(form)
    }

    createaccount =(e)=>{
        e.preventDefault();
        console.log(this.state.form, "final form")
        let form = this.state.form
        this.context.stepTwoHandler(form)
    }

    

    render() {
        let social = [];
        for(let i=0;i<this.state.count; i++){
            social.push(<TextInput padding='7px' key={i} change={(e)=>{this.socialinputhandler(i, e)}} display="inlineBlock" width='315px' label="Social Media Link"/>)
        }
        return (
            <div className={styles.container}>
                <Sidepanel />
                <div className={styles.rightcontainer}>
                    <p className={styles.tellus}>Tell Us About Your Company</p>
                    <br /><br/>
                    <form>
                        <div className={styles.leftForm}>
                            <TextInput display="inlineBlock" change={(e)=>this.inputHandler('founded_in',e)} width='147px' label="Founded In"/>
                            <TextInput display="inlineBlock" change={(e)=>this.inputHandler('size',e)} width='147px' label="Company Size"/>
                            <TextInput display="inlineBlock" change={(e)=>this.inputHandler('phone',e)} width='315px' label="Contact Number"/>
                            {/* <TextInput padding='7px' display="inlineBlock" width='315px' label="Social Media Link"/> */}
                            {social}
                            {this.state.count<5 && <button className={styles.nooutline} onClick={this.counter}><p className = {styles.addmore}>+Add More Social Media Links</p></button>}
                        </div>
                        <div className={styles.leftForm}>
                            <TextInput display="inlineBlock" change={(e)=>this.inputHandler('email',e)} width='315px' label="Company Email ID"/>
                            <TextInput textarea width='315px' change={(e)=>this.inputHandler('about',e)} height="131px" label="About" />
                        </div>
                            {this.state.form.founded_in && this.state.form.size && this.state.form.about && this.state.form.email && this.state.form.phone && <button type = "submit" onClick={this.createaccount} className={styles.createButton}>Create Account</button>}
                            {!(this.state.form.founded_in && this.state.form.size && this.state.form.about && this.state.form.email && this.state.form.phone) && <button type = "submit" disabled className={styles.createButtonInactive}>Create Account</button>}
                    </form>
                </div>
            </div>
        )
    }
}

StepTwo.contextType = CreateAccountContext;

export default StepTwo
