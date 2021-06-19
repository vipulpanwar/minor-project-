import styles from './tagsearch.module.css'
import { StudentsContext } from "./StudentsContext.js";
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
        let filters = {...context.state.filters};
        filters.flag = newTag;
        // alert(newTag)
        context.setFilters(filters);
        // context.fetchBulk(filters);
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
            <div onClick={()=>tagInputHandler('All')} className={`${styles.NavLink}`}>
                {/* <img className={styles.Icon} src={JobIcon}/> */}
                {activeLink == 0?<span style={{color:'#fff'}}>All</span>:<span>All</span>}
            </div>
                <div onClick={()=>tagInputHandler('Excellent')} className={styles.NavLink}>
                    {/* <img className={styles.Icon} src={ProfileIcon}/> */}
                    {activeLink == 1?<span style={{color:'#fff'}}>Excellent</span>:<span>Excellent</span>}
                </div>
            <div onClick={()=>tagInputHandler('Good')} className={styles.NavLink}>
                {/* <img className={styles.Icon} src={ProfileIcon}/> */}
                {activeLink == 2?<span style={{color:'#fff'}}>Good</span>:<span>Good</span>}
            </div>
            <div onClick={()=>tagInputHandler('Average')} className={styles.NavLink}>
                {/* <img className={styles.Icon} src={Plus}/> */}
                {activeLink == 3?<span style={{color:'#fff'}}>Average</span>:<span>Average</span>}
            </div>
        </div>
        <div className={styles.ActiveMarker} style={{transform: `translate(${markerPos}px)`}}>
            <div className={[markerMovingLeft? styles.MovingLeft:null,markerMovingRight? styles.MovingRight:null ].join(" ")}></div>
        </div>
    </div>)
}

export default SearchByTag;
