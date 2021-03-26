import React, { Component } from 'react'
import styles from './profile.module.css'
import TextInput from '../CreateAccount/TextInput'
import Background from './images/backgroundimg.svg'
import Website from './images/website.svg'
import Location from './images/location.svg'
import Logo from './images/logo.svg'

export default class Profile extends Component {
    state={
        count:0
    }

    counter = (e)=>{
        e.preventDefault();
        let count = this.state.count
        count = count +1;
        this.setState({count:count})
        console.log(count)
    }

    render() {
        let social = [];
        for(let i=0;i<this.state.count; i++){
            social.push(<TextInput inline width='100%' key={i} label="Social Media Links"/>)
        }
        return (
            <div className={styles.container}>
                <div className={styles.leftcontainer}>
                    <div>
                        <img width="110%" src={Background}></img>
                        <div className={styles.logocontainer}><img src={Logo}/></div>
                    </div>
                    <div className={styles.companyDetails}>
                        <div className={styles.companyName}>
                            Google Pvt. Ltd.
                        </div>
                        <div className={styles.Industry}>
                            Technology Company
                            <p>Founded In 2001 | Email:google@gmail.com </p>
                        </div>
                        <div className={styles.otherDetails}>
                            <img src={Website}/>
                            <a className={styles.link} href="https://www.google.com"> <div className={styles.website}>www.google.com</div></a>
                            <div className={styles.address}>
                                <img src={Location}/> <div className={styles.location}> Unitech Signature Tower 2 Tower B, Gurgaon Sector 15 Part 2, Gurgaon - 122001, Near 32 Mile Stone, Village Silokhera</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.rightcontainer}>
                <div style={{padding:'44px'}}>
                    <div className={styles.title}>Edit Company Details</div>
                    <div className={styles.leftForm}>
                        <TextInput inline width='100%' label="Company Size"/>
                        <TextInput inline width='100%' label="Phone Number"/>
                        <TextInput inline width='100%' height="290px" textarea label="About"/>
                    </div>
                    <div className={styles.rightForm}>
                        {social}
                        <TextInput inline width='100%' label="Social Media Links"/>
                        {this.state.count<5 && <button className={styles.nooutline} onClick={this.counter}><p className = {styles.addmore}>+Add More Social Media Links</p></button>}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
