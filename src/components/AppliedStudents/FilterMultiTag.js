import React, {Component, createRef} from 'react';
import SkillTag from '../Resume/SkillTag';
import './Filter.css';

class FilterMultiTag extends Component{
//   renderOptions= ()=>{
//     if(props.options)
//     return props.options.map((option, i)=><option key={i}>{option}</option>)
//   }
    abc = (e)=>{
        e.preventDefault();
        let pusher = this.state.skills;
        pusher.push("Oh")
        this.setState({skills:pusher})
        console.log("state updated");
    }

    state = {
        skills : ['Hello', 'No', 'not', 'this', 'please',]
    }
    render(){
    return (<div className="filter-tag-container" style={{minHeight:'30px'}}>
        {this.props.name}
        <div className = 'filter-input-field' style={{minHeight:'30px'}}>
            <div style={{maxWidth:'60%', float:'left', marginTop:'-4px'}}>
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[0]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[1]} level="silver" />
                {/* <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[2]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[3]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[4]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[4]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[4]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[4]} level="silver" /> */}
                <SkillTag style={{margin:'auto', marginBottom:'5px',}} skill={this.state.skills[5]} level="silver" />
            </div>
            <div style={{verticalAlign:'middle'}}>
                <form style={{verticalAlign:'middle'}} ref={this.myref}>
                    <input className='searchTagInput' type="Text" placeholder="Search Tags"/>
                    <button style={{display:'none'}} type="submit" onClick={this.abc}>submit</button>
                </form>
            </div>
        </div>
    </div>)
}
}

export default FilterMultiTag