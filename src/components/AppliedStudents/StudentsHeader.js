import React, {Component} from "react";
import styles from './StudentsHeader.module.css';
import logo from '../../assets/images/ensvee-logo-white.svg';
import backIcon from '../../assets/icons/back.svg';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom'
import { StudentsContext } from "./StudentsContext";
import Kebab, {KebabOption as Option} from '../shared/ui/KebabMenu/KebabMenu';
import {auth} from '../../firebase';
import axios from 'axios';
import { CreateToast } from '../../store/actions/alert';
import {connect} from 'react-redux';
const FileDownload = require('js-file-download');


class Studentsheader extends Component{

     downloadXlsHandler= async()=>{
        this.props.createToast({message:'Downloading Xlsx...'})
        let token = await auth.currentUser.getIdToken();
        let res = await axios.get(`https://api.ensvee.com/jobs/${this.props.jobId}/download_xls`, {
            headers:{token},
            responseType: 'arraybuffer',
        })
        FileDownload(res.data, `${this.props.subTitle}_students_data.xlsx`)
    }

    render(){
    return(<header className={[styles.StudentsHeader, this.props.loading?styles.Loading :null].join(" ") }>
        <Kebab style={{position:'absolute', right:52}}>
            <Option clicked={this.downloadXlsHandler}>Download Xls</Option>
        </Kebab>
        <Link to="/" className={styles.BackButton}><img src={backIcon}></img></Link>
        <Link to="/" ><img src={logo} className={styles.Logo}></img></Link>
        <h2 className={styles.Title}> {!this.context.state.showHired?`${this.props.counts.count || 0} Students Applied`:`${this.props.counts.hired} Students Hired`}</h2>
        <h4 className={styles.SubTitle}>{this.props.subTitle}</h4>
        <SearchBar filterToggle= {this.props.filterToggle}/>
    </header>)
    }
}

Studentsheader.contextType = StudentsContext


const mapDispatchToProps = (dispatch)=>({
    createToast: (toast)=>dispatch(CreateToast(toast))
  })


export default connect(null, mapDispatchToProps) (Studentsheader)

