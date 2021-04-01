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
import { SetCompanyProfile } from '../../store/actions/auth'

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

    savechangesHandler = async ()=>{
        console.log("saving....")
        this.setState({isLoading: true})
        await db.collection('company').doc(this.props.user.uid).update({size:this.state.size, about:this.state.about, social_media: this.state.social_media, phone: this.state.phone})
        this.setState({changed:false})
        let profile = this.props.profile;
        profile.size = this.state.size
        profile.about = this.state.about
        profile.socail_media = this.state.social_media
        profile.phone = this.state.phone
        this.props.setCompany(profile)
        this.setState({isLoading:false})
    }

    render() {
        let social = [];
        for(let i=0;i<this.state.count; i++){
            social.push(<TextInput change={(e)=>this.socialchangeHandler(i,e)} inline width='100%' key={i} value={this.state.social_media[i]} label="Social Media Links"/>)
        }
        let profile = this.props.profile;
        return (
            <div className={styles.container}>
                <div className={styles.leftcontainer}>
                    <div>
                        <img style={{minHeight:'345px'}} width="100%" src={Background}></img>
                        <div className={styles.logocontainer}><img width="47px" src={this.props.profile.logo}/></div>
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
                            <a className={styles.link} href={profile.website}> <div className={styles.website}>{profile.website}</div></a>
                            <div className={styles.address}>
                                <img src={Location}/> <div className={styles.location}> {profile.company_address}</div>
                            </div>
                        </div>
                        <div className={styles.logout}>
                            <Button width='187px'>Log Out</Button>
                        </div>
                    </div>
                </div>
                <div className={styles.rightcontainer}>
                <div className={styles.title}>Edit Company Details</div>
                <div className={styles.gridBox} style={{padding:'44px'}}>
                    <div className={styles.leftForm}>
                        {console.log(profile.size, "size")}
                        <TextInput change={this.sizeChangeHandler} inline width='100%' value={this.state.size} label="Company Size"/>
                        <TextInput change={this.phoneChangeHandler} inline width='100%' value={this.state.phone} label="Phone Number"/>
                        <TextInput change={this.aboutChangeHandler} inline width='100%' value={this.state.about} height="290px" textarea label="About"/>
                    </div>
                    <div className={styles.rightForm}>
                        <div style={{minHeight:'393px'}}>
                            {social}
                            {/* <TextInput inline width='100%' label="Social Media Links"/> */}
                            {this.socailrender}
                            {this.state.count<5 && <button className={styles.nooutline} onClick={this.counter}><p className = {styles.addmore}>+Add More Social Media Links</p></button>}
                        </div>
                        {/* {!this.state.changed &&<Button width='373px' disabled>Save Changes</Button>} */}
                        <Button loading={this.state.isLoading} clicked={this.savechangesHandler} primary={this.state.changed}>Save Changes</Button>
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
    setCompany: (profile)=> dispatch(SetCompanyProfile(profile))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)