import React, {Component, useState} from 'react';
import {connect} from 'react-redux';
import styles from './Toasts.module.css';
import cross from '../../assets/icons/cross.svg';
import {RemoveToast} from '../../store/actions/alert';

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
            {this.props.toasts.map((toast,i)=> <Toast key={i} message={toast.message} remove={()=> this.props.removeToast(i)}/>)}
        </div>)
    }
}


const mapStateToProps = (state)=>({
    toasts:state.alerts.toasts,
})

const mapDispatchToProps = (dispatch)=>({
    removeToast:(i)=>dispatch(RemoveToast(i))
})


export default connect(mapStateToProps,mapDispatchToProps)(Toasts)