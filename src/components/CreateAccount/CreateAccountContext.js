import React , { createContext, Component, createRef, useCallBack, useRef, useState, useEffect, useLayoutEffect} from 'react';
import {db} from '../../firebase'
import { storage } from '../../firebase'
export const CreateAccountContext = createContext();


class CreateAccountProviderComponent extends Component{
    state = {
        form:{
            logo:'',
            name:'',
            industry_type:'',
            company_address:'',
            website:'',
            founded_in: '',
            size: '',
            about: '',
            email: '',
            phone: '',
            social_media:{

            }
        },
        stepOne: true,
        img:''
    }

    stepOneHandler =(data)=>{
        let updater = this.state.form
            updater.logo=data.logo
            updater.name=data.name
            updater.industry_type=data.industry_type
            updater.company_address= data.company_address
            updater.website= data.website
        this.setState({form:updater,stepOne:false, img: data.img})
    }

    stepTwoHandler = (data)=>{
        let updater = this.state.form
            updater.founded_in = data.founded_in
            updater.size = data.size
            updater.about = data.about
            updater.email = data.email
            updater.phone = data.phone
            updater.social_media =data.social_media
        let url = this.imgUploader(this.state.img)
        updater.logo = url
        this.setState({form:updater})
        console.log(updater, "updater")
        db.collection("company").add(this.state.form)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
                alert("Account Created SuccessFully")
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    imgUploader = async (file) =>{
        console.log(file, "file")
        let ref = storage.ref('company');
        let name = 'logo'
        let task = ref.child(name).put(file.files[0]);
        await task.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {
            console.log(url, "url");
            return url;
        })
    }

    render(){

        let contextData = {state: this.state, stepOneSubmit: this.stepOneHandler, stepTwoHandler : this.stepTwoHandler}
    return (
        <CreateAccountContext.Provider value={contextData}>
            {this.props.children}
            {/* {console.log('Context render')} */}
        </CreateAccountContext.Provider>)
    }
    
}

export const CreateAccountProvider = (CreateAccountProviderComponent);