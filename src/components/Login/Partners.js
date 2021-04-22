import React from 'react';
import styles from './Partners.module.css';

import uss from '../../assets/images/partners-logo/uss.png';
import adgitm from '../../assets/images/partners-logo/adgitm.jpg';
import gtbit from '../../assets/images/partners-logo/gtbit.png';
import mait from '../../assets/images/partners-logo/mait.png';
import msit from '../../assets/images/partners-logo/msit.png';
import ramjas from '../../assets/images/partners-logo/ramjas.png';
import stephen from '../../assets/images/partners-logo/st.stephen.jpg';
import tips from '../../assets/images/partners-logo/tips.png';

import trell from '../../assets/images/partners-logo/trell.png';
import byjus from '../../assets/images/partners-logo/byjus.jpg';
import doubtnut from '../../assets/images/partners-logo/doubtnut.jpg';
import genpact from '../../assets/images/partners-logo/genpact.png';
import planetspark from '../../assets/images/partners-logo/planetspark.jpg';
import paytm from '../../assets/images/partners-logo/paytm.png';
import travclan from '../../assets/images/partners-logo/travclan.jpg';
import vedantu from '../../assets/images/partners-logo/vedantu.png';








const Partners = (props)=>{
    return(<div className={styles.PartnersModal}>
        <div className={styles.TopBar}>
            <div className={styles.DotContainer}>
                <span></span><span></span><span></span>
            </div>
            <h4>Partners</h4>
        </div>
        <div className={styles.PartnersContent}>
            <p className={styles.PartnerTitle}>50+ Partnered Colleges </p>
            <div className={styles.PartnersGrid}>
                <PartnerTile name="University School of Studies" src={uss}/>
                <PartnerTile name="Trinity Institute of Professional Studies" src={tips}/>
                <PartnerTile name="Ramjas College" src={ramjas}/>
                <PartnerTile name="St. Stephen College" src={stephen}/>
                {/* <PartnerTile name="Guru Tegh Bahadur Institute of Technology" src={gtbit}/>
                <PartnerTile name="Maharaja Surajmal Institute of Technology" src={msit}/>
                <PartnerTile name="Maharaja Agrasen Institute Of Technology" src={mait}/>
                <PartnerTile name="St. Stephen College" src={stephen}/> */}
            </div>
        </div>
            
        <div className={styles.PartnersContent}>
            <p className={styles.PartnerTitle}>Our Top Recruiters</p>
            <div className={styles.PartnersGrid}>
                <PartnerTile name="Trell" src={trell}/>
                <PartnerTile name="TPaytm" src={paytm}/>
                <PartnerTile name="Byjus" src={byjus}/>
                <PartnerTile name="Vedantu" src={vedantu}/>
                {/* <PartnerTile name="Guru Tegh Bahadur Institute of Technology" src={gtbit}/>
                <PartnerTile name="Maharaja Surajmal Institute of Technology" src={msit}/>
                <PartnerTile name="Maharaja Agrasen Institute Of Technology" src={mait}/>
                <PartnerTile name="St. Stephen College" src={stephen}/> */}
            </div>
        </div>
    </div>)
}

const PartnerTile = (props)=>(
    <div className={styles.PartnerTile}>
        <img className={styles.Logo} src={props.src}/>
        <span>{props.name}</span>
    </div>  
)
    

export default Partners;

