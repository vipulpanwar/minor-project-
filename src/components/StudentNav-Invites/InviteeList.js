import React from 'react';
import styles from './InviteeList.module.css'
import Invitee from '../shared/StudentTile/Invitee';


const InviteeList = (props)=>{
    return(
        <div className={styles.InviteeList}>
            <Invitee/>
            <Invitee/>
            <Invitee/>
            <Invitee/>
        </div>
    )
}

export default InviteeList;


// const Invitee = (props)=>{
//     return(
//         <div className={styles.Invitee}>
//             <img src={ProfilePicture}/>
//             test
//         </div>
//     )
// }