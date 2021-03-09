import React, { createRef, Fragment} from 'react';
import {connect} from 'react-redux';

import './home.css';
import Card from './Card.js';
import LeftArrow from './images/leftArrow.svg';
import RightArrow from './images/rightArrow.svg';
import { CSSTransition } from 'react-transition-group';



class Slider extends React.Component{
  
  // flag = 0;
  // no_of_cards = 10;

  // state = {
  //   no_of_cards: 0,
  //   left: 0,
  //   right: 1,
  //   translate: 0,
  //   cards_in_window: 3,
  //   width_of_window: window.innerWidth,
  // }


  // constructor(props){
  //   super(props);
  //   this.listRef = createRef();
  // };

  // componentDidMount(){
  //   this.setState({no_of_cards: this.props.jobsState?.jobs?.length})
  //   if(this.state.width_of_window>1600){
  //     this.setState({cards_in_window:4});
  //     console.log(this.state.width_of_window);
  //   }
  //   this.buttonChecker();
  //   window.addEventListener('resize', this.updateDimensions);
  //   this.updateDimensions = this.updateDimensions.bind(this)
  // }

  // updateDimensions = () =>{
  //   this.setState({width_of_window:window.innerWidth})
  // }

  // buttonChecker(){
  //   console.log(this.state.no_of_cards)
  // }

  // Leftscroll =() => {
  //   if(this.state.no_of_cards==this.state.cards_in_window+1){
  //     this.listRef.current.scrollLeft -= 1000;
  //   }
  //   else if(this.flag==this.state.no_of_cards-this.state.cards_in_window){
  //     this.listRef.current.scrollLeft -= 100;
  //   }
  //   else if (this.flag==1) {
  //     this.listRef.current.scrollLeft -= 1000 ;

  //   }
  //   else{
  //     this.listRef.current.scrollLeft -= 395;
  //   }
  //   this.flag--;
  //   // console.log(this.flag);
  //   this.setState({right:1})

  //   if(this.flag<1){
  //     this.setState({left:0})
  //   }
  // };

  // Rightscroll =() => {
  //   if(this.state.no_of_cards==this.state.cards_in_window+1){
  //     this.listRef.current.scrollLeft += 1000;
  //   }
  //   else if(this.flag==0){
  //     this.listRef.current.scrollLeft += 300;
  //   }
  //   else{
  //     this.listRef.current.scrollLeft += 395;
  //   }
  //   this.flag++;
  //   console.log(this.flag, this.listRef.current.scrollLeft);
  //   this.setState({left:1})

  //   if(this.flag>=this.state.no_of_cards-this.state.cards_in_window){
  //     this.setState({right:0})
  //   }
  //   console.log(this.state.no_of_cards)
  // };

  // noButton(){
  //   this.setState({right:0})
  // };

    
    state={
        showRightButton:false,
        showLeftButton:false,
    }

    innerFlexRef = createRef();
    outerFlexRef = createRef();

    checkButtons = ()=>{
        let innerFlexRect = this.innerFlexRef.current.getBoundingClientRect();
        let outerFlexRect = this.outerFlexRef.current.getBoundingClientRect();
        let showLeftButton = false, showRightButton = false;

        if(innerFlexRect.x < outerFlexRect.x)
            showLeftButton=true;
        if(innerFlexRect.right > outerFlexRect.right)
            showRightButton=true

        if(this.state.showLeftButton != showLeftButton 
            || this.state.showRightButton != showRightButton )
            this.setState({showLeftButton, showRightButton})
    }

    Leftscroll = ()=>{
        this.outerFlexRef.current.scrollLeft -= 393; // roughly 393px
    }
    Rightscroll = ()=>{
        this.outerFlexRef.current.scrollLeft += 393;
    }

    componentDidMount(){
        this.checkButtons();
        this.outerFlexRef.current.addEventListener('scroll', this.checkButtons);
    }

    componentDidUpdate (){
        this.checkButtons();
    }

    render(){
        return(
          
            <div className="middle-container slide-container" ref={this.outerFlexRef}>
              <CSSTransition appear unmountOnExit in={this.state.showLeftButton} timeout={100} classNames="button">

                <button onClick={this.Leftscroll} className="slider-button left-arrow">
                  <img width='12.5px' src={LeftArrow}/>
                </button>
              </CSSTransition>

              <div className='items-container' ref={this.innerFlexRef}>
                {cardList(this.props.jobsState.jobs)}
              </div>

              <CSSTransition appear unmountOnExit in={this.state.showRightButton} timeout={100} classNames="button">
                <button onClick={this.Rightscroll} className="slider-button right-arrow">
                  <img width='12.5px' src={RightArrow}/>
                </button>
              </CSSTransition>
        </div>);
    }
}

const cardList = (jobsList)=>{
  return jobsList.map(job=>(
    <Fragment key={job.id}>
      <Card  className="single-item" job={job}/>
    </Fragment>))
}

const mapStateToProps = (state)=>({
  jobsState: state.jobs
})

export default connect(mapStateToProps, null) (Slider);
