import React, { useEffect, useRef, useState } from 'react';
import TopBar from './TopBar';
import styles from './Modal.module.css';

const Modal = ({show, children, style, closeHandler,...props})=>{
    const [drag, setDrag] = useState(false)
    const modalContainerRef = useRef(null);
    const mouseDownHandler= (event)=>{
        console.log(event, event.clientX >= document.documentElement.offsetWidth, event.clientX , document.documentElement.offsetWidth );
        if(event.clientX >= modalContainerRef.current.scrollWidth)
        // alert('vertical scrollbar clicked');
        setDrag(true)
        else
            setDrag(false);
    }

    const mouseMoveHandler = (e)=>{
        setDrag(true)
    }

    const mouseUpHandler = (e)=>{
        if(!drag)
        closeHandler();
    }


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
                <div className={styles.Overlay} onMouseDown={mouseDownHandler} onMouseMove={mouseMoveHandler} onMouseUp={mouseUpHandler}></div>
                <div className={styles.ModalContainer} ref={modalContainerRef} onMouseDown={mouseDownHandler} onMouseMove={mouseMoveHandler} onMouseUp={mouseUpHandler}>
                    <div onMouseUp={e=>e.stopPropagation()} className={[styles.Modal, styles.NewScrollBar].join(' ')} style={style}>
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