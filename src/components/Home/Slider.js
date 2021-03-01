import React, { createRef, Fragment, useEffect} from 'react';
import {connect} from 'react-redux';

import './home.css';
import Background1 from './background-1.svg';
import Card from './Card.js';
import LeftArrow from './images/leftArrow.svg';
import RightArrow from './images/rightArrow.svg';



class Slider extends React.Component{
  
  flag = 0;
  no_of_cards = 10;

  state = {
    no_of_cards: 0,
    left: 0,
    right: 1,
    translate: 0,
    cards_in_window: 3,
  }


  constructor(props){
    super(props);
    this.listRef = createRef();
  };

  componentDidMount(){
    this.setState({no_of_cards: this.props.jobsState?.jobs?.length})
    if(window.innerWidth>1400){
      this.setState({cards_in_window:4})
    }
  }

  Leftscroll =() => {
    if(this.state.no_of_cards==this.state.cards_in_window+1){
      this.listRef.current.scrollLeft -= 1000;
    }
    else if(this.flag==this.state.no_of_cards-this.state.cards_in_window){
      this.listRef.current.scrollLeft -= 100;
    }
    else if (this.flag==1) {
      this.listRef.current.scrollLeft -= 1000 ;

    }
    else{
      this.listRef.current.scrollLeft -= 395;
    }
    this.flag--;
    // console.log(this.flag);
    this.setState({right:1})

    if(this.flag<1){
      this.setState({left:0})
    }
  };

  Rightscroll =() => {
    if(this.state.no_of_cards==this.state.cards_in_window+1){
      this.listRef.current.scrollLeft += 1000;
    }
    else if(this.flag==0){
      this.listRef.current.scrollLeft += 300;
    }
    else{
      this.listRef.current.scrollLeft += 395;
    }
    this.flag++;
    console.log(this.flag, this.listRef.current.scrollLeft);
    this.setState({left:1})

    if(this.flag>=this.state.no_of_cards-this.state.cards_in_window){
      this.setState({right:0})
    }
  };

    render(){
        return(
            <div className="middle-container slide-container" ref={this.listRef}>
              <button onClick={this.Leftscroll} className={!this.state.left?'hidden':"slider-button left-arrow"}>
                <img width='12.5px' src={LeftArrow}/>
              </button>
              <div className='items-container' >
                {cardList(this.props.jobsState.jobs)}
              </div>
              <button onClick={this.Rightscroll} className={!this.state.right?'hidden':"slider-button right-arrow"}>
                <img width='12.5px' src={RightArrow}/>
              </button>
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
