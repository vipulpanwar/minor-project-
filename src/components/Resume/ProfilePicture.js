import React, { createRef, useEffect, useState } from 'react';
import styles from './ProfilePicture.module.css';
import { storageURL } from "../../firebase";
import userPlaceholder from '../../assets/images/user_placeholder.jpg';

const ProfilePicture = (props)=>{
    let picturePath = encodeURIComponent(`users/${props.uid}/myphoto.png`);
    let [error, setError] = useState(false);
    let [showImage, setShowImage] = useState(false);

    useEffect(()=>{
        console.log("props changed")
        setError(false)
        setShowImage(false)

    }, [props.uid])

    return <div className={props.className}>
                <div className={`${styles.ProfilePictureContainer} `}>
                    <img src={userPlaceholder}/>
                    { !error ? <img onLoad={()=>setShowImage(true)} onError={()=>setError(true)} style={{opacity: showImage? 1 : 0 }} className={styles.ProfilePicture} src={`${storageURL}${picturePath}?alt=media`} alt="Image not found"/>:null}
                </div>
            </div>
}

export default ProfilePicture;