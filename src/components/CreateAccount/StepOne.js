import React, { Component } from 'react'
import leftimg from './images/leftimgForm1.svg'
import styles from './StepOne.module.css'
import TextInput from './TextInput'
import logoinput from './images/inputlogo.svg'
import { CreateAccountContext } from './CreateAccountContext'
import { Redirect } from 'react-router-dom'
// import 'firebase/storage'

class StepOne extends Component {

    state={
        name: '',
        logo: '',
        industry_type: '',
        company_address: '',
        website: '',
        logoName:'',
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
        if(img.endsWith('.jpg')||img.endsWith('.jpeg')||img.endsWith('.svg')||img.endsWith('.png')){
            console.log("Theek hai img");
            imgName = e.target.value.slice(e.target.value.indexOf('C:/fakepath/') + 13);
            console.log(imgName);
            this.setState({logoName:imgName})
            this.imgUploader(e.target);
        }
        else{
            console.log("Not an Img");
        }
    }

    imgUploader = (file) =>{
        // // let ref = firebase().storage().ref();
        // let name = 'logo'
        // let metadata = {
        //     contentType: file.type,
        // }
        // let task = ref.child(name).put(file, metadata);
        // task.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {
        //     console.log(url);
        //     this.setState({logo:url});
        // })
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
                <div className={styles.leftcontainer}>
                    <img className = {styles.leftimage} src={leftimg} />
                </div>
                <div className={styles.rightcontainer}>
                    <p className={styles.tellus}>Tell Us About Your Company</p>
                    <br />
                    <div className={styles.companylogodiv}>
                        <label>
                            <img className = {styles.leftimage} src={logoinput} />
                            <input className={styles.hide} id="CompanyLogo" type="file" onChange={this.logoinputHandler} accept="image/png, image/jpeg"></input>
                        </label>
                    </div>
                    <form>
                        <TextInput change={this.nameinputhandler} label="Company Name"/>
                        <TextInput change={this.typeinputhandler} label="Industry Type"/>
                        <TextInput change={this.websiteinputhandler} label="Company Website"/>
                        <TextInput change={this.addinputhandler} label="Company Address"/>
                        {!(this.state.name && this.state.industry_type && this.state.website && this.state.company_address && this.state.logo) &&<button className={styles.submitButtoninactive}>Next</button>}
                        {this.state.name && this.state.industry_type && this.state.website && this.state.company_address && this.state.logo && <button type = "submit" onClick={this.nextPagehandler} className={styles.submitButton}>Next</button>}
                    </form>
                </div>
            </div>
        )
    }
}

StepOne.contextType = CreateAccountContext;

export default StepOne
