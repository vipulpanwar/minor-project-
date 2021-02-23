import React, { Component } from 'react';
import './Filter.css';
import X from './images/x.svg';
import FilterTag from './FilterTag.js';
import Button from '../shared/ui/Button/Button.js';
import {connect} from 'react-redux';
import {ApplyFilters, ApplyFilters as ApplyFiltersAction} from '../../store/actions/jobs';

 class Filter extends Component{
  state= {
    degreeOptions: ['All'],
    degreeValue:'All',

    courseOptions:['All'],
    courseValue:'All',

    branchOptions:['All'],
    branchValue:'All',
  }

  componentDidMount(){
    let degreeOptions = this.getDegreeOptions();
    let courseOptions = this.getCourseOptions();
    let branchOptions = this.getBranchOptions();
    this.setState({degreeOptions, courseOptions, branchOptions});
    
  }

  getDegreeOptions=()=>{
    let degreeOptions = ['All'];
    let elCourses = this.props.eligibleCourses;
    for(let year in elCourses){
      for(let degree in elCourses[year])
        if(!degreeOptions.find(option=> option==degree))
          degreeOptions.push(degree);
    }
    return degreeOptions;
  }

  getCourseOptions=(degree)=>{
    let selectedDegree = degree || this.state.degreeValue;
    let courseOptions = ['All'];
    let elCourses = this.props.eligibleCourses;
    for(let year in elCourses){
      for(let degree in elCourses[year])
        if(degree == selectedDegree || selectedDegree == "All" )
          for(let course in elCourses[year][degree])
            if(!courseOptions.find(option=> option==course))
              courseOptions.push(course);
    }
    return courseOptions;
  }

  getBranchOptions=(course)=>{
    let selectedDegree = this.state.degreeValue;
    let selectedCourse = course || this.state.courseValue;
    let branchOptions = ['All'];
    let elCourses = this.props.eligibleCourses;

    for(let year in elCourses){
      for(let degree in elCourses[year])
        if(degree == selectedDegree || selectedDegree == "All" )
          for(let course in elCourses[year][degree])
            if(course == selectedCourse || selectedCourse == "All" )
              for(let branch of elCourses[year][degree][course])
                if(!branchOptions.find(option=> option==branch))
                  branchOptions.push(branch);
    }
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

  applyFiltersHandler = (e)=>{
    let filters = {
      degree: this.state.degreeValue,
      course: this.state.courseValue,
      branch: this.state.branchValue,
    }
    this.props.applyFilters(filters);
  }


  render (){
    return (<div className="filter-container">
        Filters
        <button className='close-filters-button' onClick={this.props.closeHandler}> <img src={X} /> </button>
        <div>
          <FilterTag inputHandler={this.degreeInputHandler} name="Degree" options={this.state.degreeOptions}/>
          <FilterTag inputHandler={this.courseInputHandler} name="Course" options={this.state.courseOptions}/>
          <FilterTag inputHandler={this.branchInputHandler} name="Branch" options={this.state.branchOptions}/>
        </div>
        <div className="apply-filter-button-div">
          <Button clicked={this.applyFiltersHandler} primary="Primary" className="apply-filters-button" width="135px" height="50px" style={{fontSize: '14px', fontWeight: '300', letterSpacing: '-0.01em', lineHeight: '17px'}}>Apply Filters</Button>
        </div>
    </div>)
  }
}

const mapStateToProps =(state)=>({
  filters: state.jobs.filters,
  filtersActive : state.jobs.filtersActive,
})

const mapDispatchToProps =(dispatch)=>({
  applyFilters: (filters)=> dispatch(ApplyFiltersAction(filters))
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
