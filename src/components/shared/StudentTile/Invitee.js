import React from 'react';

import styles from './Invitee.module.css'
import SkillSlider from './SkillsSlider';
import UserDetails from './UserDetails';

const Invitee = (props)=>{
    return(
        <div className={styles.Invitee}>
            <div className={styles.FirstRow}>
                <UserDetails/>
                <span className={styles.Awaiting}>Awaiting Response</span>
                
            </div>
   
            <SkillSlider/>
        </div>
    )
}

const PersonalDetails = (props) => (
  <div className={styles.PersonalDetails}>
    <div>
      <span className={styles.Label}>Ph:</span>
      <span className={styles.Value}>9643358859</span>
    </div>
    <div>
      <span className={styles.Label}>Email:</span>
      <span className={styles.Value}>unnatmalkoti@gmail.com</span>
    </div>
  </div>
);

export default Invitee;