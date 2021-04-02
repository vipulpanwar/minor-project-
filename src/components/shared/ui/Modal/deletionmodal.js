import React, { Component } from 'react'
import styles from './deletionmodal.module.css'
// import styles from './SuccessModal.module.css'
import Modal from './Modal'
import { Link } from 'react-router-dom'
import TrashCan from './images/trashcan.svg'

export default class deletionmodal extends Component {
    style={
        width: '287px',
        // height: '219px',
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
                    <img src={TrashCan} style={{width:'60px'}}/>
                    {this.props.title && <div className={styles.title}>{this.props.title}</div>}
                    <div className={styles.buttonsdiv}>
                        <div className={styles.cancelButton}>
                            <button onClick={this.props.cancel} style={{color:'#9196A5'}} className={styles.padder}>
                                Cancel
                            </button>
                        </div>
                        <div className={styles.deleteButton}>
                            <button onClick={this.props.delete} style={{color:'#FF5670'}} className={styles.padder}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>            
        )
    }
}
