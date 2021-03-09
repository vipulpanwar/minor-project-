import React from 'react';
import {  useEffect, useRef} from 'react';
import styles from './StudentCard.module.css'
import userPlaceholder from '../../assets/images/user_placeholder.jpg'
import Button from '../shared/ui/Button/Button';
import Skills from '../Resume/CompactSkills';
import {withRouter} from 'react-router-dom';


export default (props)=>{
    let cardRef = useRef(null);
    useEffect(()=>{
        var options = {
            root: null, // Page as root
            rootMargin: '0px',
            threshold: 0
          };
        //   console.log("use effect" , props.student.email);
        // Create an observer
        let observer = new IntersectionObserver(
            (e)=>{
                console.log(props.student.email , props.student.loading, props.student.loaded);
                e.forEach(entry=>{
                    if(entry.isIntersecting){
                        console.log("intersecting ", props.student.email)
                        if( props.student.email && !props.student.loading && !props.student.loaded){
                            // console.log("fetching student")
                            // console.log(props.student.email , props.student.loading, props.student.loaded)
                            props.getStudent(props.student.email)
                        }
                    } 
                })

            },
            options
        );
        
        observer.observe(cardRef.current);

        return ()=>{
            console.log('cleanup')
            observer.disconnect();
        }
    })
    return(
        // !props.student.loading?
        <div ref={cardRef} className={[styles.StudentCard, !props.student.loaded?styles.Loading:null].join(' ')}>
            <div className={styles.StudentInfo}>
                <img className={styles.StudentImage} src={ props.student.profilePicture || userPlaceholder}/>
                <StudentData student={props.student}/>
            </div>
            <Skills  oneLiner="oneLiner"  loading={!props.student.loaded} style={{margin:0, padding:0}} hardSkills={props.student.hardSkills} softSkills={props.student.softSkills}/>
        </div>
        // : <h1>Loading...</h1>
        )
}

const StudentData = withRouter((props)=>{
    let degree = props.student.degree
    return(<div className={styles.StudentData}>
        <h3 className={styles.StudentName}>{props.student.name}</h3>
        <p className={styles.StudentSubTitle}>{props.student[degree]?.branch} - {props.student[degree]?.course}</p>
        <div className={styles.RatingAndView}>
            {/* <span className={styles.Rating}>
                <span>Rating: </span>
                <span>4.5</span>
            </span> */}
            <Button clicked={()=>props.history.replace(props.location.pathname + `/student/${props.student.email}`)} style={{padding:"13px 25px", width:'unset'}}>
                View Profile
            </Button>
        </div>
    </div>)
})
