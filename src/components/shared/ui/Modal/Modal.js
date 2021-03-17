import React, { useEffect } from 'react';
import TopBar from './TopBar';
import styles from './Modal.module.css';

const Modal = ({show, children, style, closeHandler,...props})=>{
    useEffect(()=>{
        if(show)
        document.body.style.overflow = "hidden";
        else
        document.body.style.overflow = "";
    return ()=>{
        console.log('cleanup')
            document.body.style.overflow = "";
        }
    },  [])
    if(show)
        return (
            <div>
                <div className={styles.Overlay} onClick={closeHandler}></div>
                <div className={styles.ModalContainer} onClick={closeHandler}>
                    <div onClick={e=>e.stopPropagation()} className={[styles.Modal, styles.NewScrollBar].join(' ')} style={style}>
                        {children}
                    </div>
                </div>
            </div>)
    return (null)
};

export default Modal;

const modalStyle = {
    maxWidth: 886,
    margin:'150px 0',
    top:0,
    borderRadius:14,
    transform:"translateX(-50%)",
    position:'relative',
    background:'transparent'
}

export const ModalWithHeader = (props)=>{
    if(props.maxWidth)
    modalStyle['maxWidth'] =props.maxWidth;
    return (
    <Modal style={{...modalStyle}} {...props}>
        <TopBar title={props.title} close={props.closeHandler}/>
        {props.children}
    </Modal>)
}