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
var right = 1;
var left = 0;

class Home extends React.Component{

  flag = 0;
  no_of_cards = 10;

  state = {
    left: 0,
    right: 1,
  }


  constructor(){
    super();
    this.listRef = createRef();
  };

  Leftscroll =() => {
    if(flag==no_of_cards){
      this.listRef.current.scrollLeft += 280;
    }
    else{
    this.listRef.current.scrollLeft -= 395;
    }
    flag--;
    console.log(flag);
    right=1;
    if(flag<1){
      left=0;
    }
  };

  Rightscroll =() => {
    if(this.flag==0){
      this.listRef.current.scrollLeft += 280;
    }
    else{
      this.listRef.current.scrollLeft += 395;
    }
    this.flag++;
    console.log(this.flag, this.listRef.current.scrollLeft);
    this.setState({left:1})

    if(this.flag<=this.no_of_cards){
      this.setState({right:0})
    }
  };

    render(){
        return(<div className="home-container">
            <div className='top-bar'>
              <img className='logo' src= {Logo} />
              <button className='log-out' onClick={this.props.logout}>Log Out</button>
              <p className='job-postings'>Job Postings</p>
            </div>

            <div className="middle-container slide-container">
              <button onClick={this.Leftscroll} className={!this.state.left?'hidden':"slider-button left-arrow"}>
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
              <button onClick={this.Rightscroll} className={!right?'hidden':"slider-button right-arrow"}>
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
    logout : ()=> dispatch(logoutAction())
})


export default connect(null, mapDispatchToProps) (Home);
