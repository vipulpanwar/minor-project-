import React from "react";
import {Component} from "react"; 
import style from './CandidateTagger.module.css';
import Button from "../shared/ui/Button/Button";
import Phone from './images/phone.svg'
import Email from './images/email.svg'

const buttonStyle = {
    padding:"14px 26px 14px 26px", 
    marginRight:"16px"
}

class CandidateTagger extends Component{

    GoodMaker = () => this.pusher("Good");        
    ExcellentMaker = () => this.pusher("Excellent");
    AverageMaker = () => this.pusher("Average");
    
    pusher = (newflag) => this.props.updateFlag(newflag)

    render(){
      

      return(
        <div className = {style.outercontainer}>
        <div className = {style.innercontainer}>
            <p className = {style.candidatetaggertext}>Tag Candidate</p>
            <div className= {style.buttoncontainer}>
                <Button disabled={this.props.student.loading} clicked={this.ExcellentMaker} primary={this.props.student.flag?.toLowerCase()=="excellent"} style={buttonStyle}>Excellent</Button>
                <Button disabled={this.props.student.loading} clicked={this.GoodMaker} primary={this.props.student.flag?.toLowerCase()=="good"} style={buttonStyle}>Good</Button>
                <Button disabled={this.props.student.loading} clicked={this.AverageMaker} primary={this.props.student.flag?.toLowerCase()=="average"} style={buttonStyle}>Average</Button>
            </div>
        </div>
        <div className={ [style.contactContainer, this.props.student.loading?style.Loading: null].join(" ")}>
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

export default CandidateTagger