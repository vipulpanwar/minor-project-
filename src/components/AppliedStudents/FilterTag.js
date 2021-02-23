import React from 'react';
import './Filter.css';

export default (props)=>{
  const renderOptions= ()=>{
    if(props.options)
    return props.options.map((option, i)=><option key={i}>{option}</option>)
  }

    return (<div className="filter-tag-container">
        {props.name}
        <select onChange={props.inputHandler} className="filter-input-field">
          {renderOptions()}
        </select>
    </div>)
}

