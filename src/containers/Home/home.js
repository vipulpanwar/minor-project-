import React, {useRef, Component} from 'react';
import { Link } from "react-router-dom";
import './home.css';
import Logo from './ensvee-logo.svg';
import Background1 from './background-1.svg';
import Card from './Card.js';
import LeftArrow from './leftArrow.svg';
import RightArrow from './rightArrow.svg';

class Home extends Component{
    render(){
        return(<div className="home-container">
            <div className='top-bar'>
              <img className='logo' src= {Logo} / >
              <button className='log-out'>Log Out</button>
              <p className='job-postings'>Job Postings</p>
            </div>

            <div className="middle-container slide-container">
              <button className='slider-button left-arrow'>
                <img width='100px' src={LeftArrow}/>
              </button>
              <div className='items-container'>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
              </div>
              <button className='slider-button right-arrow'>
                <img width='100px' src={RightArrow}/>
              </button>
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
