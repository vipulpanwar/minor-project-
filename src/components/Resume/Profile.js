import { Component } from "react";
import React from 'react';
import style from './CandidateTagger.module.css';
import Phone from './images/phone.svg'
import Email from './images/email.svg'
import './Resume.css';
import Button from '../shared/ui/Button/Button';
import { StudentsContext } from '../AppliedStudents/StudentsContext';
import { connect } from 'react-redux';
import { CreateToast } from '../../store/actions/alert';
import { withRouter } from "react-router";
import ReactToPrint from 'react-to-print';
import Download from './images/download.svg'

class Profile extends Component{
  state = {
    loading : 'none',
  }


  render(){
    let student = this.props.student;
    let degrees = Object.keys(this.props.student.edu);
    let degree = this.props.student.edu[degrees[0]];
    for (let degreeKey in this.props.student.edu){
      if(degree.year<=this.props.student.edu[degreeKey].year){
        degree = this.props.student.edu[degreeKey];
      }
    }

    let prev, next;
    if(student != undefined){
      [prev,next] = getPrevAndNextStudent(this.props.student?.email, this.context.state.applicants)
    }

    const updatestatus = async (hireOrReject)=>{
      if(this.state.loading=='none'){
        this.setState({loading:hireOrReject});
        let link
        if(next){
          link = '/jobs/' + this.props.jobid + '/student/' + next; 
        }
        else if(prev){
          link = '/jobs/' + this.props.jobid + '/student/' + prev;
        }
        else{
          link = '/jobs/' + this.props.jobid
        }
        await this.context.updatestat(this.props.student.id, hireOrReject, ()=>{this.props.history.replace(link)});
        this.setState({loading:'none'});
      }
      else{
        this.props.createToast({message: "Please Wait"})
      }
    }

    let rejectstyle = {color: "#D0021B", borderColor:"#D0021B"}
    
    
    return(
            <div className="profile-container">
              {console.log(this.context.state, "context")}
              <div className="profilepic">
              <img className='profileimg' src={this.props.student.profilePic} alt="Image not found"/>
              </div>
              <div className="applicant-info">
                <p className="applicant-name">{student.name}</p>
                <p className="applicant-details">{degree ? `${degree?.year} • ${degree?.field} • ${degree?.course}` :null} {(degree && student.city)? " • ":""} {student.city}</p>
                <p className="applicant-bio">
                  {student.about}
                </p>
                <div className="contact-container">
                  <div style={{fontSize:'14px', fontWeight:'300'}}>
                    Contact
                    <div style={{display:'flex', gap:"16px"}}>
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
                </div>
                <div className='hideOnPrint' style={{paddingTop:"20px"}}>
                  {/* <div className="rating-box"><p className='rating-text'><span style={{color:"#898989"}}>Rating:</span> 4.5</p></div> */}
                  <div style={{display:"flex", float:"right", gap:'12px'}}>
                    {console.log(this.props.student.id)}
                    {this.props.student.status=="Applied" && <Button width="129px" height="50px" loading={this.state.loading=="Rejected"} clicked={()=>{updatestatus("Rejected")}} style={rejectstyle}>Reject</Button>}
                    {this.props.student.status=="Applied" && <Button width="129px" height="50px" loading={this.state.loading=="Hired"} clicked={()=>{updatestatus("Hired")}} primary={this.props.student.status=="Hired"}>Hire</Button>}
                    {this.props.student.status=="Hired" && <Button width="270px" noShadow height="50px" style={{border: 'none', shadow:'none', color:'#57a3c8', backgroundColor:'#e6f3fb'}}>Hired</Button>}
                    {this.props.student.status=="Rejected" && <Button width="270px" noShadow height="50px" style={{border: 'none', shadow:'none', color:'#ff4a4a', backgroundColor:'#ffeeef'}}>Rejected</Button>}
                    <ReactToPrint
                    trigger={() => {
                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                        // to the root node of the returned component as it will be overwritten.
                        return <a><Button style={{borderRadius:'100%', padding:'0',width:'58px', height:'58px', backgroundColor:'#dbe9f9', border:'#dbe9f9', display:'grid', placeItems:'center'}}><img height="25.5px" src={Download}></img></Button></a>;
                    }}
                    content={() => this.props.refer}
                    />
                  </div>
                </div>
              </div>
            </div>
    )
}
}

Profile.contextType = StudentsContext;

const getPrevAndNextStudent = (email, students)=>{
  let index= students.findIndex(student=> student.email == email);
  let prev, next;
  if( index > 0)
      prev = students[index - 1]?.email;
  if( index < students.length)
      next = students[index + 1]?.email;

  return [prev, next]
}

const mapDispatchToProps = (dispatch)=>({
  createToast: (toast)=>dispatch(CreateToast(toast))
})

export default (connect(null, mapDispatchToProps))(withRouter(Profile))
