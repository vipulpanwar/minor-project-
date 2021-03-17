import React, { Component } from 'react';
import styles from './HomeInfo.module.css';
import image from './bgimg.svg';
import ThirdBox from './ThirdBox.js'
import Button from '../shared/ui/Button/Button.js';

 class homeInfo extends Component{

  render (){
    return (<div className={styles.container} style ={{height:'554px'}}>    
        <div className={styles.header}>
            <div className = {styles.headerInner}>
                <div className = {styles.titleBox}>
                    <h1 className = {styles.title}>Android Developer</h1>
                    <p className = {styles.desc}>Full Time  |  2.3 LPA  |  12 Jan’20</p>
                </div>
                <div className = {styles.appliedBox}>
                    <span style={{display:'inline-block', marginRight: '11px'}}>42 Students Applied </span><img style = {{display:'inline-block'}} src = {image}></img>
                </div>
            </div>
        </div>
        <div className = {styles.secondaryBox}>
            <div className = {styles.categoryBox}>
                <div className = {styles.catBox}>
                    <div className = {styles.catTitle}>Job Category:</div>
                    <div className = {styles.cat}>Information Technology</div>
                </div>
                <div className = {styles.catBox}>
                    <div className = {styles.catTitle}>Job Location:</div>
                    <div className = {styles.cat}>Delhi</div>
                </div>
                <div className = {styles.catBox}>
                    <div className = {styles.catTitle}>Drive Location:</div>
                    <div className = {styles.cat}>Delhi</div>
                </div>
                <div className = {styles.catBox}>
                    <div className = {styles.catTitle}>Who Can Apply:</div>
                    <div className = {styles.cat}>Unplaced</div>
                </div>
            </div>
        </div>
        <ThirdBox />
        <div style = {{paddingLeft:"18px", paddingTop:"18px"}}>
            <div className = {styles.catTitle}>
                Schedule:
            </div>
            <div className = {styles.descpara}>
            11:00 AM - Apptitude    |    12:00 PM - GD    |    5:00 PM - PI
            </div>
        </div>
    </div>)   
  }
}

export default homeInfo;
