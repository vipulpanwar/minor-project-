import React, {Component} from 'react';
import styles from '../Login/ErrorBox.module.css';
import { Transition } from 'react-transition-group'; 

export default class ErrorBox extends Component {
    
    state= {
        height:0
    }

    componentDidMount()
    {
        setTimeout(()=>{
            this.setState({height: document.querySelector(".ErrorBoxContent")?.offsetHeight})
        }, 0)
    }
    componentDidUpdate()
    {
        setTimeout(()=>{
            this.setState({height: document.querySelector(".ErrorBoxContent")?.offsetHeight})
        }, 0)
    }

    render()
    {
        return (
                <div className={[styles.ErrorBox, this.props.error ?styles.Active:null ].join(' ')} style= {{height: this.props.error?this.state?.height:0}}>
                    <p className="ErrorBoxContent">
                    {this.props.error}
                    </p>
                </div>)
    }
}