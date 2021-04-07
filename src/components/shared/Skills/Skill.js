import React from 'react';
// import './Resume.css';
import styles from './Skill.module.css';
import crossButton from '../../../assets/icons/rounded_cross.svg';

export default  (props)=>{
  var styleNames = props.level + ' ' + 'skillBox';
    return(
            <div className={styles.Skill} onClick={props.crossClicked} >
                <p  className="skillText">
                    {props.skill}
                </p>
                {props.crossClicked && 
                    <button  className={styles.RemoveBtn}>
                        <img style={{width:'10px'}} src={crossButton}/>
                    </button>
                }
            </div>
    )
}
