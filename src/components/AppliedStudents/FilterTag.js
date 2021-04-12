import React from 'react';
import {Input} from '../shared/ui/Input/Input';
import './Filter.css';

export default (props)=>{
  const renderOptions= ()=>{
    if(props.options)
    return props.options.map((option, i)=><option key={i}>{option}</option>)
  }

    return (<div className="filter-tag-container">
        {/* {props.name} */}
        <Input label={props.name} value={props.value} elementConfig={{options:props.options}} elementType="dropdown" inputHandler={props.inputHandler} c/>
        {/* <select value={props.selected} onChange={props.inputHandler} className="filter-input-field">
          {renderOptions()}
        </select> */}
    </div>)
}

