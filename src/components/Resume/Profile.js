import { Component } from "react";
import React from 'react';
import './Resume.css';
import userPlaceholder from '../../assets/images/user_placeholder.jpg';
import Button from '../shared/ui/Button/Button';
import { StudentsContext } from '../AppliedStudents/StudentsContext';
import { storage } from '../../firebase'

class Profile extends Component{
  state = {
    source : userPlaceholder
  }

  componentDidMount = async ()=>{
    let src = ""
    let profilepicLink = "users/"+ this.props.student.uid + '/myphoto.png'
    storage.ref().child(profilepicLink).getDownloadURL().then((url)=>{
      src = url
      console.log(src)
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

    const updatestatus=(hireOrReject)=>{
      this.context.updatestat(this.props.student.id, hireOrReject)
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
                  <div className="rating-box"><p className='rating-text'><span style={{color:"#898989"}}>Rating:</span> 4.5</p></div>
                  <div style={{display:"inline-block", float:"right"}}>
                    {console.log(this.props.student.id)}
                    <Button width="129px" height="50px" clicked={()=>{updatestatus("Reject")}} style={rejectstyle}>Reject</Button>
                    <Button width="129px" height="50px" clicked={()=>{updatestatus("Hire")}} primary={this.props.student.status=="Hire"}>Hire</Button>
                  </div>
                </div>
              </div>
            </div>
    )
}
}

Profile.contextType = StudentsContext;

export default Profile
