import React from 'react';
// import './Resume.css';
import styles from './Skill.module.css';
import crossButton from '../../../assets/icons/rounded_cross.svg';

export default  (props)=>{
  var styleNames = props.level + ' ' + 'skillBox';
    return(
            <div className={[styles.Skill, props.className].join(" ")} onClick={props.crossClicked || props.clicked} >
                <p  className="skillText" style={{fontSize: props.size}}>
                    {props.skill}
                    <span style={{opacity:0.5}}>{props.count}</span>
                </p>
                {props.crossClicked && 
                    <button  className={styles.RemoveBtn}>
                        <img style={{width:'10px'}} src={crossButton}/>
                    </button>
                }
            </div>
    )
}
