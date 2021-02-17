import React, {useRef, createRef, Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {Logout as logoutAction} from '../../store/actions/auth';


import './home.css';
import Logo from './images/ensvee-logo.svg';
import Background1 from './background-1.svg';
import Card from './Card.js';
import LeftArrow from './images/leftArrow.svg';
import RightArrow from './images/rightArrow.svg';

var flag = 0;
var no_of_cards = 10;

class Home extends React.Component{

  constructor(){
    super();
    this.listRef = createRef();
  };

  Leftscroll =() => {
    this.listRef.current.scrollLeft -= 395;
    flag--;
  };
  Rightscroll =() => {
    if(flag==0){
      this.listRef.current.scrollLeft += 280;
    }
    else{
      this.listRef.current.scrollLeft += 395;
    }
    flag++;
    console.log(flag);
  };

    render(){
        return(<div className="home-container">
            <div className='top-bar'>
              <img className='logo' src= {Logo} />
              <button className='log-out' onClick={this.props.logout}>Log Out</button>
              <p className='job-postings'>Job Postings</p>
            </div>

            <div className="middle-container slide-container">
              <button onClick={this.Leftscroll} className={(flag==0)?'hidden':"slider-button left-arrow"}>
                <img width='12.5px' src={LeftArrow}/>
              </button>
              <div className='items-container' ref={this.listRef}>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
                <Card className='single-item'/>
              </div>
              <button onClick={this.Rightscroll} className={(flag==7)?'hidden':"slider-button right-arrow"}>
                <img width='12.5px' src={RightArrow}/>
              </button>
            </div>

            <div className='bottom-container'>
              <p className='announcement-text'>
                more features comming soon
              </p>
            </div>
        </div>);
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout : (email,password)=> dispatch(logoutAction())
})


export default connect(null, mapDispatchToProps) (Home);
