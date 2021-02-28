import React from 'react';
import './Resume.css';
import SectionTile from './SectionTile.js'
import moment from 'moment';

export default  (props)=>{
    return(
          <div>
              <hr />
            <div className="section-container">
              { props.data? mapDataToSectionTile(props.data, props.type) : null     }
            </div>
            </div>
    )
}



const mapDataToSectionTile = (data, type)=>{
  let Info;
  switch(type){
    case 'Experience':
      Info = mapExperienceToInfo(data);
      break;
    case 'Projects':
      Info = mapProjectToInfo(data);
      break;
    case 'Accomplishments':
      Info = mapAccomplishmentToInfo(data);
      break;
    case 'Courses':
      Info = mapCourseToInfo(data);
      break;
    case 'Education':
      Info = mapStudentToInfo(data);
      break;
  }
  return Object.keys(Info).map( (key ,i )=>(<SectionTile type={type} key={i} info={Info[key]}/>))
}

const mapStudentToInfo = (student)=>{
  let xth = {
    'title': `Xth - ${student.xthDetails.percentage}`,
    'subTitle': `${student.xthDetails.board} • ${student.xthDetails.year}`
  }, xiith ={
    'title': `XIIth - ${student.xiithDetails.percentage}`,
    'subTitle': `${student.xiithDetails.board} • ${student.xiithDetails.year}`
  }, bachelors = {
    'title': `Bachelors - ${student.bachelors.percentage}`,
    'subTitle': `${student.bachelors.college} • ${student.bachelors.year}`
  } 

  let education = {
    1:bachelors,
    2:xiith,
    3:xth,
  }

  if(student.degree=="masters")
    education[0] = {
      'title': `Masters - ${student.masters.percentage}`,
      'subTitle': `${student.masters.college} • ${student.masters.year}`
    } 

  return education;
}

const mapExperienceToInfo = (exp)=>{
  return Object.keys(exp).map(expName=>({
    'title':expName,
    'subTitle': `${exp[expName].company} • ${exp[expName].employmentType}`,
    'subTitle2': `${formatDate(exp[expName].durationStartTime)} - ${ exp[expName].durationEndTime.seconds == 4102425000 ?'Present' :formatDate(exp[expName].durationEndTime)}`,
    'description': exp[expName].description,
  }))
}

const mapProjectToInfo = (project)=>{
  return Object.keys(project).map(name=>({
    'title':name,
    'link': project[name].projectLink,
    'subTitle2': `${formatDate(project[name].durationStartTime)} - ${ project[name].durationEndTime ? formatDate(project[name].durationEndTime): null}`,
    'description': project[name].description,
  }))
}

const mapCourseToInfo = (course)=>{
  return Object.keys(course).map(name=>({
    'title':name,
    'link': course[name].courseLink,
    'subTitle2': `${formatDate(course[name].timestamp)}`,
    'description': course[name].description,
  }))
}

const mapAccomplishmentToInfo = (accomplishment)=>{
  return Object.keys(accomplishment).map(name=>({
    'title':name,
    'subTitle2': `${formatDate(accomplishment[name].achievementDate)}`,
    'description': accomplishment[name].description,
  }))
}
const formatDate = (timestamp)=>{
  var t = new Date(1970, 0, 1);
  let dateTime = t.setSeconds(timestamp.seconds);
  if(timestamp.seconds==4102425000)
    return "Present";
  else
    // return moment(dateTime).format('Do MMM YYYY')
    return moment(dateTime).format('MMM\'YY');
    ;
}
