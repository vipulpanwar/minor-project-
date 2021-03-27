import React, { Component } from 'react'
import styles from "./minimumqualifications.module.css"
import xth from './images/xth.svg'

export default class Qualification extends Component {
    render() {
        console.log(this.props.degree)
        return (
            <div className={styles.qualificationcontainer}>
                <div style={{alignItems:'right'}}>
                    <img src={xth} style={{float:'left', paddingRight:'14px'}}/> 
                    <div className={styles.degreeContainer}>
                        <div className={styles.degreeTitle}>{this.props.degree}</div>
                        <div className={styles.percent}>{this.props.percent}%</div>
                    </div>
                </div>
            </div>
        )
    }
}
