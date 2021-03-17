import React, {Component} from "react";
import {Input} from '../shared/ui/Input/Input';
import Button from '../shared/ui/Button/Button';
import styles from './QualInput.module.css';
import {db} from '../../firebase';
import CoursesList from './CoursesList';

const inputStyles={
    'fontSize':14
}

const initCollegeInfo = {
      Bachelors:{
        BTech:["CSE", "IT"],
        BCA: ["Generic"],
      },
      Masters:{
        MTech:["CSE", "IT"],
        MCA: ["Generic"],
      },
  }

export default class QualInput extends Component{
    state= {
        degreeOptions:["Select"],
        degreeValue:  'Select',

        courseOptions:['Select'],
        courseValue: 'Select',

        branchOptions:['Select'],
        branchValue:  'Select',

        yearValue:'2020',

        college:'usict',
    }

    componentDidMount(){
        let degreeOptions = this.getDegreeOptions();
        let courseOptions = this.getCourseOptions();
        let branchOptions = this.getBranchOptions();

        this.setState({degreeOptions, courseOptions, branchOptions});
    }


    getDegreeOptions=()=>{
        let degreeOptions = ['Select'];
        let elCourses = this.props.eligibleCourses || initCollegeInfo;

        for(let degree in elCourses)
        if(!degreeOptions.find(option=> option==degree))
            degreeOptions.push(degree);
        
        return degreeOptions;
    }

    getCourseOptions=(degree)=>{
        let selectedDegree = degree || this.state?.degreeValue;
        let courseOptions = ['Select'];
        let elCourses = this.props.eligibleCourses|| initCollegeInfo;

        for(let degree in elCourses)
        if(degree == selectedDegree )
            for(let course in elCourses[degree])
            if(!courseOptions.find(option=> option==course))
                courseOptions.push(course);
        
        return courseOptions;
    }

    getBranchOptions=(course)=>{
        let selectedDegree = this.state?.degreeValue;
        let selectedCourse = course || this.state?.courseValue;
        let branchOptions = ['Select'];
        let elCourses = this.props.eligibleCourses|| initCollegeInfo;


            for(let degree in elCourses)
            if(degree == selectedDegree)
                for(let course in elCourses[degree])
                if(course == selectedCourse)
                    for(let branch of elCourses[degree][course])
                    if(!branchOptions.find(option=> option==branch))
                        branchOptions.push(branch);
        
        return branchOptions;
    }

    degreeInputHandler = (e)=>{
        let degree = e.target.value;
        let courseOptions = this.getCourseOptions(degree);
        let branchOptions = this.getBranchOptions("Select");
        this.setState({degreeValue:degree, courseOptions, courseValue:"Select", branchOptions:branchOptions, branchValue:"Select"})    
    }

    courseInputHandler = (e)=>{
        let course = e.target.value;
        let branchOptions = this.getBranchOptions(course);
        this.setState({courseValue:course, branchOptions, branchValue:"Select"})    
    }

    branchInputHandler = (e)=>{
        let branch = e.target.value;
        this.setState({branchValue:branch})    
    }

    inputHandler=(key, value)=>{
        this.setState({[key]:value});
    }

    inviteHandler = (e)=>{

        let invited = {
            degree: this.state.degreeValue,
            course: this.state.courseValue,
            branch: this.state.branchValue,
            year: this.state.yearValue,
            college: this.state.college
        }

        if(!Object.keys(invited).reduce((satisfies, key)=>{
            return satisfies && invited[key] != "Select";
        },true))
        return;
        
        this.props.inviteHandler(invited)
    }


    render(){
        return(
            <div>
                <p style={{fontWeight:500, marginBottom:8}}>9. Qualifications</p>
                <div className={styles.QualInput}>
                    <CoursesList deleteHandler={this.props.deleteHandler} courses={this.state.invitedCourses} courses={this.props.value}/>
                    <Input label="College" elementType="select" value={this.state.degreeValue} inputHandler={(e)=>{this.setState({degreeValue: e.target.value})}} elementConfig={{options:["usict"]}} style={inputStyles}/>     
                    <div className={styles.FirstRow}>
                        <Input label="Degree" elementType="select" inputHandler={this.degreeInputHandler} elementConfig={{options:this.state.degreeOptions}} style={inputStyles}/>   
                        <Input label="Course" elementType="select" inputHandler={this.courseInputHandler} elementConfig={{options:this.state.courseOptions}} style={inputStyles}/>   
                        <Input label="Branch" elementType="select" inputHandler={this.branchInputHandler} elementConfig={{options:this.state.branchOptions}} style={inputStyles}/> 
                        <Input label="Year" elementType="select" inputHandler={(e)=>this.inputHandler('yearValue', e.target.value)} elementConfig={{options:["2020","2021","2022","2023","2024","2025"]}} style={inputStyles}/>     
                    </div>   
                    <Button clicked={this.inviteHandler} style={{width:"unset", marginBottom:40}} clicked={this.inviteHandler} primary>invite</Button>
                </div>
            </div>
            )
        }
}