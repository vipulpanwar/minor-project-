import React, { Component } from 'react'
import leftimg from './images/leftimgForm2.svg'
import styles from './StepOne.module.css'
import TextInput from './TextInput'
import logoinput from './images/inputlogo.svg'
import { CreateAccountContext } from './CreateAccountContext'
import Sidepanel from './Sidepanel'
import Button from '../shared/ui/Button/Button'
import { Input, InputLabel } from '../shared/ui/Input/Input'

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
        },
        sizeError:'',
        founded_inError:'',
        phoneError:'',
        socialError:{
            0:'',
            1:'',
            2:'',
            3:'',
            4:'',
        },
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

    validURL = (str)=>{
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    createaccount =(e)=>{
        e.preventDefault();
        this.setState({sizeError:'',
        founded_inError:'',
        phoneError:'',
        socialError:{
            0:'',
            1:'',
            2:'',
            3:'',
            4:'',
        }})
        let flag=0;
        if(isNaN(this.state.form.size)){
            // alert("size must be a number")
            flag=1
            this.setState({sizeError: "Must be a number"})
        }
        if(isNaN(this.state.form.founded_in)){
            // alert("Foundation Year must be a number");
            flag=1
            this.setState({founded_inError: "Must be a number"})

        }
        if(isNaN(this.state.form.phone)){
            // alert("Phone number must be a number");
            flag=1
            this.setState({phoneError: "Must be a number"})
        }
        let socialerror={
            0:'',
            1:'',
            2:'',
            3:'',
            4:'',
        }
        for(let i=0;i<this.state.count;i++){
            if(!this.validURL(this.state.social_media[i])){
                socialerror[i] = "Must be a link"
            }
        }
        this.setState({socialError: socialerror})
        if(flag==0){
            console.log(this.state.form, "final form")
            let form = this.state.form
            this.context.stepTwoHandler(form)
        }
    }

    

    render() {
        let social = [];
        for(let i=0;i<this.state.count; i++){
            social.push(<div key={i} style={{display:'block'}} className={styles.inputcontainer}>
                            <Input key={i} errors={this.state.socialError[i]} style={{marginBottom:'24px'}} elementType="input" label="Social Media Link" inputHandler={(e)=>{this.socialinputhandler(i, e)}}></Input>
                        </div>)
        }
        return (
            <div className={styles.container}>
                <Sidepanel />
                <div className={styles.rightcontainer}>
                    <br /><br/>
                    <form>
                        <div className={styles.formcontainer}>
                            <div className={styles.leftForm}>
                                <div style={{display:'block'}} className={styles.inputcontainer}>
                                    <Input errors={this.state.founded_inError} style={{marginBottom:'24px'}} elementType="input" label="Founded In" inputHandler={(e)=>this.inputHandler('founded_in',e)}></Input>
                                </div>
                                <div style={{display:'block'}} className={styles.inputcontainer}>
                                    <Input errors={this.state.phoneError} style={{marginBottom:'24px'}} elementType="input" label="Contact Number" inputHandler={(e)=>this.inputHandler('phone',e)}></Input>
                                </div>
                                {social}
                                {this.state.count<5 && <button className={styles.nooutline} onClick={this.counter}><p className = {styles.addmore}>+Add More Social Media Links</p></button>}
                            </div>
                            <div className={styles.rightForm}>
                                <div style={{display:'block'}} className={styles.inputcontainer}>
                                    <Input errors={this.state.sizeError} style={{marginBottom:'24px'}} elementType="input" label="Company Size" inputHandler={(e)=>this.inputHandler('size',e)}></Input>
                                </div>
                                <div style={{display:'block'}} className={styles.inputcontainer}>
                                    <Input elementConfig={{rows:'6'}} style={{marginBottom:'24px', height:'131px'}} elementType="textarea" label="About" inputHandler={(e)=>this.inputHandler('about',e)}></Input>
                                </div>
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
