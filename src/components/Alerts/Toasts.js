import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import styles from './Toasts.module.css';
import cross from '../../assets/icons/cross.svg';

import { CSSTransition } from "react-transition-group";

const Toast = (props)=>{
        let [show, setShow] =useState(true)
        return (
            <CSSTransition appear unmountOnExit in={show} timeout={200} onEntered={()=> setTimeout(()=> setShow(false),2500)} onExited={props.remove} classNames={{
                enterActive: styles.ToastEnterActive,
                enter: styles.ToastEnter,
                exitActive: styles.ToastExitActive,
                exit: styles.ToastExit,
                appear: styles.ToastEnter,
                appearActive: styles.ToastEnterActive,
              }}>
                <div className={styles.Toast}>
                    <span>{props.message}</span>
                    <button onClick={()=>setShow(false)} className={styles.CrossBtn}><img className={styles.Cross} src={cross} /></button>
                </div>
            </CSSTransition>
            )
    }


class Toasts extends Component{
    render(){
        return(<div className={styles.ToastContainer}>
            {this.props.toasts.map((toast,i)=> <Toast key={i} message={toast.message} remove={()=> this.removeToasts(i)}/>)}
        </div>)
    }
}


const mapStateToProps = (state)=>({
    toasts:state.alerts.toasts,
})


export default connect(mapStateToProps,null)(Toasts)