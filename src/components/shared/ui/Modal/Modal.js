import React from "react";
import styles from './Modal.module.css';

export default ({children, style, closeHandler,...props})=>{
    return(
        <div>
            <div className={styles.Overlay} onClick={closeHandler}></div>
            <div className={styles.Modal} style={style}>
                {children}
            </div>
        </div>)
}