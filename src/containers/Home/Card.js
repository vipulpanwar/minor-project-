import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './home.css';
import Background1 from './background-1.svg';
import Content from './content-to-be-replaced.svg';

function Card () {
  return(
    <div className='card'>
      <br />
      <br />
      <img className='card-logo' src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" alt="google logo icon png transparent background osteopathy" />
      <br /><br /><br /><br /><br />
      <div className='card-container'>
        <img className='content-tbr' src={Content} />
      </div>
    </div>
  );
}

export default Card;
