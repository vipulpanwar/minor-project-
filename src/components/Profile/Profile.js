import React, { Component } from 'react'
import styles from './profile.module.css'
import TextInput from '../CreateAccount/TextInput'
import Background from './images/backgroundimg.svg'
import Website from './images/website.svg'
import Location from './images/location.svg'
import { v4 as uuidv4 } from 'uuid';
import {connect} from 'react-redux';
import Button from '../shared/ui/Button/Button'
import { db } from '../../firebase'
import { SetCompanyProfile } from '../../store/actions/auth';
import {Logout as logoutAction} from '../../store/actions/auth';
import { CreateToast } from '../../store/actions/alert';
import SuccessModal from '../shared/ui/Modal/SuccessModal';

class Profile extends Component {
    state={
        count:0,
        changed: false,
        isLoading:false,
        size: '',
        social_media: {
            0: '',
            1: '',
            2: '',
            3: '',
            4: '',
            },
        about: '',
        phone: '',
        logOutLoading: false,
        phoneError: '',
        socialError: {},
        sizeError: '',
    }

    counter = (e)=>{
        e.preventDefault();
        let count = this.state.count
        count = count +1;
        this.setState({count:count})
        console.log(count)
    }

    componentDidMount(){
        let social = this.state.social_media
        let count = 5
        let map = this.props.profile.social_media
        for(let i=0; i<5; i++){
            if(!map[i]){
                count = i
                break;
            }
            else{
                social[i] = this.props.profile.social_media[i]
            }
        }
        
        this.setState({count:count, social_media: social, about: this.props.profile.about, phone: this.props.profile.phone, size: this.props.profile.size})
    }

    socialchangeHandler = (i,e)=>{
        let social = this.state.social_media
        social[i] = e.target.value
        this.setState({socail_media:social})
        console.log(e.target.value, "social")
        if(this.state.changed==false){
            this.setState({changed:true})
        }
    }

    sizeChangeHandler = (e)=>{
        this.setState({size:e.target.value})
        console.log(e.target.value, "value")
        if(this.state.changed==false){
            this.setState({changed:true})
        }
    }

    phoneChangeHandler = (e)=>{
        this.setState({phone:e.target.value})
        console.log(e.target.value, "value")
        if(this.state.changed==false){
            this.setState({changed:true})
        }
    }

    aboutChangeHandler = (e)=>{
        this.setState({about:e.target.value})
        console.log(e.target.value, "value")
        if(this.state.changed==false){
            this.setState({changed:true})
        }
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

    validate = () =>{
        let sizeError = ''
        let phoneError = ''
        let flag=0
        if(isNaN(this.state.size)){
            flag=1
            // this.setState({sizeError:'Must be a number'})
            sizeError = 'Must be a number'
        }
        if(isNaN(this.state.phone)){
            flag=1
            // this.setState({phoneError:'Must be a number'})
            phoneError = 'Must be a number'
        }
        let socialError = {
            0:'',
            1:'',
            2:'',
            3:'',
            4:'',
        }
        for(let i=0;i<this.state.count;i++){
            if(this.state.social_media[i]){
                if(!this.validURL(this.state.social_media[i])){
                    flag=1
                    socialError[i] = 'Must be a link'
                }
            }
        }
        this.setState({socialError:socialError, phoneError: phoneError, sizeError: sizeError})
        if(flag==0){
            this.savechangesHandler()
        }
    }

    savechangesHandler = async ()=>{
        // this.validate()
        console.log("saving....")
        this.setState({isLoading: true})
        await db.collection('company').doc(this.props.user.uid).update({size:this.state.size, about:this.state.about, social_media: this.state.social_media, phone: this.state.phone})
        let profile = this.props.profile;
        profile.size = this.state.size
        profile.about = this.state.about
        profile.social_media = this.state.social_media
        profile.phone = this.state.phone
        this.props.setCompany(profile)
        this.setState({isLoading:false, changed:false})
        this.props.createToast({message:"Changes Saved Successfully"});
    }

    logout = () =>{
        this.setState({logOutLoading:true})
        this.props.logout();
        this.props.createToast({message:"Logged Out Successfully"}); 
        this.setState({logOutLoading:false})
    }


    socialRemover = (i,e) =>{
        e.preventDefault();
        // console.log(i,e)
        let social = this.state.social_media
        social[i] = ''
        for(let y=i; y<4; y++){
            social[y]=social[y+1];
        }
        social[4] = ''
        this.setState({social_media: social, count: this.state.count-1, changed:true})
    }

    getExternalLink=(link)=>{
        let newLink ="";
        if(!link.startsWith("https://") && !link.startsWith("http://"))
            newLink = 'http://'+link;
        else 
            newLink = link;

        return newLink;
    }

    render() {
        let social = [];
        for(let i=0;i<this.state.count; i++){
            social.push(<div className={styles.socialContainer} key={i+10}><TextInput errors={this.state.socialError[i]} width="100%" inline change={(e)=>this.socialchangeHandler(i,e)} key={i} value={this.state.social_media[i]} label="Social Media Links"/>{this.state.count!=1&&<button key={i+20} style={{display:'none'}} onClick={(e)=>{this.socialRemover(i,e)}}>-</button>}</div>)
        }
        let profile = this.props.profile;
        return (
            <div className={styles.container}>
                <div className={styles.leftcontainer}>
                    <div>
                        <img style={{minHeight:'345px'}} width="100%" src={Background}></img>
                        <div className={styles.logocontainer}><img className={styles.logo} src={this.props.profile.logo}/></div>
                    </div>
                    <div className={styles.companyDetails}>
                        <div className={styles.companyName}>
                            {profile.name}
                        </div>
                        <div className={styles.Industry}>
                            {profile.industry}
                            <p>Founded In {profile.founded_in} | Email: {profile.email}</p>
                        </div>
                        <div className={styles.otherDetails}>
                            <img src={Website}/>
                            <a className={styles.link} target="_blank" rel="noopener noreferrer" href={this.getExternalLink(profile.website)}> <div className={styles.website}>{profile.website}</div></a>
                            <div className={styles.address}>
                                <img src={Location}/> <div className={styles.location}> {profile.company_address}</div>
                            </div>
                        </div>
                        <div className={styles.logout}>
                            <Button loading={this.state.logOutLoading} clicked={()=>this.logout()} width='187px'>Log Out</Button>
                        </div>
                    </div>
                </div>
                <SuccessModal />
                <div className={styles.rightcontainer}>
                <div className={styles.title}>Edit Company Details</div>
                <div className={styles.gridBox}>
                    <div className={styles.leftForm}>
                        <TextInput errors={this.state.sizeError} change={this.sizeChangeHandler} inline width='100%' value={this.state.size} label="Company Size"/>
                        <TextInput errors={this.state.phoneError} change={this.phoneChangeHandler} inline width='100%' value={this.state.phone} label="Phone Number"/>
                        <TextInput change={this.aboutChangeHandler} inline width='100%' value={this.state.about} height="290px" elementConfig={{rows:'15'}} textarea label="About"/>
                    </div>
                    <div className={styles.rightForm}>
                        <div style={{minHeight:'445px'}}>
                            {social}
                            {/* <TextInput inline width='100%' label="Social Media Links"/> */}
                            {this.socailrender}
                            {this.state.count<5 && <button className={styles.nooutline} onClick={this.counter}><p className = {styles.addmore}>+Add More Social Media Links</p></button>}
                        </div>
                        {/* {!this.state.changed &&<Button width='373px' disabled>Save Changes</Button>} */}
                        <Button loading={this.state.isLoading} clicked={this.validate} disabled={!this.state.changed} primary={this.state.changed}>Save Changes</Button>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    profile:state.auth.profile,
    user:state.auth.user,
})

const mapDispatchToProps = (dispatch)=>({
    logout : ()=> dispatch(logoutAction()),
    setCompany: (profile)=> dispatch(SetCompanyProfile(profile)),
    createToast: (toast)=>dispatch(CreateToast(toast))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)