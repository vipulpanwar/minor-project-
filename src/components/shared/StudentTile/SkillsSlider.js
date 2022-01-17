import React, { useEffect, useRef, useState } from 'react';
import styles from './SkillsSlider.module.css';

const SkillsSlider =(props)=>{
    const [scroll, setScroll] = useState(0);
    const [showLeft, setShowLeft] =useState(false);
    const [showRight, setShowRight] =useState(true);
    const contentRef = useRef(null);
    const wraperRef = useRef(null);

    const rightClickHandler = (e)=>{
        setScroll((state)=> state - 300);
    }
    const leftClickHandler = e =>{
        setScroll((state)=> state + 300);
    }

    useEffect(()=>{
        if(scroll >= 0)  setShowLeft(false)
        else setShowLeft(true)
        
        if(contentRef.current.offsetWidth <= -scroll + wraperRef.current.offsetWidth) setShowRight(false)
        else setShowRight(true)
    }, [scroll])

    let classes = [styles.SkillsSlider];
    if(showLeft) classes.push(styles.LeftVisible);
    if(showRight) classes.push(styles.RightVisible);
    return (
        <div className={ classes.join(" ") }>
            <div ref={wraperRef} className={styles.ContentWraper}>
                <div ref={contentRef} className={styles.SliderContent} style={{transform:`translateX(${scroll}px)`}}>
                    <Skill>UI</Skill>
                    <Skill>Skill1sj j dfk ndl jf d </Skill>
                    <Skill>Skill1 dfkdlkjl</Skill>
                    <Skill>Skill1 dfdjlkf  df</Skill>
                    <Skill>Skill1 dfjdlk </Skill>
                    <Skill>Skill1 dfk d</Skill>
                    <Skill>Skill1dfkd; </Skill>
                    <Skill>Skill1 dfkd;</Skill>
                    <Skill>Skill1</Skill>
                </div>
            </div>
            { showLeft && <button onClick={leftClickHandler} className={styles.LeftBtn}>{"<"}</button>}
            { showRight && <button onClick={rightClickHandler} className={styles.RightBtn}>{">"}</button>}
        </div>
    )
}

const Skill = (props)=>{
    return(<span className={styles.Skill}>{props.children}</span>)
}

export default SkillsSlider;