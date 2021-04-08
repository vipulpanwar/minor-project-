import styles from './tagsearch.module.css'
import { StudentsContext } from "./StudentsContext";
import React, {Component, useContext, useEffect,useLayoutEffect, useState} from 'react';

const SearchByTag = (props)=> {
    const context= useContext(StudentsContext)
    const [markerPos, setMarkerPos] = useState(0);
    const [markerMovingLeft,setMarkerMovingLeft] = useState(false);
    const [markerMovingRight,setMarkerMovingRight] = useState(false);
    // const [activeLink, setActiveLink]= useState(0);
    let currentFlag = context.state.filters.flag
    let activeLink = 0
    if(currentFlag=='Excellent') activeLink = 1
    if(currentFlag=='Good') activeLink = 2
    if(currentFlag=='Average') activeLink = 3 

    const tagInputHandler = (newTag) => {
        let filters = context.state.filters;
        filters.flag = newTag;
        // alert(newTag)
        context.fetchStudents(filters);
    }

    useEffect(()=>{
        HoverEnd()
    },[activeLink])

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
            <div onClick={()=>tagInputHandler('All')} onMouseEnter={()=>HoverStart(0)} onMouseLeave={HoverEnd} className={`${styles.NavLink}`}>
                {/* <img className={styles.Icon} src={JobIcon}/> */}
                <span>All</span>
            </div>
                <div onClick={()=>tagInputHandler('Excellent')} onMouseEnter={()=>HoverStart(1)} onMouseLeave={HoverEnd} className={styles.NavLink}>
                    {/* <img className={styles.Icon} src={ProfileIcon}/> */}
                    <span>Excellent</span>
                </div>
            <div onClick={()=>tagInputHandler('Good')} onMouseEnter={()=>HoverStart(2)} onMouseLeave={HoverEnd} className={styles.NavLink}>
                {/* <img className={styles.Icon} src={ProfileIcon}/> */}
                <span>Good</span>
            </div>
            <div onClick={()=>tagInputHandler('Average')} onMouseEnter={()=>HoverStart(3)} onMouseLeave={HoverEnd} className={styles.NavLink}>
                {/* <img className={styles.Icon} src={Plus}/> */}
                <span>Average</span>
            </div>
        </div>
        <div className={styles.ActiveMarker} style={{transform: `translate(${markerPos}px)`}}>
            <div className={[markerMovingLeft? styles.MovingLeft:null,markerMovingRight? styles.MovingRight:null ].join(" ")}></div>
        </div>
    </div>)
}

export default SearchByTag;
