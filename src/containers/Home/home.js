import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './home.css';
import Logo from './ensvee-logo.svg';
import Background1 from './background-1.svg';
import Card from './Card.js';

class Home extends Component{
    render(){
        return(<div className="home-container">
            <div className='top-bar'>
              <img className='logo' src= {Logo} / >
              <button className='log-out'>Log Out</button>
              <p className='job-postings'>Job Postings</p>
            </div>

            <div className="middle-container">
              <Card />
              <Card />
              <Card />
            </div>

            <div className='bottom-container'>
              <div className='announcement-text'>
                more features comming soon
              </div>
            </div>
        </div>);
    }
}

export default Home;
