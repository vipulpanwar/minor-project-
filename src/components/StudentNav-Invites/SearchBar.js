import React, {useState} from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../assets/icons/search2.svg'

const SearchBar = (props)=>{
    return(
        <div className={styles.SearchBarContainer}>
            <img src={searchIcon} className={styles.Icon}/>
            <input className={styles.SearchBar} placeholder="Search Students, Skills, etc"/>
        </div>
    )
}

export default SearchBar;
