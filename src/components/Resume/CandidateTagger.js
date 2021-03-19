import React from "react";
import {Component} from "react"; 
import style from './CandidateTagger.module.css';
import firebase from "../../firebase";
import Button from "../shared/ui/Button/Button";
import db from '../../firebase';
import { StudentsContext } from '../AppliedStudents/StudentsContext';


class CandidateTagger extends Component{

    render(){
        const GoodMaker = () =>{
            pusher("good");
        }
        
        
        const ExcellentMaker = () =>{
            pusher("excellent");
        }
        
        const AverageMaker = () =>{
            pusher("average");
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
                <Button width="115px" primary={this.props.student.flag?.toLowerCase()=="excellent"} style={{padding:"14px 26px 14px 26px", marginRight:"16px"}}>Excellent</Button>
            </a>
            <a onClick={GoodMaker}>
                <Button width="90px" primary={this.props.student.flag?.toLowerCase()=="good"} style={{padding:"14px 26px 14px 26px", marginRight:"16px"}}>Good</Button>
            </a>
            <a onClick={AverageMaker}>
                <Button width="109px" primary={this.props.student.flag?.toLowerCase()=="average"} style={{padding:"14px 26px 14px 26px", marginRight:"16px"}}>Average</Button>
            </a>
            </div>
        </div>
    </div>
      )
  }
}

CandidateTagger.contextType = StudentsContext;


export default CandidateTagger