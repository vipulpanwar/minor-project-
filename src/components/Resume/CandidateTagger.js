import React from "react"; 
import style from './CandidateTagger.module.css';
import firebase from "../../firebase";
import Button from "../shared/ui/Button/Button";

const GoodMaker = () =>{
    console.log("aaj se tu Good");
}

const db = firebase.firestore();


const ExcellentMaker = () =>{
    console.log("aaj se tu Excellent");
}

const AverageMaker = () =>{
    console.log("aaj se tu Average");
}


export default  (props)=>{

    console.log("Yahan se dekh");
    console.log(props.student);
  
      return(
        <div className = {style.outercontainer}>
        <div className = {style.innercontainer}>
            <p className = {style.candidatetaggertext}><br/>Tag Candidate</p>
            <br />
            <div className= {style.buttoncontainer}>
            <a onClick={ExcellentMaker}>
                <Button width="115px" style={{padding:"14px 26px 14px 26px", marginRight:"16px"}}>Excellent</Button>
            </a>
            <a onClick={GoodMaker}>
                <Button width="90px" style={{padding:"14px 26px 14px 26px", marginRight:"16px"}}>Good</Button>
            </a>
            <a onClick={AverageMaker}>
                <Button width="109px" style={{padding:"14px 26px 14px 26px", marginRight:"16px"}}>Average</Button>
            </a>
            </div>
        </div>
    </div>
      )
  }