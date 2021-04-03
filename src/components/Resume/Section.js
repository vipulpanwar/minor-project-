import React from 'react';
import './Resume.css';
import SectionTile from './SectionTile.js'
import moment from 'moment';

export default  (props)=>{
    return(
          <div>
              <hr />
            <div className="section-container">
              <p className="section-title"> {props.type} </p>
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
  let degrees = Object.keys(student);
  let education = {}
  for(degrees in student){
    education[degrees] = {
      'title': `${[degrees]} - ${student[degrees].percent}`,
      'subTitle': `${student[degrees].clg_board} • ${student[degrees].year}`
    }
  }

  return education;
}

const mapExperienceToInfo = (exp)=>{
  return Object.keys(exp).map(key=>({
    'title':exp[key].title,
    'subTitle': `${exp[key].company} • ${exp[key].type}`,
    'subTitle2': ` | ${formatDate(exp[key]?.startdate)} - ${formatDate(exp[key]?.enddate)}`,
    'description': exp[key].desc,
  }))
}

const mapProjectToInfo = (project)=>{
  return Object.keys(project).map(key=>({
    'title':project[key].name,
    'link': project[key].link,
    // 'subTitle2': `${formatDate(project[name].durationStartTime)} - ${ project[name].durationEndTime ? formatDate(project[name].durationEndTime): null}`,
    'description': project[key].desc,
  }))
}

const mapCourseToInfo = (course)=>{
  return Object.keys(course).map(key=>({
    'title':course[key].name,
    // 'link': course[key].courseLink,
    // 'subTitle2': `${formatDate(course[name].timestamp)}`,
    'description': course[key].desc,
  }))
}

const mapAccomplishmentToInfo = (accomplishment)=>{
  return Object.keys(accomplishment).map(key=>({
    'title':accomplishment[key].name,
    // 'subTitle2': `${formatDate(accomplishment[name].achievementDate)}`,
    'description': accomplishment[key].desc,
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
