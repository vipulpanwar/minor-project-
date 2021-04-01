import React, { Component } from 'react'
import Modal from './Modal'
import Tick from './images/tick.svg'
import styles from './SuccessModal.module.css'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

export default class Success extends Component {
    style={
        width: '488px',
        height: '415px',
        background: '#FFFFFF',
        boxShadow: '0px 26px 24px -20px rgba(0, 0, 0, 0.25)',
        borderRadius: '14px',
        placeItems: 'center',
        display: 'grid',
    }
    render() {
        return (
            <Modal show = {this.props.show} style={this.style}>
                <div className={styles.container}>
                    <img src={Tick} style={{width:'150px'}}/>
                    {this.props.title && <div className={styles.title}>{this.props.title}</div>}
                    {this.props.subtitle && <div className={styles.subtitle}>{this.props.subtitle}</div>}
                    {this.props.buttonText && !this.props.link && <button className={styles.button} onClick={this.props.click}>{this.props.buttonText}</button>}
                    {this.props.buttonText && this.props.link && <Link to={this.props.link}><button className={styles.button} onClick={this.props.click}>{this.props.buttonText}</button></Link>}
                </div>
            </Modal>            
        )
    }
}
