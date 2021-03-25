import React, {Component} from "react";
import styles from './StudentsHeader.module.css';
import logo from '../../assets/images/ensvee-logo-white.svg';
import backIcon from '../../assets/icons/back.svg';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom'
import { StudentsContext } from "./StudentsContext";

class Studentsheader extends Component{
    render(){
    return(<header className={[styles.StudentsHeader, this.props.loading?styles.Loading :null].join(" ") }>
        <Link to="/" className={styles.BackButton}><img src={backIcon}></img></Link>
        <Link to="/" ><img src={logo} className={styles.Logo}></img></Link>
        <h2 className={styles.Title}>{this.props.title} {!this.context.state.showHired?'Students Applied':'Students Hired'}</h2>
        <h4 className={styles.SubTitle}>{this.props.subTitle}</h4>
        <SearchBar filterToggle= {this.props.filterToggle}/>
    </header>)
    }
}

Studentsheader.contextType = StudentsContext

export default Studentsheader

