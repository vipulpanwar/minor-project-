import React, { Component } from 'react'
import Modal from './Modal'
import Tick from '../../../../assets/icons/tick2.svg'
import styles from './SuccessModal2.module.css'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'

export default class Success extends Component {
    style={
        width: '300px',
        // height: '415px',
        background: '#FFFFFF',
        boxShadow: '0px 26px 24px -20px rgba(0, 0, 0, 0.25)',
        borderRadius: '14px',
        placeItems: 'center',
        display: 'grid',
        overflow:'hidden'
    }
    render() {
        return (
            <Modal show={this.props.show} closeHandler={this.props.closeHandler} style={this.style}>
                <div className={styles.Container}>
                    <img src={Tick} className={styles.Tick}/>
                    <div>
                        {this.props.title && <div className={styles.Title}>{this.props.title}</div>}
                        {this.props.subtitle && <div className={styles.Subtitle}>{this.props.subtitle}</div>}
                    </div>
                </div>
                <button className={styles.CloseBtn} onClick={this.props.closeHandler}>Close</button>
            </Modal>            
        )
    }
}
