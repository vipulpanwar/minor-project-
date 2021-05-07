import React, { useState, useEffect } from 'react';
import styles from './KebabMenu.module.css';
import { CSSTransition } from 'react-transition-group';

const KebabMenu = (props)=>{
    const [show, setShow] = useState(false)
    
    useEffect(()=>{
        const checkClick = (e)=>{
            if(show)
                setShow(false);
            console.log('checking', show)
        };
        document.addEventListener('mousedown', checkClick);
        console.log('added')
        return ()=>{
            console.log('removed')
            document.removeEventListener('mousedown', checkClick)
        }
    },[show]);

    let menu = (
        <CSSTransition timeout={250} unmountOnExit in={show} classNames={{
            enter:styles.DropdownMenuEnter,
            enterActive:styles.DropdownMenuEnterActive,
            exit:styles.DropdownMenuExit,
            exitActive:styles.DropdownMenuExitActive,
        }}>
        <div className={styles.DropdownMenu}>
            <div className={styles.DropdownMenuContent}>
                {props.children}
            </div>

        </div>
        </CSSTransition>
    )
    return(
        <div style={props.style} className={styles.KebabContainer}>
            <button onClick={()=> setShow(!show)} className={styles.Kebab}>
                <div></div>
                <div></div>
                <div></div>
            </button>
            {menu}
        </div>
    )
}

export default KebabMenu;

export const KebabOption = props=>{
    return(<button onClick={props.clicked} className={styles.Option}>{props.children}</button>)
}