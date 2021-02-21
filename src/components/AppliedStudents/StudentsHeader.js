import React from "react";
import styles from './StudentsHeader.module.css';
import logo from '../../assets/images/ensvee-logo-white.svg';
import backIcon from '../../assets/icons/back.svg';
import SearchBar from './SearchBar';

export default (props)=>{
    return(<header className={styles.StudentsHeader}>
        <button className={styles.BackButton}><img src={backIcon}></img></button>
        <img src={logo} className={styles.Logo}></img>
        <h2 className={styles.Title}>{props.title}</h2>
        <h4 className={styles.SubTitle}>{props.job.profile}</h4>
        <SearchBar filterToggle= {props.filterToggle}/>
    </header>)
}