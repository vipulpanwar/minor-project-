import React from 'react';
import SideBar from './SideBar';
import styles from './Layout.module.css';

const Layout = (props)=>{
    return(<div className={styles.MainContainer}>
        <SideBar/>
        <div className={styles.Main}>
            {props.children}
        </div>
    </div>)
}

export default Layout;