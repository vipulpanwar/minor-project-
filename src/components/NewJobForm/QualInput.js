import React, {Component} from "react";
import {Input} from '../shared/ui/Input/Input';
import Button from '../shared/ui/Button/Button';
import styles from './QualInput.module.css';
import {db} from '../../firebase';


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

        college:'usict',

        invitedCourses:[]
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
        this.setState({degreeValue:degree, courseOptions})    
    }

    courseInputHandler = (e)=>{
        let course = e.target.value;
        let branchOptions = this.getBranchOptions(course);
        this.setState({courseValue:course, branchOptions})    
    }

    branchInputHandler = (e)=>{
        let branch = e.target.value;
        this.setState({branchValue:branch})    
    }

    inputHandler=(key, value)=>{
        this.setState({[key]:value});
    }

    inviteHandler = (e)=>{
        let filters = {
            degree: this.state.degreeValue,
            course: this.state.courseValue,
            branch: this.state.branchValue,
        }
        console.log('optoins ', this.getCourseOptions());
        // this.context.setFilters(filters,this.getCourseOptions());
    }


    render(){
    return(<div className={styles.QualInput}>
            <Input label="College" elementType="select" value={this.state.degreeValue} inputHandler={(e)=>{this.setState({degreeValue: e.target.value})}} elementConfig={{options:["usict"]}}/>     
            <div className={styles.FirstRow}>
                <Input label="Degree" elementType="select" inputHandler={this.degreeInputHandler} elementConfig={{options:this.state.degreeOptions}}/>   
                <Input label="Course" elementType="select" inputHandler={this.courseInputHandler} elementConfig={{options:this.state.courseOptions}}/>   
                <Input label="Branch" elementType="select" inputHandler={this.branchInputHandler} elementConfig={{options:this.state.branchOptions}}/> 
                <Input label="Year" elementType="select" inputHandler={(e)=>this.inputHandler('yearValue', e.target.value)} elementConfig={{options:["2020","2021","2022","2023","2024","2025"]}}/>     
            </div>   
            <Button style={{width:"unset", marginBottom:40}} clicked={this.inviteHandler} primary>invite</Button>
            <div className={styles.SecondRow}>
                <Input label="Xth Percentage" inputHandler={(e)=>this.inputHandler('xthPercentage', e.target.value)} elementConfig={{type:"number", min:0, max:100, step:10}}  elementType="input"/>   
                <Input label="XIIth Percentage" inputHandler={(e)=>this.inputHandler('xiithPercentage', e.target.value)} elementConfig={{type:"number", min:0, max:100,step:10}}  elementType="input"/>   
                <Input label="Bachelors Percentage" inputHandler={(e)=>this.inputHandler('bachelorPercentage', e.target.value)} elementConfig={{type:"number", min:0, max:100, step:10}} elementType="input"/> 
            </div> 
        </div>)
    }
}