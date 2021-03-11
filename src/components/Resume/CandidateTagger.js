import React, { Component } from "react";
import style from './CandidateTagger.module.css'
import {connect} from 'react-redux';
import {FetchStudent as getStudentAction} from '../../store/actions/jobs';
import {withRouter, Link} from 'react-router-dom';
import { Fragment } from "react";
import Button from "../shared/ui/Button/Button";


class CandidateTagger extends Component{
    componentDidMount(){
        
    }
    componentDidUpdate(){
        
    }

    render (){
        return(

            <div className = {style.outercontainer}>
                <div className = {style.innercontainer}>
                    <p className = {style.candidatetaggertext}><br/>Tag Candidate</p>
                    <br />
                    <div className= {style.buttoncontainer}>
                    <Button width="115px" style={{padding:"14px 26px 14px 26px", marginRight:"16px"}}>Excellent</Button>
                    <Button width="90px" style={{padding:"14px 26px 14px 26px", marginRight:"16px"}}>Good</Button>
                    <Button width="109px" style={{padding:"14px 26px 14px 26px", marginRight:"16px"}}>Average</Button>
                    </div>
                </div>
            </div>
        )
    }
} 

const mapDispatchToProps = (dispatch)=>({
    getStudent: (email)=>dispatch(getStudentAction(email))
})


export default CandidateTagger;