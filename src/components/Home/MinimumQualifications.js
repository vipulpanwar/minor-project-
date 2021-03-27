import React, { Component } from 'react'
import styles from "./minimumqualifications.module.css"
import Qualification from './Qualification'

export default class MinimumQualifications extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.Title}>
                    Minimum Qualifications
                </div>
                <Qualification degree="xth" percent="90"/>
                <Qualification degree="Diploma" percent="90"/>
                <Qualification degree="Bachelors" percent="90"/>
                <Qualification degree="Masters" percent="90"/>
            </div>
        )
    }
}
