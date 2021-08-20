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
    // let branches = props.course.branch.reduce((str, branch)=>str+ branch+", " ,"");
    // branches = branches.slice(0, branches.length -2);
    let years = props.course.year.reduce((str, year)=>str+ year+", " ,"");
    years = years.slice(0, years.length -2)
    return (
    <div className={styles.Tile}>
        <div className={styles.Content}>
            <p className={styles.TileTitle}>{props.course.college}</p>
            <p className={styles.TileSub}>{years} Year | {props.course.degree} | {props.course.course} </p>
        </div>
        {!props.course.fromDb?<button onClick={props.deleteHandler} className={styles.Delete}><img src={TrashIcon}/></button>:null}
    </div>)

}