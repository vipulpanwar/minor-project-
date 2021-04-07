import React, { Component } from 'react'
import leftimg from './images/leftimgForm1.svg'
import styles from './StepOne.module.css'
import TextInput from './TextInput'
import logoinput from './images/inputlogo.svg'
import { CreateAccountContext } from './CreateAccountContext'
import redcamera from './images/redcamera.svg'
import { Redirect } from 'react-router-dom'
import Button from '../shared/ui/Button/Button'
import Resizer from 'react-image-file-resizer'
import Sidepanel from './Sidepanel'
import Editimg from './images/editpencil.png'
import { Input, InputLabel } from '../shared/ui/Input/Input'
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
        error : {
            websiteError:'',
            logoError:false,
            nameError: '',
            typeError: '',
            addressError: '',
        },
    }

    resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
        file,
        300,
        300,
        "PNG",
        80,
        0,
        (uri) => {
            resolve(uri);
        },
        "base64"
        );
    });

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

    logoinputHandler = async (e)=>{
        let imgName
        console.log(e.target.value)
        let img = e.target.value.toLowerCase()
        if(e.target.files[0]){
            if(img.endsWith('.jpg')||img.endsWith('.png')||img.endsWith('.jpeg')){
                imgName = e.target.value.slice(e.target.value.indexOf('C:/fakepath/') + 13);
                console.log(imgName);
                // alert(e.target.files[0])
                // this.compressor(e.target.files[0])
                let URIimg = await this.resizeFile(e.target.files[0]);
                let compressedImg = this.dataURIToBlob(URIimg)
                this.setState({img:compressedImg})
                this.setState({logoName:imgName})
            }
            else{
                let errors = this.state.error
                errors.logoError = true
                this.setState({error: errors})
            }
        }
        else{
            this.setState({img:'', logoName:''})
        }
    }

    dataURIToBlob = (dataURI) => {
        const splitDataURI = dataURI.split(",");
        const byteString =
          splitDataURI[0].indexOf("base64") >= 0
            ? atob(splitDataURI[1])
            : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
        return new Blob([ia], { type: mimeString });
      };

    validURL = (str)=>{
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }

    nextPagehandler = (e) =>{
        e.preventDefault();
        if(!this.validURL(this.state.website)){
            // alert("You haven't entered a valid URL");
            let error = this.state.error
            error.websiteError = 'Must be a link'
            this.setState({error: error})
        }
        else{
            console.log(this.state, "Step One done")
            this.context.stepOneSubmit(this.state)
            console.log(this.context.state.form)
        }
    }

    requiredHandler = (e) =>{
        e.preventDefault();
        console.log("required")
        let error = {
            websiteError:'',
            logoError:false,
            nameError: '',
            typeError: '',
            addressError: '',
        }
        if(!this.state.logoName){
            error.logoError = true
        }
        if(!this.state.name){
            error.nameError = "Required"
        }
        if(!this.state.industry_type){
            error.typeError = "Required"
        }
        if(!this.state.website){
            error.websiteError = "Required"
        }
        else if(!this.validURL(this.state.website)){
            error.websiteError = "Must be a link"
        }
        if(!this.state.company_address){
            error.addressError = "Required"
        }
        this.setState({error:error})
    }

    render() {
        return (
            <div className={styles.container}>
                {/* <Success show title="Account Created" subtitle="Your Account will get activated in 24hours" buttonText="Go To Login Page"/> */}
                <Sidepanel stepOne/>
                <div className={styles.rightcontainer}>
                    <p className={styles.tellus}>Tell Us About Your Company</p>
                    <br />
                    <div className={styles.companylogodiv}>
                        <label>
                            {this.state.logoName?<div className={styles.logopreviewdiv}><img className={styles.logopreviewimg} src={URL.createObjectURL(this.state.img)}/><img src={Editimg} className={styles.editPencil}/></div>:null}
                            <input className={styles.hide} id="CompanyLogo" type="file" onChange={this.logoinputHandler} accept="image/png, image/jpeg"></input>
                            {this.state.error.logoError && (!this.state.logoName) && <div style={{backgroundColor: '#ffe7e5', border: '1px dashed #FF6F65'}} className={styles.logoinputdiv}><img className = {styles.leftimage} width='110px' height='110px' style={{cursor:'pointer'}} src={redcamera} /></div>}
                            {(!this.state.error.logoError) && (!this.state.logoName) && <div className={styles.logoinputdiv}><img className = {styles.leftimage} width='90px' height='90px' style={{cursor:'pointer'}} src={logoinput} /></div>}
                        </label>
                    </div>
                    <form>
                        <div style={{display:'block'}} className={styles.inputcontainer}>
                            <Input style={{marginBottom:'24px'}} errors={this.state.error.nameError} elementType="input" label="Company Name" inputHandler={this.nameinputhandler}></Input>
                        </div>
                        <div style={{display:'block'}} className={styles.inputcontainer}>
                            <Input style={{marginBottom:'24px'}} errors={this.state.error.typeError} elementType="input" label="Industry Type" inputHandler={this.typeinputhandler}></Input>
                        </div>
                        <div style={{display:'block'}} className={styles.inputcontainer}>
                            <Input style={{marginBottom:'24px'}} errors={this.state.error.websiteError} elementType="input" label="Company Website" inputHandler={this.websiteinputhandler}></Input>
                        </div>
                        <div style={{display:'block'}} className={styles.inputcontainer}>
                            <Input style={{marginBottom:'24px'}} errors={this.state.error.addressError} elementType="input" label="Company Address" inputHandler={this.addinputhandler}></Input>
                        </div>
                        {!(this.state.name && this.state.industry_type && this.state.website && this.state.company_address && this.state.logoName) &&<Button looksDisabled clicked={this.requiredHandler} width="150px">Next</Button>}
                        {this.state.name && this.state.industry_type && this.state.website && this.state.company_address && this.state.logoName && <Button clicked={this.nextPagehandler} primary width="150px">Next</Button>}
                    </form>
                </div>
            </div>
        )
    }
}

StepOne.contextType = CreateAccountContext;

export default StepOne
