import React from "react";
import styles from './StudentsHeader.module.css';
import logo from '../../assets/images/ensvee-logo-white.svg';
import backIcon from '../../assets/icons/back.svg';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom'

export default (props)=>{
    return(<header className={[styles.StudentsHeader, props.loading?styles.Loading :null].join(" ") }>
        <Link to="/" className={styles.BackButton}><img src={backIcon}></img></Link>
        <Link to="/" ><img src={logo} className={styles.Logo}></img></Link>
        <h2 className={styles.Title}>{props.title}</h2>
        <h4 className={styles.SubTitle}>{props.subTitle}</h4>
        <SearchBar filterToggle= {props.filterToggle}/>
    </header>)
}