import React, { Component } from 'react'
import styles from "./minimumqualifications.module.css"
import xth from './images/xth.svg'
import xiith from './images/xiith.svg'
import bachelors from './images/bachelors.svg'
import masters from './images/masters.svg'

export default class Qualification extends Component {
    render() {
        return (
            <div className={styles.qualificationcontainer}>
                <div style={{alignItems:'right'}}>
                    {(this.props.degree=="xiith" || this.props.degree=='diploma') && <img src={xiith} style={{float:'left', paddingRight:'14px'}}/>}
                    {this.props.degree=="xth" && <img src={xth} style={{float:'left', paddingRight:'14px'}}/>}
                    {(this.props.degree=="bachelors" || this.props.degree=='phd') && <img src={bachelors} style={{float:'left', paddingRight:'14px'}}/>}
                    {this.props.degree=="masters" && <img src={masters} style={{float:'left', paddingRight:'14px'}}/>}
                    <div className={styles.degreeContainer}>
                        <div className={styles.degreeTitle}>{this.props.degree}</div>
                        <div className={styles.percent}>{this.props.percent}%</div>
                    </div>
                </div>
            </div>
        )
    }
}
