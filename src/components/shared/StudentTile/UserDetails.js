import React from 'react';
import ProfilePicture from '../../../assets/images/profile-pic.png'
import Arrow from '../../../assets/icons/upright-arrow.svg'
import styles from './Invitee.module.css';

function UserDetails() {
    return (
        <div className={styles.UserDetails}>
            <img className={styles.ProfilePicture} src={ProfilePicture}/>
            <div>
                <h4 className={styles.Name}><a href="/">Shubham Sharma<img className={styles.Arrow} src={Arrow}/></a></h4>
                <p className={styles.Desc}>IT - BCA  |  New Delhi<br/>Mewar Institute of Management</p>
            </div>
        </div>
    )
}

export default UserDetails
