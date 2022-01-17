import React from 'react';
import Illus from '../../assets/illustrations/invites_illustration.svg';
import styles from './NoInvites.module.css';

const NoInvites = (props)=>{
    return (
        <div className={styles.NoInvites}> 
            <img className={styles.Illus} src={Illus}/>       
            <div className={styles.Content}>
                <h3 className={`${styles.Heading} GradientText`}>Invite students now to see them</h3>
                <h3 className={`${styles.Heading} GradientText`}>here and get their contact details</h3> 
                <p className={styles.SubText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                <button className={styles.Button}>Invite Now</button>
            </div>     
        </div>
    )
}

export default NoInvites;
