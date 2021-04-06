import React, { Component } from 'react'
import styles from './StepOne.module.css'
import { Input, InputLabel } from '../shared/ui/Input/Input'

export default class TextInput extends Component {
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
                {/* <p className={styles.label}><InputLabel label={this.props.label} /></p> */}
                {!this.props.textarea && <Input elementType="input" label={this.props.label} style={styling} errors={this.props.errors} inputHandler={(e)=>this.props.change(e)} value={this.props.value}></Input>}
                {this.props.textarea && <Input elementType="textarea" label={this.props.label} errors={this.props.errors} textarea style={styling} inputHandler={(e)=>this.props.change(e)} value={this.props.value}></Input>}
            </div>
        )
    }
}
