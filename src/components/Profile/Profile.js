import React, { Component } from 'react'
import styles from './profile.module.css'
import TextInput from '../CreateAccount/TextInput'
import Background from './images/backgroundimg.svg'
import Website from './images/website.svg'
import Location from './images/location.svg'
import Logo from './images/logo.svg'
import {connect} from 'react-redux';
import Button from '../shared/ui/Button/Button'

class Profile extends Component {
    state={
        count:0,
        changed: false,
        size: undefined,
        social_media: {
            
            },
        about: undefined,
        phone: undefined,
    }

    counter = (e)=>{
        e.preventDefault();
        let count = this.state.count
        count = count +1;
        this.setState({count:count})
        console.log(count)
    }

    componentDidMount(){
        let count = 0
        let map = this.props.profile.social_media
        for(let i=0; i<5; i++){
            if(!map[i]){
                count = i
                break;
            }
        }
        
        this.setState({count:count, social_media: this.props.profile.social_media, about: this.props.profile.about, phone: this.props.profile.phone, size: this.props.profile.b})
    }

    render() {
        let social = [];
        for(let i=0;i<this.state.count; i++){
            social.push(<TextInput change={console.log(this)} inline width='100%' key={i} value={this.props.profile.social_media[i]} label="Social Media Links"/>)
        }
        let profile = this.props.profile;
        return (
            <div className={styles.container}>
                <div className={styles.leftcontainer}>
                    <div>
                        <img width="110%" src={Background}></img>
                        <div className={styles.logocontainer}><img src={Logo}/></div>
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
                <div style={{padding:'44px'}}>
                    <div className={styles.title}>Edit Company Details</div>
                    <div className={styles.leftForm}>
                        {console.log(profile.size, "size")}
                        <TextInput change={console.log(this)} inline width='100%' value={profile.size} label="Company Size"/>
                        <TextInput change={console.log(this)} inline width='100%' value={profile.phone} label="Phone Number"/>
                        <TextInput change={console.log(this)} inline width='100%' value={profile.about} height="290px" textarea label="About"/>
                    </div>
                    <div className={styles.rightForm}>
                        <div style={{minHeight:'393px'}}>
                            {social}
                            {/* <TextInput inline width='100%' label="Social Media Links"/> */}
                            {this.socailrender}
                            {this.state.count<5 && <button className={styles.nooutline} onClick={this.counter}><p className = {styles.addmore}>+Add More Social Media Links</p></button>}
                        </div>
                        {!this.state.changed &&<button disabled className={styles.createButtoninactive}>Save Changes</button>}
                        {this.state.changed && <button type = "submit" onClick={console.log("Hehe")} className={styles.createButton}>Save Changes</button>}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    profile:state.auth.profile
})

export default connect(mapStateToProps, null)(Profile)