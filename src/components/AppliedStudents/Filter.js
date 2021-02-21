import React from 'react';
import './Filter.css';
import X from './images/x.svg';
import FilterTag from './FilterTag.js';
import Button from '../shared/ui/Button/Button.js';

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
          <Button primary="Primary" className="apply-filters-button" width="135px" height="50px" style={{fontSize: '14px', fontWeight: '300', letterSpacing: '-0.01em', lineHeight: '17px'}}>Apply Filters</Button>
        </div>
    </div>)
}
