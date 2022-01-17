import React, {useState} from 'react';
import NoInvites from './NoInvites';
import styles from './InvitesSent.module.css';
import SearchBar from './SearchBar';
import InviteeList from './InviteeList';

const InvitesSent = (props)=>{
    return(
        <div>
            <h2 className="StudentNavSectionTitle">Invites Sent</h2>
            <div className="StudentNavSectionContent">
                <div className={styles.SearchRow}>
                    <SearchBar/>
                    <button className={`btn2 ${styles.Btn}`}>Download Data</button>
                </div>
                <InviteeList/>
                <NoInvites/>
            </div>
        </div>
    )
}

export default InvitesSent;