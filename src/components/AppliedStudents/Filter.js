import React, { Component } from 'react';
import './Filter.css';
import X from '../../assets/icons/x.svg';
import FilterTag from './FilterTag.js';
import FilterMultiTag from './FilterMultiTag.js';
import Button from '../shared/ui/Button/Button.js';
import {connect} from 'react-redux';
import { ApplyFilters as ApplyFiltersAction} from '../../store/actions/jobs';
import {StudentsContext} from './StudentsContext';
import {db} from '../../firebase'

 class Filter extends Component{

  state= {
    degreeOptions:["All"],
    degreeValue: 'All',

    courseOptions:['All'],
    courseValue: 'All',

    branchOptions:['All'],
    branchValue: 'All',

    tagOptions:['All', 'New', 'Excellent', 'Good', 'Average'],
    tagValue: 'All',

    collegeOptions:['All'],
    collegeValue: 'All',

    skillValue:[],

    collegeData:undefined,

    selectedCollegeData: {},

    coursesDocs: {},
  }

  async componentDidMount(){
    let options = this.context.state.options
      this.setState({
        degreeValue : this.context.state.filters.degree,
        courseValue : this.context.state.filters.course,
        branchValue : this.context.state.filters.field,
        tagValue : this.context.state.filters.flag,
        collegeValue : this.context.state.filters.collegeid,

        degreeOptions: options.degreeOptions,
        branchOptions: options.branchOptions,
        collegeOptions: options.collegeOptions,
        courseOptions: options.courseOptions,
      })
      let colleges = []
      let collegesDocs = await db.collection('clginfo').get();
      collegesDocs.forEach(collegeDoc=>{
        let college = collegeDoc.data();
        college.id = collegeDoc.id;
        colleges.push(college);
        console.log(college);
    });
    this.setState({
      collegeData: colleges
    })
    this.getCollegeOptions()
  }

  componentDidUpdate(){
    
  }

  getCollegeOptions=()=>{
    let collegeOptions = ['All'];
    console.log(this.state.collegeData, "coldat")
    this.state.collegeData.forEach(college=>{
      collegeOptions.push(college.id);
      console.log(collegeOptions);
    });
    this.setState({collegeOptions: collegeOptions})
  }

  getDegreeOptions=(selectedCol)=>{
    if(selectedCol!="All"){
      let collegeDocs = this.state.collegeData
      let college = {}
      collegeDocs.forEach(collegeData=>{
        if(collegeData.id==selectedCol){
          college = collegeData;
          // break;
          return 0;
        }
      });
      let degrees = Object.keys(college.edu)
      degrees.unshift('All')
      this.setState({degreeOptions: degrees, selectedCollegeData: college})
      console.log(degrees, 'degrees')
    }
  }

  getCourseOptions=(selectedDegree)=>{
    if(selectedDegree!='All'){
      let coursesDocs = this.state.selectedCollegeData.edu.[selectedDegree]
      let coursesOptions = Object.keys(coursesDocs)
      coursesOptions.unshift('All')
      console.log(coursesOptions, "collegeData")
      this.setState({
        courseOptions: coursesOptions,
        coursesDocs : coursesDocs
      })
    }
  }

  getBranchOptions=(selectedCourse)=>{
    if(selectedCourse!='All'){
      let courseDocs = this.state.coursesDocs.[selectedCourse];
      let branches = ['All']
      courseDocs.forEach(branch=>{
        branches.push(branch)
      })
      console.log(branches, "branches")
      this.setState({
        branchOptions: branches
      })
    }
  }

  degreeInputHandler = (e)=>{
    let degree = e.target.value;
    this.getCourseOptions(degree)
    this.setState({degreeValue:degree})    
  }

  courseInputHandler = (e)=>{
    let course = e.target.value;
    this.getBranchOptions(course)
    this.setState({courseValue:course})    
  }

  branchInputHandler = (e)=>{
    let branch = e.target.value;
    this.setState({branchValue:branch})    
  }
  
  tagInputHandler = (e)=>{
    let tag = e.target.value
    this.setState({tagValue: tag});
  }

  collegeInputHandler = (e)=>{
    let college = e.target.value
    this.getDegreeOptions(college)
    this.setState({collegeValue: college})
  }

  applyFiltersHandler = (e)=>{
    let filters = {
      degree: this.state.degreeValue,
      course: this.state.courseValue,
      field: this.state.branchValue,
      flag: this.state.tagValue,
      collegeid: this.state.collegeValue,
    }
    let options = { 
        degreeOptions: this.state.degreeOptions,
        courseOptions: this.state.courseOptions,
        branchOptions: this.state.branchOptions,
        collegeOptions: this.state.collegeOptions,
    }
    this.context.filterfunction(filters, options)
  }

  render (){
    console.log('Filter render');
    return (<div className="filter-container">
        Filters
        <button className='close-filters-button' onClick={this.props.closeHandler}> <img src={X} /> </button>
        <div>
          <FilterTag inputHandler={this?.collegeInputHandler} name="College" selected={this.state.collegeValue} options={this.state.collegeOptions}/>
          <FilterTag inputHandler={this?.degreeInputHandler} name="Degree" selected={this.state.degreeValue} options={this.state.degreeOptions}/>
          <FilterTag inputHandler={this?.courseInputHandler} name="Course" selected={this.state.courseValue} options={this.state.courseOptions}/>
          <FilterTag inputHandler={this?.branchInputHandler} name="Branch" selected={this.state.branchValue} options={this.state.branchOptions}/>
          <FilterTag inputHandler={this?.tagInputHandler} name="Tag" selected={this.state.tagValue} options={this.state.tagOptions} />
          <FilterMultiTag inputHandler={this?.tagInputHandler} name="Skills" selected={this.state.tagValue} options={this.state.tagOptions} />
        </div>
        <div className="apply-filter-button-div">
          <Button clicked={this.applyFiltersHandler} primary="Primary" className="apply-filters-button" width="135px" height="50px" style={{fontSize: '14px', fontWeight: '300', letterSpacing: '-0.01em', lineHeight: '17px'}}>Apply Filters</Button>
        </div>
    </div>)
  }
}

Filter.contextType = StudentsContext;

export default Filter;
