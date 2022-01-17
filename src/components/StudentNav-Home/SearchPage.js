import React from 'react';
import styles from './SearchPage.module.css';
import Illus from '../../assets/illustrations/invites_illustration.svg';
import SearchInput from './SearchInput';

import JobProfiles from './JobProfiles';

function SearchPage() {
    return (
        <div>
            <div className={styles.SearchSection}>
                <div className={styles.IllusRow}>
                    <img className={styles.Illus} src={Illus}/>     
                    <div>
                        <h3 className={`${styles.Title} GradientText`}>Search students and invite them</h3>
                        <h3 className={`${styles.Title} GradientText`}>for a better future</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                    </div>  
                </div>
                <div className={styles.SearchRow}>
                    <SearchInput/>
                </div>
            </div>
            <div className={styles.JobProfiles}>
                <JobProfiles/>
            </div>
        </div>
    )
}

export default SearchPage
