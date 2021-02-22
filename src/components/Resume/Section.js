import { Component } from "react";
import React from 'react';
import './Resume.css';
import SectionTile from './SectionTile.js'
import { Fragment } from "react";

export default  (props)=>{
    return(
            <div className="section-section">
              <p className="section-title"> {props.type} </p>
              { props.data? mapDataToSectionTile(props.data, props.type) : null     }
            </div>
    )
}

const mapDataToSectionTile = (data, type)=>{
  return Object.keys(data).map(title=>(<SectionTile type={type} key={title} title={title} info={data[title]}/>))
}