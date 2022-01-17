import React, { Fragment, useContext, useEffect, useState} from 'react'
import styles from './SkillSlider.module.css';
import {SearchContext} from './SearchContext';


const COLORS = [
    "linear-gradient(0deg, #4C1B1A 0%, #D1322E 100%)",
    "linear-gradient(0deg, #236685 14.09%, #55B3DE 82.41%)",
    "linear-gradient(0deg, #006622 14.09%, #00B322 82.41%)"
]

function SkillSlider() {
    const {skills, setSkillPref} = useContext(SearchContext);
    console.log('rendering')
    
    const [sliderValues, setSliderValues] = useState([]);
    useEffect(()=>{
        let newSliderValues = [];
        let increment = Math.round(100 / (skills.length));
        for(let i=0; i<skills.length -1 ; i++){
            newSliderValues.push(increment*(i+1));
        }
        setSliderValues(newSliderValues);
    },[skills])

    useEffect(()=>{
        let skillPref = {};

        skills.forEach((skill, i)=>{
            let start =0, end=100;
            if(i!== 0) start = sliderValues[i-1];
            if(i !== skills.length -2) end = sliderValues[i+1];

            skillPref[skill] = (end-start)/10;
        })

        setSkillPref(skillPref)
    }, [sliderValues])

    const inputHandler = (e, i)=>{
        let min=0, max=101;
        let newSliderValues = [...sliderValues];

        if(i!== 0) min = sliderValues[i-1];
        if(i !== skills.length -2) max = sliderValues[i+1];

        let value = Number(e.target.value);
        console.log(min, max, value, i)
        if(value>=min && value<max)
        newSliderValues[i] = value;
        setSliderValues(newSliderValues);
    };


    const renderInputs = ()=> {
        let inputs = []

        for(let i=0; i<skills.length -1; i++){
            let input = <Fragment key={i}>
                <input key={`${i} input`} onInput={(e)=>inputHandler(e, i)} min="0" max="100" value={sliderValues[i] || 0} className={styles.Input} type="range"/>
                <div name={`${i} thumb`} key={`${i} thumb`}  className={styles.Thumb} style={{left: `${sliderValues[i]}%`}}></div>
            </Fragment>;
            inputs.push(input);
        }
        return inputs;
    }

    const renderTrackBg = ()=>{
        let bg = []
        let i=0;
        for(; i<skills.length ; i++){
            let start = 0;
            let end = 100;

            if(i != 0) start = sliderValues[i-1];
            if(i < skills.length-1) end = sliderValues[i];

            let width =  end - start;
            bg.push(<div key={i} className={styles.TrackBackground} style={{left:`${start}%` ,background: COLORS[i% COLORS.length], width: `${width}%`}}></div>);
        }


        return bg;
    }

    return (
        <div>
            <p>Advanced Search</p>
            <div className={styles.Slider}>
                <div className={styles.Track}>
                    {renderTrackBg()}
                </div>
                    {renderInputs()}
            </div>
        </div>
    )
}

export default SkillSlider
