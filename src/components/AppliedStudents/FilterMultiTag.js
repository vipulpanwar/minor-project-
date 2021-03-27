import React, {Component, createRef} from 'react';
import SkillTag from '../Resume/SkillTag';
import './Filter.css';

class FilterMultiTag extends Component{
    takeInput = (e)=>{
        e.preventDefault();
        let newSkills = this.state.skills;
        console.log(e.target.parentElement[0].value);
        newSkills.push(e.target.parentElement[0].value.toLowerCase());
        e.target.parentElement[0].value=''
        this.setState({skills:newSkills})
        console.log("state updated");
        this.props.inputHandler(newSkills);
    }

    tagRemover = (tag)=>{
        let array = this.state.skills
        array.splice(array.indexOf(tag), 1);
        console.log(array.indexOf(tag), tag)
        this.setState({skills:array});
    }

    mapTags = ()=>{
            return this.state.skills.map(tag=><SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} func={this.tagRemover} multi key={tag} skill={tag} level="silver" />)
    }

    state = {
        skills : []
    }

    render(){
    return (<div className="filter-tag-container" style={{minHeight:'40px', width:'100%', paddingRight:0}}>
        {this.props.name}
        <div className = 'filter-input-field-multi'>
            <div style={{maxWidth:'55%', float:'left', marginTop:'-4px'}}>

                {this.mapTags()}
                {/* <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} multi skill={this.state.skills[0]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} multi skill={this.state.skills[1]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[2]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[3]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[4]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[4]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[4]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[4]} level="silver" />
                <SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} skill={this.state.skills[5]} multi level="silver" /> */}
            </div>
            <div style={{verticalAlign:'middle'}}>
                <form style={{verticalAlign:'middle'}} ref={this.myref}>
                    <input className='searchTagInput' type="Text" placeholder="Search Tags"/>
                    <button style={{display:'none'}} type="submit" onClick={this.takeInput}>submit</button>
                </form>
            </div>
        </div>
    </div>)
}
}

export default FilterMultiTag