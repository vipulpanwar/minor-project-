import React, {useState} from 'react';
import styles from './BottomNav.module.css';
import JobIcon from '../../assets/icons/job.svg';
import ProfileIcon from '../../assets/icons/profile-icon.svg';
import Plus from '../../assets/icons/plus.svg';
import {Link} from 'react-router-dom'

const BottomNav = (props)=> {
    const [markerPos, setMarkerPos] = useState(0);
    const [markerMovingLeft,setMarkerMovingLeft] = useState(false);
    const [markerMovingRight,setMarkerMovingRight] = useState(false);
    const [activeLink, setActiveLink]= useState(0);

    const HoverStart =(i)=>{
        if(markerPos == i*100)
            return;
        
        if(markerPos > i*100)
            setMarkerMovingLeft(true);
        else
            setMarkerMovingRight(true);

        setMarkerPos(i*100);
        setTimeout(()=>{setMarkerMovingLeft(false); setMarkerMovingRight(false)}, 400)
    }

    const HoverEnd = ()=>{
        if(markerPos == activeLink*100)
        return;

        if(markerPos > activeLink * 100)
            setMarkerMovingLeft(true);
        else
            setMarkerMovingRight(true);

        setMarkerPos(activeLink*100);        
        setTimeout(()=>{setMarkerMovingLeft(false); setMarkerMovingRight(false)}, 400)
    }

    return (<div className={styles.BottomNav}>
        <div className={styles.NavLinks}>
            <div onMouseEnter={()=>HoverStart(0)} onMouseLeave={HoverEnd} className={`${styles.NavLink} ${styles.Active}`}>
                <img className={styles.Icon} src={JobIcon}/>
                <span>Jobs</span>
            </div>
            <div onMouseEnter={()=>HoverStart(1)} onMouseLeave={HoverEnd} className={styles.NavLink}>
                <img className={styles.Icon} src={ProfileIcon}/>
                <span>Help</span>
            </div>
            <Link to="/profile" onMouseEnter={()=>HoverStart(2)} onMouseLeave={HoverEnd} className={styles.NavLink}>
                <img className={styles.Icon} src={ProfileIcon}/>
                <span>Profile</span>
            </Link>
            <Link to="/new" onMouseEnter={()=>HoverStart(3)} onMouseLeave={HoverEnd} className={styles.NavLink}>
                <img className={styles.Icon} src={Plus}/>
                <span>Add Job</span>
            </Link>
        </div>
        <div className={styles.ActiveMarker} style={{transform: `translate(${markerPos}px)`}}>
            <div className={[markerMovingLeft? styles.MovingLeft:null,markerMovingRight? styles.MovingRight:null ].join(" ")}></div>
        </div>
    </div>)
}

export default BottomNav;