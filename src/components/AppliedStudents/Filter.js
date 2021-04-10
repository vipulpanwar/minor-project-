import React, { Component } from 'react';
import './Filter.css';
import X from '../../assets/icons/x.svg';
import FilterTag from './FilterTag.js';
import FilterMultiTag from './FilterMultiTag.js';
import Button from '../shared/ui/Button/Button.js';
import {connect} from 'react-redux';
import { ApplyFilters as ApplyFiltersAction} from '../../store/actions/jobs';
import SkillInput from '../shared/Skills/SkillInput';
import {InputLabel} from '../shared/ui/Input/Input';
import {StudentsContext} from './StudentsContext';
import {db} from '../../firebase'
import { Fragment } from 'react';
import { CreateToast } from '../../store/actions/alert';

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
        selectedCollegeData : this.context.state.filters.selectedCollegeData,
        skillValue: this.context.state.filters.skillValue,
        degreeOptions: [...options.degreeOptions],
        branchOptions: [...options.branchOptions],
        collegeOptions: [...options.collegeOptions],
        courseOptions: [...options.courseOptions],
      })
      // let colleges = []
    //   let collegesDocs = await db.collection('clginfo').get();
    //   collegesDocs.forEach(collegeDoc=>{
    //     let college = collegeDoc.data();
    //     college.id = collegeDoc.id;
    //     colleges.push(college);
    //     console.log(college);
    // });
    // this.setState({
    //   collegeData: colleges
    // })
    // this.getCollegeOptions()
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

  getDegreeOptions= async (selectedCol)=>{
    if(selectedCol!="All"){
      let college = await this.context.getDegrees(selectedCol)
      let degrees = Object.keys(college.edu)
      degrees.unshift('All')
      this.setState({degreeOptions: degrees, selectedCollegeData: college})
      console.log(degrees, 'degrees')
      // console.log(college, "College in filters")
    }
  }

  getCourseOptions=(selectedDegree)=>{
    if(selectedDegree!='All'){
      let coursesDocs = this.state.selectedCollegeData.edu[selectedDegree]
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

      let courseDocs = this.state.selectedCollegeData.edu[this.state.degreeValue][selectedCourse]
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
    if(degree=="All"){
      this.setState({courseOptions:["All"], courseValue:'All', branchOptions:['All'], branchValue:'All'})
    }
  }

  courseInputHandler = (e)=>{
    let course = e.target.value;
    this.getBranchOptions(course)
    this.setState({courseValue:course})
    if(course=='All'){
      this.setState({branchOptions:["All"], branchValue: 'All'})
    }
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
    if(college == 'All'){
      this.setState({courseOptions:["All"], branchOptions:['All'], degreeOptions: ['All'], courseValue:'All', branchValue:'All', degreeValue:'All'})
    }
  }

  skillsInputHandler = (e)=>{
    if(e.target.value.length> 10){
      this.props.createToast({message:"You can't search for more than 10 skills", code:"error"})
    }
    else
    {
      this.setState({skillValue : e.target.value});
    }
  }

  applyFiltersHandler = (e)=>{
    let filters = {
      degree: this.state.degreeValue,
      course: this.state.courseValue,
      field: this.state.branchValue,
      flag: this.state.tagValue,
      collegeid: this.state.collegeValue,
      skillValue :this.state.skillValue,
      selectedCollegeData :this.state.selectedCollegeData,
    }
    let options = { 
        degreeOptions: this.state.degreeOptions,
        courseOptions: this.state.courseOptions,
        branchOptions: this.state.branchOptions,
        collegeOptions: this.state.collegeOptions,
    }
    this.context.filterfunction(filters, options)
    this.props.closeHandler()
  }

  render (){
    console.log('Filter render');
    return (<div className="filter-container">
        Filters
        <button className='close-filters-button' onClick={this.props.closeHandler}> <img src={X} width="10px" /> </button>
        <div>
          {this.props.campus && <FilterTag inputHandler={this?.collegeInputHandler} name="College" selected={this.state.collegeValue} options={this.state.collegeOptions}/>}
          {this.props.campus && <FilterTag inputHandler={this?.degreeInputHandler} name="Degree" selected={this.state.degreeValue} options={this.state.degreeOptions}/>}
          {this.props.campus && <FilterTag inputHandler={this?.courseInputHandler} name="Course" selected={this.state.courseValue} options={this.state.courseOptions}/>}
          {this.props.campus && <FilterTag inputHandler={this?.branchInputHandler} name="Branch" selected={this.state.branchValue} options={this.state.branchOptions}/>}
          {/* {this.props.campus && <FilterTag inputHandler={this?.tagInputHandler} name="Tag" selected={this.state.tagValue} options={this.state.tagOptions} />} */}
          {/* {!this.props.campus && <FilterMultiTag inputHandler={this?.skillsInputHandler} name="Skills" selected={this.state.tagValue} options={this.state.tagOptions} />} */}
          
          {!this.props.campus && <Fragment>
              <InputLabel label="Skills" style={{fontSize:14, marginTop:20}}/>
              <SkillInput value={this.state.skillValue} inputHandler={this.skillsInputHandler} />
            </Fragment>}
        </div>
        <div className="apply-filter-button-div">
          <Button clicked={this.applyFiltersHandler} primary="Primary" className="apply-filters-button" width="135px" height="50px" style={{fontSize: '14px', fontWeight: '300', letterSpacing: '-0.01em', lineHeight: '17px'}}>Apply Filters</Button>
        </div>
    </div>)
  }
}

Filter.contextType = StudentsContext;

const mapDispatchToProps = (dispatch)=>({
  createToast: (toast)=>dispatch(CreateToast(toast))
})

export default connect(null, mapDispatchToProps)(Filter)
