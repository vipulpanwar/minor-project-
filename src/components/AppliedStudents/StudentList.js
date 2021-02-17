import React from 'react';
import StudentCard from './StudentCard';
import styles from './StudentList.module.css';

export default ()=>{
    return(
    <div className={styles.StudentListContainer}>
        <div className={styles.StudentList}>
            <StudentCard/>
            <StudentCard/>
            <StudentCard/>
        </div>
    </div>)
}