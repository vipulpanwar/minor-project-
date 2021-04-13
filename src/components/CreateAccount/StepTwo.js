import React, { Component } from 'react'
import leftimg from './images/leftimgForm2.svg'
import styles from './StepOne.module.css'
import TextInput from './TextInput'
import logoinput from './images/inputlogo.svg'
import { CreateAccountContext } from './CreateAccountContext'
import Sidepanel from './Sidepanel'
import { CreateToast } from '../../store/actions/alert';
import {connect} from 'react-redux';
import Button from '../shared/ui/Button/Button'
import { Input, InputLabel } from '../shared/ui/Input/Input'

class StepTwo extends Component {
    state={
        loading:false,
        count:1,
        form: {
            founded_in: '',
            size: '',
            about: '',
            phone: '',
            social_media:{

            }
        },
        error:{
            aboutError: '',
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
        if(this.state.loading)
        {
            this.props.createToast({message:'Please Wait'})
            console.log("waiting")
        }    
        else
        {
            this.setState({loading:true})
            let error = {sizeError:'',
                founded_inError:'',
                phoneError:'',
                socialError:{
                    0:'',
                    1:'',
                    2:'',
                    3:'',
                    4:'',
                }
            }
            // this.setState({error:error})
            let flag=0;
            if(!this.state.form.size){
                flag = 1
                error.sizeError = "Required"
            }
            else if(isNaN(this.state.form.size)){
                // alert("size must be a number")
                flag=1
                // this.setState({sizeError: "Must be a number"})
                error.sizeError = "Must be a number"
            }
            if(!this.state.form.founded_in){
                flag=1
                error.founded_inError = "Required"
            }
            else if(isNaN(this.state.form.founded_in)){
                // alert("Foundation Year must be a number");
                flag=1
                // this.setState({founded_inError: "Must be a number"})
                error.founded_inError = "Must be a number"

            }

            if(!this.state.form.phone){
                flag=1
                error.phoneError = "Required"
            }
            else if(isNaN(this.state.form.phone)){
                // alert("Phone number must be a number");
                flag=1
                // this.setState({phoneError: "Must be a number"})
                error.phoneError = "Must be a number"
            }else if(this.state.phone>10000000000000){
                flag = 1
                error.phoneError = 'Must be a number less than 13 digits'
            }
            let socialerror={
                0:'',
                1:'',
                2:'',
                3:'',
                4:'',
            }
            for(let i=0;i<this.state.count;i++){
                if(this.state.form.social_media[i]){
                    if(!this.validURL(this.state.form.social_media[i])){
                        socialerror[i] = "Must be a link"
                    }
                }
            }

            if(!this.state.form.about){
                flag=1
                error.aboutError = "Required"
            }
            // this.setState({socialError: socialerror})
            error.socialError = socialerror
            if(flag==0){
                console.log(this.state.form, "final form")
                let form = this.state.form
                this.context.stepTwoHandler(form)
            }
            else{
                this.setState({error:error})
            }
        }
    }

    socialRemover = (i,e) =>{
        e.preventDefault();
        console.log(i,e)
        let form = this.state.form
        // form.social_media[i] = ''
        for(let y=i; y<4; y++){
            form.social_media[y]=form.social_media[y+1];
        }
        form.social_media[4] = ''
        // let form = this.state.form
        // form.social_media = social
        console.log(form, "form")
        this.setState({form: form, count: this.state.count-1})
    }

    render() {
        let social = [];
        for(let i=0;i<this.state.count; i++){
            social.push(<div key={i} style={{display:'block'}}>
                            <div className={styles.socialContainer}> 
                                <Input key={i} errors={this.state.error.socialError[i]} elementType="input" label="Social Media Link" inputHandler={(e)=>{this.socialinputhandler(i, e)}}></Input>
                                {0 && this.state.count!=1&&<button key={i+10} style={{display:'none'}} onClick={(e)=>{this.socialRemover(i,e)}}>-</button>}
                            </div>
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
                                    <Input errors={this.state.error.founded_inError} style={{marginBottom:'24px'}} limit="200"  elementConfig={{placeholder:"Year"}}  elementType="input" label="Founded In" inputHandler={(e)=>this.inputHandler('founded_in',e)}></Input>
                                </div>
                                <div style={{display:'block'}} className={styles.inputcontainer}>
                                    <Input errors={this.state.error.phoneError} style={{marginBottom:'24px'}} limit="200" elementType="input" label="Contact Number" inputHandler={(e)=>this.inputHandler('phone',e)}></Input>
                                </div>
                                {social}
                                {this.state.count<5 && <button className={styles.nooutline} onClick={this.counter}><p className = {styles.addmore}>+Add More Social Media Links</p></button>}
                            </div>
                            <div className={styles.rightForm}>
                                <div style={{display:'block'}} className={styles.inputcontainer}>
                                    <Input errors={this.state.error.sizeError} style={{marginBottom:'24px'}} limit="200" elementConfig={{placeholder:"Number of employees"}} elementType="input" label="Company Size" inputHandler={(e)=>this.inputHandler('size',e)}></Input>
                                </div>
                                <div style={{display:'block'}} className={styles.inputcontainer}>
                                    <Input errors={this.state.error.aboutError} elementConfig={{rows:'6'}} style={{marginBottom:'24px', height:'131px'}} limit="1000" placeholder="Tell Us About Your Company" elementType="textarea" label="About" inputHandler={(e)=>this.inputHandler('about',e)}></Input>
                                </div>
                            </div>
                                {this.state.form.founded_in && this.state.form.size && this.state.form.about && this.state.form.phone && <Button style={{marginTop:'20px'}} loading={this.state.loading} clicked={this.createaccount} primary width="100%">Create Account</Button>}
                                {!(this.state.form.founded_in && this.state.form.size && this.state.form.about && this.state.form.phone) && <Button style={{marginTop:'20px'}} looksDisabled clicked={this.createaccount} width="100%">Create Account</Button>}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

StepTwo.contextType = CreateAccountContext;


const mapDispatchToProps = (dispatch)=>({
    createToast: (toast)=>dispatch(CreateToast(toast))
})

export default connect(null, mapDispatchToProps)(StepTwo)