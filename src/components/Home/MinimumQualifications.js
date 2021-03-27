import React, { Component } from 'react'
import styles from "./minimumqualifications.module.css"
import Qualification from './Qualification'

export default class MinimumQualifications extends Component {
    render() {
        let Qualifications = {}
        let marks = this.props.job.marks;
        let keyNames= Object.keys(marks);
        for(let i = 0; i<keyNames.length; i++){
            let key = keyNames[i];
            let requiredMarks = marks.[key]
            if(requiredMarks.['0']){
                Qualifications.[key] = 0
            }
            else if(requiredMarks.['60']){
                Qualifications.[key] = 60
            }
            else if(requiredMarks.['70']){
                Qualifications.[key] = 70
            }
            else if(requiredMarks.['80']){
                Qualifications.[key] = 80
            }
            else{
                Qualifications.[key] = 90
            }
        }
        let QualificationsRenderer =[]
        // for(let i = 0; i< QualificationsRenderer.length; i++){
        //     QualificationsRenderer.push(<Qualification degree={Qualifications.[i]}/>)
        // }

        keyNames.forEach(keyName=>{
            QualificationsRenderer.push(<Qualification key = {keyName} degree={keyName} percent={Qualifications.[keyName]}/>)
        })
        return (
            <div className={styles.container}>
                <div className={styles.Title}>
                    Minimum Qualifications
                </div>
                {QualificationsRenderer}
            </div>
        )
    }
}
