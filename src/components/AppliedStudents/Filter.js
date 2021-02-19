import React from 'react';
import './Filter.css';
import X from './images/x.svg';
import FilterTag from './FilterTag.js';

export default ()=>{
    return (<div className="filter-container">
        Filters
        <button className='close-filters-button'> <img src={X} /> </button>
        <div>
          <FilterTag name="Degree"/>
          <FilterTag name="Course"/>
          <FilterTag name="Branch"/>
        </div>
        <div className="apply-filter-button-div">
          <button className="apply-filters-button"> Apply Filters</button>
        </div>
    </div>)
}
