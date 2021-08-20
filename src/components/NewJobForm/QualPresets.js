import React, { useEffect, useState } from 'react';
import styles from './QualPresets.module.css';
import {db} from '../../firebase';

const QualPresets = (props)=>{

    const [presets, setPresets] = useState([]);

    useEffect(()=>{
        db.collection('qualification_presets').get()
        .then(docs=>{
            let newPresets = docs.docs.map(doc=> ({...doc.data(),selected : false}));
            setPresets(newPresets);
        })

    }, [])

    useEffect(()=>{
        props.setQual([]);
        props.addPreset(presets.filter(preset=> preset.selected))
        
    },[presets])

    const onClickHandler = (i)=>{
        let newPresets = [...presets];
        let preset = newPresets[i];
        newPresets[i] = {...preset, selected: !preset.selected};
        setPresets(newPresets); 
    }

    return (
        <div className={styles.QualPresets}>
            <p className={styles.PresetHeader}>Presets</p>
            <div className={styles.PresetList}>
                {presets.length === 0 ?
                    <p className={styles.NoPresets}>No presets available</p>
                :null }
                {presets.map((preset, i)=> <Preset key={i} clicked={()=> onClickHandler(i)} {...preset}/>)}
            </div>

        </div>
    )    
}

const Preset = (props)=>{
    return (
    <div className={`${styles.Preset} ${ props.selected && styles.PresetSelected}`} onClick={props.clicked}>
        <h4 className={styles.Title}>{props.name}</h4>
        <p className={styles.Subtitle}>{props.desc}</p>
    </div>)
}

export default QualPresets;