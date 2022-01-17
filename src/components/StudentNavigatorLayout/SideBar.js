import React from 'react';
import styles from './SideBar.module.css';
import Logo from '../../assets/images/ensvee-logo-white-text.svg';
import HomeIcon from '../../assets/icons/home.svg';
import LogoutIcon from '../../assets/icons/logout.svg';

import { NavLink } from 'react-router-dom';

const SideBar = ()=>{
    return(<nav className={styles.SideBar}>
        <div className={styles.SideBarContent}>
            <img className={styles.Logo} src={Logo}></img>
            <Nav/>
            <UserDetails/>

        </div>
    </nav>)
}

export default SideBar;

const Nav = (props)=>{
    return(<div className={styles.NavList}>
        <NavItem path="/studentnav/home">Home</NavItem>
        <NavItem path="/studentnav/invites">Invites Sent</NavItem>
        <NavItem path="/studentnav/profile">Profile</NavItem>
        <div className={styles.NavItem}>
            <img src={LogoutIcon} className={styles.NavIcon}></img>
            <span>Logout</span>
        </div>
    </div>)
}

const NavItem = (props)=> {
    return (<NavLink to={props.path} className={styles.NavItem} activeClassName={styles.NavItemActive}>
        <img src={HomeIcon} className={styles.NavIcon}></img>
        <span>{props.children}</span>
    </NavLink>)
}

const UserDetails = (props)=>(
    <div className={styles.UserDetailsContainer}>
        <div className={styles.UserImgContainer}>
            <img className={styles.UserImg}/>
        </div>
        <div className={styles.UserDetails}>
            <span className={styles.Title}>Vardaan</span>
            <span className={styles.Subtitle}>Raghuvanshi</span>
        </div>
    </div>
)
