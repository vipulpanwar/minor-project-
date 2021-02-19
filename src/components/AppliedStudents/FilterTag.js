import React from 'react';
import './Filter.css';

export default (props)=>{
    return (<div className="filter-tag-container">
        {props.name}
        <select className="filter-input-field">
          <option value="" disabled selected>All</option>
        </select>
    </div>)
}
