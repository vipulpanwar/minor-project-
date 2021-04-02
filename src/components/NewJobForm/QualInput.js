import React, {Component} from "react";
import {Input} from '../shared/ui/Input/Input';
import Button from '../shared/ui/Button/Button';
import styles from './QualInput.module.css';
import {db} from '../../firebase';
import CoursesList from './CoursesList';
import {InputLabel} from '../shared/ui/Input/Input'

const inputStyles={
    'fontSize':14
}


export default class QualInput extends Component{
    state= {
        collegeOptions:["Select"],
        collegeValue:'Select',

        degreeOptions:["Select"],
        degreeValue:  'Select',

        courseOptions:['Select'],
        courseValue: 'Select',

        branchOptions:['Select'],
        branchValue:  'Select',

        yearValue:'2020',
        edu:{},

        college:'usict',
    }

    componentDidMount(){(async()=>{
        
        let suggestions = (await db.collection('suggestion').doc('clg_board').get()).data().name;
        let collegeOptions = ["Select", ...suggestions];

        let degreeOptions = this.getDegreeOptions();
        let courseOptions = this.getCourseOptions();
        let branchOptions = this.getBranchOptions();

        this.setState({collegeOptions ,degreeOptions, courseOptions, branchOptions});
    })();}


    getDegreeOptions=()=>{
        let degreeOptions = ['Select'];
        let elCourses = this.props.eligibleCourses || this.state.edu;

        for(let degree in elCourses)
        if(!degreeOptions.find(option=> option==degree))
            degreeOptions.push(degree);
        
        return degreeOptions;
    }

    getCourseOptions=(degree)=>{
        let selectedDegree = degree || this.state?.degreeValue;
        let courseOptions = ['Select'];
        let elCourses = this.props.eligibleCourses|| this.state.edu;

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
        let elCourses = this.props.eligibleCourses|| this.state.edu;


            for(let degree in elCourses)
            if(degree == selectedDegree)
                for(let course in elCourses[degree])
                if(course == selectedCourse)
                    for(let branch of elCourses[degree][course])
                    if(!branchOptions.find(option=> option==branch))
                        branchOptions.push(branch);
        
        return branchOptions;
    }

    collegeInputHandler = async (e)=>{
        let college = e.target.value;
        let edu = {};

        if(college!='Select')
        {
            let collegeDocList = await db.collection('clginfo').where('name', '==', college)
                .where('verified', '==', true).get();
            if(!collegeDocList.empty){
                console.log(collegeDocList)
                collegeDocList.forEach(clgDoc=> edu = clgDoc.data()?.edu)
            }
        }

        this.setState({edu, collegeValue: college},()=>{
            let degreeOptions = this.getDegreeOptions();
            let courseOptions = this.getCourseOptions();
            let branchOptions = this.getBranchOptions();    
            this.setState({degreeOptions, courseOptions, branchOptions});        
        });
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
                <InputLabel label="9. Qualifications" validation={this.props.validation} errors={this.props.errors}/>
                <div className={styles.QualInput}>
                    <CoursesList deleteHandler={this.props.deleteHandler} courses={this.state.invitedCourses} courses={this.props.value}/>
                    <Input label="College" elementType="select" inputHandler={this.collegeInputHandler} elementConfig={{options:this.state.collegeOptions}} style={inputStyles}/>     
                    <div className={styles.FirstRow}>
                        <Input label="Degree" elementType="select" inputHandler={this.degreeInputHandler} elementConfig={{options:this.state.degreeOptions}} style={inputStyles}/>   
                        <Input label="Course" elementType="select" inputHandler={this.courseInputHandler} elementConfig={{options:this.state.courseOptions}} style={inputStyles}/>   
                        <Input label="Branch" elementType="select" inputHandler={this.branchInputHandler} elementConfig={{options:this.state.branchOptions}} style={inputStyles}/> 
                        <Input label="Graduation Year" elementType="select" inputHandler={(e)=>this.inputHandler('yearValue', e.target.value)} elementConfig={{options:["2020","2021","2022","2023","2024","2025"]}} style={inputStyles}/>     
                    </div>   
                    <Button clicked={this.inviteHandler} style={{width:"unset", marginBottom:40}} clicked={this.inviteHandler} primary>invite</Button>
                </div>
            </div>
            )
        }
}
