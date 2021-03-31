import React, { Component } from 'react'
import styles from "./minimumqualifications.module.css"
import Qualification from './Qualification'
import Skills from '../Resume/Skills'

export default class MinimumQualifications extends Component {
    render() {
        let Qualifications = {}
        let QualificationsRenderer =[]

        if(this.props.job.marks){
            let marks = this.props.job.marks;
            let keyNames= Object.keys(marks);
            for(let i = 0; i<keyNames.length; i++){
                let key = keyNames[i];
                let requiredMarks = marks[key]
                if(requiredMarks['0']){
                    Qualifications[key] = 0
                }
                else if(requiredMarks['60']){
                    Qualifications[key] = 60
                }
                else if(requiredMarks['70']){
                    Qualifications[key] = 70
                }
                else if(requiredMarks['80']){
                    Qualifications[key] = 80
                }
                else{
                    Qualifications[key] = 90
                }
            }

            keyNames.forEach(keyName=>{
                QualificationsRenderer.push(<Qualification key = {keyName} degree={keyName} percent={Qualifications[keyName]}/>)
            })
        }    

        let hskills = {}
        let sskills = {}

        if(this.props.job.hskills){
            this.props.job?.hskills.forEach(key=>{hskills[key] = true})
        }
        if(this.props.job.sskills){
            this.props.job?.sskills.forEach(key=>{sskills[key] = true})
        }

        return (
            <div className={styles.container}>
                <div className={styles.Title}>
                    Minimum Qualifications
                </div>
                {this.props.job.campus && QualificationsRenderer}
                {!this.props.job.campus && <Skills softSkills = {sskills} hardSkills = {hskills} offcampus style={{padding:0, margin:0}}/>}
            </div>
        )
    }
}
