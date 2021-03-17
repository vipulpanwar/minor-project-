import React from 'react';
import styles from './CoursesList.module.css';
import TrashIcon from '../../assets/icons/trash.svg'

export default (props)=>{
    if(Object.keys(props.courses).length)
    return(
        <div className={styles.List}>
            {props.courses.map((course, i)=><CourseItem key={i} course={course} deleteHandler={()=>props.deleteHandler(i)}/>)}
        </div>
    )
    return null;
}

const CourseItem = (props)=>{
    return (
    <div className={styles.Tile}>
        <div className={styles.Content}>
            <p className={styles.TileTitle}>{props.course.college}</p>
            <p className={styles.TileSub}>{props.course.year} Year | {props.course.degree} | {props.course.course} | {props.course.branch} </p>
        </div>
        <button onClick={props.deleteHandler} className={styles.Delete}><img src={TrashIcon}/></button>
    </div>)

}