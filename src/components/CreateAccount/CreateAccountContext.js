import React , { createContext, Component, createRef, useCallBack, useRef, useState, useEffect, useLayoutEffect} from 'react';
import {db} from '../../firebase'
import { storage } from '../../firebase'
import {CreateAlert} from '../../store/actions/alert';
import {Logout} from '../../store/actions/auth';

import {connect} from 'react-redux';
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

    stepTwoHandler = async (data)=>{
        let updater = this.state.form
            updater.founded_in = data.founded_in
            updater.size = data.size
            updater.about = data.about
            updater.email = this.props.user.email
            updater.phone = data.phone
            updater.social_media =data.social_media
            updater.verified=false
            updater.useremail = this.props.user.email
            
        let url = await this.imgUploader(this.state.img)
        updater.logo = url
        // console.log(url.['[PromiseResult]'])
        this.setState({form: updater})
        console.log(updater, "updater")
        try{
            await db.collection("company").doc(this.props.user.uid).set(updater);
            this.props.logout();
            this.props.createAlert({subtitle:'Your profile verification is under process. Kindly wait for 24 hours.', title:"Profile Created", code:'success'})
        }
        catch(error) {
            console.error("Error adding document: ", error);
        }
    }

    imgUploader = async (file) =>{
        let logo
        console.log(file, "file")
        let ref = storage.ref('company');
        let name = this.props.user.uid + '.png'
        let task = await ref.child(name).put(file);
        // task.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {
        //     console.log(url, "url");
        //     logo = url
        // })
        logo = await task.ref.getDownloadURL()
        console.log(logo, "logo")
        return logo
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

const mapStateToProps = (state)=>({
    user:state.auth.user
})

const mapDispatchToProps= (dispatch)=>({
    createAlert: (alert)=>dispatch(CreateAlert(alert)),
    logout: ()=>dispatch(Logout())
})

export const CreateAccountProvider = connect(mapStateToProps, mapDispatchToProps)(CreateAccountProviderComponent);