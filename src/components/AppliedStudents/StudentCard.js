import React from 'react';
import { Component } from 'react';
import styles from './StudentCard.module.css'

export default ()=>{
    return(
        <div>
            <Skills/>
        </div>)
}

const Skills = ()=>{
    return(
        <div className={styles.SkillsRow}>
            <h4>Skills :</h4>
            <ul className={styles.SkillList}>
                <li>Java</li>
                <li>Android</li>
                <li>React</li>
            </ul>
        </div>

    )
}

