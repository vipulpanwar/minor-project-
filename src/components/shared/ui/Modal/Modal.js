import React, { useEffect } from 'react';
import styles from './Modal.module.css';

export default ({show, children, style, closeHandler,...props})=>{
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
}