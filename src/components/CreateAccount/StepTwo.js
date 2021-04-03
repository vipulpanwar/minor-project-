import React, { Component } from 'react'
import leftimg from './images/leftimgForm2.svg'
import styles from './StepOne.module.css'
import TextInput from './TextInput'
import logoinput from './images/inputlogo.svg'
import { CreateAccountContext } from './CreateAccountContext'
import Sidepanel from './Sidepanel'
import Button from '../shared/ui/Button/Button'

class StepTwo extends Component {
    state={
        count:1,
        form: {
            founded_in: '',
            size: '',
            about: '',
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
            social.push(<div key={i} style={{marginTop: '20px'}}><TextInput inline padding='7px' key={i} change={(e)=>{this.socialinputhandler(i, e)}} width='100%' label="Social Media Link"/></div>)
        }
        return (
            <div className={styles.container}>
                <Sidepanel />
                <div className={styles.rightcontainer}>
                    <br /><br/>
                    <form>
                        <div className={styles.formcontainer}>
                            <div className={styles.leftForm}>
                                <TextInput inline change={(e)=>this.inputHandler('founded_in',e)} width='100%' label="Founded In"/>
                                <TextInput inline change={(e)=>this.inputHandler('phone',e)} padding={'0'} width='100%' label="Contact Number"/>
                                {/* <TextInput padding='7px' display="inlineBlock" width='315px' label="Social Media Link"/> */}
                                {social}
                                {this.state.count<5 && <button className={styles.nooutline} onClick={this.counter}><p className = {styles.addmore}>+Add More Social Media Links</p></button>}
                            </div>
                            <div className={styles.rightForm}>
                                <TextInput inline change={(e)=>this.inputHandler('size',e)} width='100%' label="Company Size"/>
                                {/* <TextInput display="inlineBlock" change={(e)=>this.inputHandler('email',e)} width='315px' label="Company Email ID"/> */}
                                <TextInput inline textarea width='100%' change={(e)=>this.inputHandler('about',e)} height="131px" label="About" />
                            </div>
                                {this.state.form.founded_in && this.state.form.size && this.state.form.about && this.state.form.phone && <Button style={{marginTop:'20px'}} clicked={this.createaccount} primary width="100%">Create Account</Button>}
                                {!(this.state.form.founded_in && this.state.form.size && this.state.form.about && this.state.form.phone) && <Button style={{marginTop:'20px'}} disabled width="100%">Create Account</Button>}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

StepTwo.contextType = CreateAccountContext;

export default StepTwo
