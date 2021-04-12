import React from "react";
import {Component} from "react"; 
import style from './CandidateTagger.module.css';
import firebase from "../../firebase";
import Button from "../shared/ui/Button/Button";
import db from '../../firebase';
import { StudentsContext } from '../AppliedStudents/StudentsContext';
import Phone from './images/phone.svg'
import Email from './images/email.svg'


class CandidateTagger extends Component{

    render(){
        const GoodMaker = () =>{
            pusher("Good");
        }
        
        
        const ExcellentMaker = () =>{
            pusher("Excellent");
        }
        
        const AverageMaker = () =>{
            pusher("Average");
        }
        
        const pusher = (newflag) =>{
            this.context.updatef(this.props.student.id, newflag)
        }
      return(
        <div className = {style.outercontainer}>
        <div className = {style.innercontainer}>
            <p className = {style.candidatetaggertext}><br/>Tag Candidate</p>
            <br />
            <div className= {style.buttoncontainer}>
            <a onClick={ExcellentMaker}>
                <Button primary={this.props.student.flag?.toLowerCase()=="excellent"} style={{padding:"14px 26px 14px 26px", marginRight:"16px"}}>Excellent</Button>
            </a>
            <a onClick={GoodMaker}>
                <Button primary={this.props.student.flag?.toLowerCase()=="good"} style={{padding:"14px 26px 14px 26px", marginRight:"16px"}}>Good</Button>
            </a>
            <a onClick={AverageMaker}>
                <Button primary={this.props.student.flag?.toLowerCase()=="average"} style={{padding:"14px 26px 14px 26px", marginRight:"16px"}}>Average</Button>
            </a>
            </div>
        </div>
        <div className={style.contactContainer}>
            Contact
            <div className={style.numberdiv}>
                <img src={Phone}/>
                <div className={style.number}>
                    {this.props.student.phone}
                </div>
            </div>
            <div className={style.numberdiv}>
                <img src={Email}/>
                <div className={style.number}>
                    {this.props.student.email}
                </div>
            </div>
        </div>
    </div>
      )
  }
}

CandidateTagger.contextType = StudentsContext;


export default CandidateTagger