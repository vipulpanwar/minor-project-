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
        collegeOptions:[],
        collegeValue:'',

        degreeOptions:[],
        degreeValue:  '',

        courseOptions:[],
        courseValue: '',

        branchOptions:[],
        branchValue:[],

        yearValue:[],
        edu:{},

        college:'',
    }

    componentDidMount(){(async()=>{
        
        let suggestions = (await db.collection('suggestion').doc('clg_board').get()).data().name;
        let collegeOptions = [...suggestions];

        let degreeOptions = this.getDegreeOptions();
        let courseOptions = this.getCourseOptions();
        let branchOptions = this.getBranchOptions();

        this.setState({collegeOptions ,degreeOptions, courseOptions, branchOptions});
    })();}


    getDegreeOptions=()=>{
        let degreeOptions = [];
        let elCourses = this.props.eligibleCourses || this.state.edu;

        for(let degree in elCourses)
        if(!degreeOptions.find(option=> option==degree))
            degreeOptions.push(degree);
        
        return degreeOptions;
    }

    getCourseOptions=(degree)=>{
        let selectedDegree = degree || this.state?.degreeValue;
        let courseOptions = [];
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
        let branchOptions = [];
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
        console.log("college Changed", college)
        if(college)
        {
            let collegeDocList = await db.collection('clginfo').where('collegeid', '==', college)
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
            this.setState({college:e.target.value, degreeOptions, courseOptions, branchOptions, degreeValue:"", courseValue:"",branchValue:[], yearValue:[]});        
        });
    }

    degreeInputHandler = (e)=>{
        let degree = e.target.value;
        let courseOptions = this.getCourseOptions(degree);
        let branchOptions = this.getBranchOptions("Select");
        // let [branchValue, yearValue] = this.getBranchYearValue();
        this.setState({degreeValue:degree, courseOptions, courseValue:"", branchOptions:branchOptions, branchValue:[], yearValue:[]})    
    }

    courseInputHandler = (e)=>{
        let course = e.target.value;
        let branchOptions = this.getBranchOptions(course);
        let [branchValue, yearValue] = this.getBranchYearValue(course);
        this.setState({courseValue:course, branchOptions, branchValue, yearValue})       
    }

    branchInputHandler = (e)=>{
        let branch = e.target.value;
        this.setState({branchValue:branch})    
    }

    getBranchYearValue=(courseVal)=>{
        let degree = this.state.degreeValue;
        let course = courseVal|| this.state.courseValue;
        let selected = this.props.value;
        let selectedCourse = selected.find(sel=> sel.course== course && sel.degree == degree && sel.college == this.state.college);
        console.log(selectedCourse, "selected Course", this.props.value)
        return [selectedCourse?.branch || [], selectedCourse?.year || []]
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
        if(!invited.degree || !invited.college || !invited.branch.length || !invited.year.length || !invited.course)
        return;
        
        this.props.inviteHandler(invited)
    }


    render(){
        return(
            <div>
                <InputLabel label="9. Qualifications" validation={this.props.validation} errors={this.props.errors}/>
                <div className={styles.QualInput}>
                    <CoursesList deleteHandler={this.props.deleteHandler} courses={this.state.invitedCourses} courses={this.props.value}/>
                    <Input label="College" value={this.state.collegeValue} elementType="dropdown" inputHandler={this.collegeInputHandler} elementConfig={{options:this.state.collegeOptions}} style={inputStyles}/>     
                    <div className={styles.FirstRow}>
                        <Input value={this.state.degreeValue} label="Degree" elementType="dropdown" inputHandler={this.degreeInputHandler} elementConfig={{options:this.state.degreeOptions}} style={inputStyles}/>   
                        <Input value={this.state.courseValue} label="Course" elementType="dropdown" inputHandler={this.courseInputHandler} elementConfig={{options:this.state.courseOptions}} style={inputStyles}/>   
                        <Input value={this.state.branchValue} label="Branch" elementType="dropdown" inputHandler={this.branchInputHandler} elementConfig={{options:this.state.branchOptions, multi:true}} style={inputStyles}/> 
                        <Input value={this.state.yearValue} label="Graduation Year" elementType="dropdown" inputHandler={(e)=>this.inputHandler('yearValue', e.target.value)} elementConfig={{options:["2020","2021","2022","2023","2024","2025"], multi:true}} style={inputStyles}/>     
                    </div>   
                    <Button clicked={this.inviteHandler} style={{width:"unset", marginBottom:40}} clicked={this.inviteHandler} primary>invite</Button>
                </div>
            </div>
            )
        }
}
