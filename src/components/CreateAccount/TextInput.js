import React, { Component } from 'react'
import styles from './StepOne.module.css'

export default class TextInput extends Component {
    styling = {
        width: this.props.width,
        height: this.props.height,
    }

    divstyle = {
        paddingBottom:this.props.padding,
    }


    render() {
        return (
            <div className={styles.inputcontainer} style={this.divstyle}>
                <p className={styles.label}>{this.props.label}</p>
                {!this.props.textarea && <input style={this.styling} className={styles.inputbox} type="text" ></input>}
                {this.props.textarea && <textarea style={this.styling} className={styles.inputbox} type="textarea" ></textarea>}
            </div>
        )
    }
}
