import styles from './tagsearch.module.css'
import { StudentsContext } from "./StudentsContext";
import React, {Component, useEffect,useLayoutEffect, useState} from 'react';

export default class SearchByTag extends Component {
    tagInputHandler = (newTag) => {
        let filters = this.context.state.filters;
        filters.flag = newTag;
        alert(newTag)
        this.context.fetchStudents(filters);
    }
    render() {
        return (
            <div className={styles.tagcontainer}>
                <div className={styles.activeLink} onClick={()=>this.tagInputHandler('All')} style={{height:'40px', margin:'5px', padding:'10px', backgroundColor:'#fff', borderColor:'#000'}}>
                    All
                </div>
                <div className={styles.tag} onClick={()=>this.tagInputHandler('Excellent')} style={{height:'40px', margin:'5px', padding:'10px', backgroundColor:'#fff'}}>
                    Excellent
                </div>
                <div className={styles.tag} onClick={()=>this.tagInputHandler('Good')} style={{height:'40px', margin:'5px', padding:'10px', backgroundColor:'#fff'}}>
                    Good
                </div>
                <div className={styles.tag} onClick={()=>this.tagInputHandler('Average')} style={{height:'40px', margin:'5px', padding:'10px', backgroundColor:'#fff'}}>
                    Average
                </div>
            </div>
        )
    }
}

SearchByTag.contextType = StudentsContext

