import React, {useState, useEffect, useContext} from 'react'
import styles from './JobProfiles.module.css';
import {db} from '../../firebase';
import {SearchContext} from './SearchContext';



function JobProfiles() {
    const [profiles, setProfiles] = useState({});
    useEffect(async ()=>{
        let profileDoc = await db.collection("suggestion").doc("job_profiles").get();
        setProfiles(profileDoc.data());
    },[])

    const {addSkill} = useContext(SearchContext);

    const renderProfiles = ()=>{
        return Object.keys(profiles).map(profile=>(
            <Tag clicked={()=> addSkill(profiles[profile])} key={profile}>{profile}</Tag>
        ))
    }
    return (
        <>
            <h3 className="GradientText">Popular Job Profiles</h3>
            <div className={styles.JobProfilesList}>
                {renderProfiles()}
                <Tag>Android Developer</Tag>
                <Tag>UI/UX Designer</Tag>
                <Tag>UI Developer</Tag>
                <Tag>UI/UX Designer</Tag>
                <Tag>Android Developer</Tag>
                <Tag>Business Developer Associate</Tag>
                <Tag>UI Developer</Tag>
            </div>
        </>
    )
}

function Tag (props){
    return (<span onClick={props.clicked} className={styles.Tag}>
        <span className={styles.TagContent}>
            {props.children}
        </span>
    </span>)
} 


export default JobProfiles
