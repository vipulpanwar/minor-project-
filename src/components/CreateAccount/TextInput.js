import React, { Component } from 'react'
import styles from './StepOne.module.css'

export default class TextInput extends Component {
    change = ()=>{
        console.log("change")
    }
    render() {
        let styling = {
            width: this.props.width,
            height: this.props.height,
        }
    
        let divstyle = {
            paddingBottom:this.props.padding,
        }

        if(this.props.inline){
            divstyle.display = "block";
        }
        return (
            <div className={styles.inputcontainer} style={divstyle}>
                <p className={styles.label}>{this.props.label}</p>
                {!this.props.textarea && <input style={styling} onChange={(e)=>this.props.change(e)} value={this.props.value} className={styles.inputbox} type="text" ></input>}
                {this.props.textarea && <textarea style={styling} onChange={(e)=>this.props.change(e)} value={this.props.value} className={styles.inputbox} type="textarea" ></textarea>}
            </div>
        )
    }
}
