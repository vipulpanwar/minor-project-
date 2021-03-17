import React from 'react';
// import './Resume.css';
import X from '../../../../assets/icons/x.svg'

const topBarStyle={
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  padding: '18px 30px',
  background: '#232D4C',

  borderRadius: '14px 14px 0px 0px',
  
}

export default  (props)=>{
    return(
            <div style={topBarStyle}>
              <span style={{color:'#fff'}}>{props.title}</span>
              <button onClick={props.close} style={{width:20, height:20, backgroundColor: '#FF5670', borderRadius: '100%'}}>
                <img src={X} style={{ marginLeft: 0.8, width: 8}}/>
              </button>
            </div>
    )
}
