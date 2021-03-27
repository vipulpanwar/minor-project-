import React, { Component } from 'react'
import leftimg from './images/leftimgForm1.svg'
import styles from './StepOne.module.css'
import TextInput from './TextInput'
import logoinput from './images/inputlogo.svg'
import { CreateAccountContext } from './CreateAccountContext'
import Camera from './images/camera.svg'
import { Redirect } from 'react-router-dom'
// import Success from '../shared/ui/Modal/SuccessModal'
// import 'firebase/storage'

class StepOne extends Component {

    state={
        name: '',
        industry_type: '',
        company_address: '',
        website: '',
        logoName:'',
        img: '',
    }

    nameinputhandler = (e)=>{
        if(this.state.name!=e.target.value){
            this.setState({name:e.target.value})
        }
    }
    websiteinputhandler = (e)=>{
        if(this.state.website!=e.target.value){
            this.setState({website:e.target.value})
        }
    }
    addinputhandler = (e)=>{
        if(this.state.company_address!=e.target.value){
            this.setState({company_address:e.target.value})
        }
    }
    typeinputhandler = (e)=>{
        if(this.state.industry_type!=e.target.value){
            this.setState({industry_type:e.target.value})
        }
    }

    logoinputHandler = (e)=>{
        let imgName
        console.log(e.target.value)
        let img = e.target.value.toLowerCase()
        if(img.endsWith('.jpg')||img.endsWith('.png')){
            console.log("Theek hai img");
            imgName = e.target.value.slice(e.target.value.indexOf('C:/fakepath/') + 13);
            console.log(imgName);
            this.setState({logoName:imgName, img:e.target})
        }
        else{
            console.log("Not an Img");
        }
    }

    nextPagehandler = (e) =>{
        //validations
        e.preventDefault();
        console.log(this.state, "Step One done")
        this.context.stepOneSubmit(this.state)
        console.log(this.context.state.form)
    }

    render() {
        return (
            <div className={styles.container}>
                {/* <Success show title="Account Created" subtitle="Your Account will get activated in 24hours" buttonText="Go To Login Page"/> */}
                <div className={styles.leftcontainer}>
                    <img className = {styles.leftimage} src={leftimg} />
                </div>
                <div className={styles.rightcontainer}>
                    <p className={styles.tellus}>Tell Us About Your Company</p>
                    <br />
                    <div className={styles.companylogodiv}>
                        <label>
                            {this.state.logoName?<div className={styles.logoName}><div style={{textAlign:'center'}}><img src={Camera}/><br/>{this.state.logoName}</div></div>:<img className = {styles.leftimage} src={logoinput} />}
                            <input className={styles.hide} id="CompanyLogo" type="file" onChange={this.logoinputHandler} accept="image/png, image/jpeg"></input>
                        </label>
                    </div>
                    <form>
                        <TextInput change={this.nameinputhandler} label="Company Name"/>
                        <TextInput change={this.typeinputhandler} label="Industry Type"/>
                        <TextInput change={this.websiteinputhandler} label="Company Website"/>
                        <TextInput change={this.addinputhandler} label="Company Address"/>
                        {!(this.state.name && this.state.industry_type && this.state.website && this.state.company_address && this.state.logoName) &&<button disabled className={styles.submitButtoninactive}>Next</button>}
                        {this.state.name && this.state.industry_type && this.state.website && this.state.company_address && this.state.logoName && <button type = "submit" onClick={this.nextPagehandler} className={styles.submitButton}>Next</button>}
                    </form>
                </div>
            </div>
        )
    }
}

StepOne.contextType = CreateAccountContext;

export default StepOne
