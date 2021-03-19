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
    education.[degrees] = {
      'title': `${[degrees]} - ${student.[degrees].percent}`,
      'subTitle': `${student.[degrees].clg_board} • ${student.[degrees].year}`
    }
  }

  return education;
}

const mapExperienceToInfo = (exp)=>{
  return Object.keys(exp).map(expName=>({
    'title':expName,
    'subTitle': `${exp.[expName].company} • ${exp.[expName].type}`,
    'subTitle2': ` | ${exp.[expName]?.startdate} - ${exp.[expName]?.enddate}`,
    'description': exp.[expName].description,
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
