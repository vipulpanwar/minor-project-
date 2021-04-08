import { Component } from "react";
import React from 'react';
import './Resume.css';
import userPlaceholder from '../../assets/images/user_placeholder.jpg';
import Button from '../shared/ui/Button/Button';
import { StudentsContext } from '../AppliedStudents/StudentsContext';
import { connect } from 'react-redux';
import { storage } from '../../firebase'
import { CreateToast } from '../../store/actions/alert';
import { withRouter } from "react-router";

class Profile extends Component{
  state = {
    source : userPlaceholder,
    loading : 'none',
  }

  componentDidUpdate = async ()=>{
    let src = ""
    let profilepicLink = "users/"+ this.props.student.uid + '/myphoto.png'
    storage.ref().child(profilepicLink).getDownloadURL().then((url)=>{
      src = url
      console.log(src)
      if(this.state.source!=src)
      this.setState({source:src})
    })    
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

    let prev, next 
    if(student != undefined){
      [prev,next] = getPrevAndNextStudent (this.props.student?.email, this.context.state.applicants)
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

    let rejectstyle = {marginRight:"12px", color: "#D0021B", borderColor:"#D0021B"}
    
    
    return(
            <div className="profile-container">
              {console.log(this.context.state, "context")}
              <div className="profilepic">
              <img className='profileimg' src={this.state.source} alt="Image not found"/>
              </div>
              <div className="applicant-info">
                <p className="applicant-name">{student.name}</p>
                <p className="applicant-details">{degree.field} - {degree.course}  |  {student.city}</p>
                <p className="applicant-bio">
                  {student.about}
                </p>
                <div style={{paddingTop:"20px"}}>
                  {/* <div className="rating-box"><p className='rating-text'><span style={{color:"#898989"}}>Rating:</span> 4.5</p></div> */}
                  <div style={{display:"inline-block", float:"right"}}>
                    {console.log(this.props.student.id)}
                    {this.props.student.status=="Applied" && <Button width="129px" height="50px" loading={this.state.loading=="Rejected"} clicked={()=>{updatestatus("Rejected")}} style={rejectstyle}>Reject</Button>}
                    {this.props.student.status=="Applied" && <Button width="129px" height="50px" loading={this.state.loading=="Hired"} clicked={()=>{updatestatus("Hired")}} primary={this.props.student.status=="Hired"}>Hire</Button>}
                    {this.props.student.status=="Hired" && <Button width="270px" noShadow height="50px" style={{border: 'none', shadow:'none', color:'#57a3c8', backgroundColor:'#e6f3fb'}}>Hired</Button>}
                    {this.props.student.status=="Rejected" && <Button width="270px" noShadow height="50px" style={{border: 'none', shadow:'none', color:'#ff4a4a', backgroundColor:'#ffeeef'}}>Rejected</Button>}
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
