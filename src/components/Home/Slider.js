import React, { createRef, Fragment} from 'react';
import {connect} from 'react-redux';

import './home.css';
import Card from './Card.js';
import LeftArrow from '../../assets/icons/leftArrow.svg';
import RightArrow from '../../assets/icons/rightArrow.svg';
import { CSSTransition } from 'react-transition-group';



class Slider extends React.Component{
    
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

        console.log(innerFlexRect.right, outerFlexRect.right);
        if(innerFlexRect.x < outerFlexRect.x)
            showLeftButton=true;
        if( 1 < innerFlexRect.right - outerFlexRect.right)
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
                {cardList(this.props.jobs)}
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
  let list = jobsList.map(job=>(
    <Fragment key={job.id}>
      <Card  className="single-item" job={job}/>
    </Fragment>))
  list.push(<Card key="new-card" newCard/>);
  return list;
}

const mapStateToProps = (state)=>({
  jobsState: state.jobs
})

export default connect(mapStateToProps, null) (Slider);
