import React from 'react';
import './Resume.css';
import crossButton from './images/crossButton.svg'

export default  (props)=>{
  var styleNames = props.level + ' ' + 'skillBox';
    return(
            <div className={styleNames} style={props.style} >
              <p className="skillText">{props.skill}{props.multi && <button onClick = {()=>props.func(props.skill)} className='tagRemoverButton'><img style={{width:'10px'}} src={crossButton}/></button>}</p>
            </div>
    )
}
