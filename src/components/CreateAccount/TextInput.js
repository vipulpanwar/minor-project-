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
            divstyle.width = '95%';
        }
        return (
            <div className={styles.inputcontainer} style={divstyle}>
                <p className={styles.label}>{this.props.label}</p>
                {!this.props.textarea && !this.props.value && <input style={styling} onChange={this.props.change} className={styles.inputbox} type="text" ></input>}
                {!this.props.textarea && this.props.value && <input style={styling} onChange={()=>this.change} value={this.props.value} className={styles.inputbox} type="text" ></input>}
                {this.props.textarea && this.props.value && <textarea style={styling} onChange={()=>this.change} value={this.props.value} className={styles.inputbox} type="textarea" ></textarea>}
            </div>
        )
    }
}
