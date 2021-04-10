import React, {Component, createRef} from 'react';
import SkillTag from '../Resume/SkillTag';
import { CreateToast } from '../../store/actions/alert';
import { connect } from 'react-redux';
import './Filter.css';

class FilterMultiTag extends Component{
    takeInput = (e)=>{
        e.preventDefault();
        if(!this.state.takeInput) {
            this.props.createToast({message:"Can not search for more than 10 tags at a time", code:"success2"});
        }
        else{
            let newSkills = this.state.skills;
            console.log(e.target.parentElement[0].value);
            if(!newSkills.includes(e.target.parentElement[0].value.toLowerCase())){
                newSkills.push(e.target.parentElement[0].value.toLowerCase());
                let takeInput = true
                if(newSkills.length>9){
                    takeInput = false
                }
                this.setState({skills:newSkills, takeInput:takeInput})
                console.log("state updated");
                this.props.inputHandler(newSkills);
            }
        }
        e.target.parentElement[0].value=''
    }

    tagRemover = (tag)=>{
        let array = this.state.skills
        array.splice(array.indexOf(tag), 1);
        console.log(array.indexOf(tag), tag)
        let takeInput = this.state.takeInput
        if(!takeInput) takeInput = true
        this.setState({skills:array, takeInput: takeInput});
    }

    mapTags = ()=>{
            return this.state.skills.map(tag=><SkillTag style={{margin:'auto', marginBottom:'5px', marginRight:'5px' ,}} func={this.tagRemover} multi key={tag} skill={tag} level="silver" />)
    }

    state = {
        skills : [],
        takeInput: true,
    }

    render(){
    return (<div className="filter-tag-container" style={{minHeight:'40px', width:'100%', paddingRight:0}}>
        {this.props.name}
        <div className = 'filter-input-field-multi'>
            <div style={{maxWidth:'55%', float:'left', marginTop:'-4px'}}>
                {this.mapTags()}
            </div>
            
            <form style={{verticalAlign:'middle'}} ref={this.myref}>
                <input className='searchTagInput' type="Text" placeholder="Search Tags"/>
                <button style={{display:'none'}} type="submit" onClick={this.takeInput}>submit</button>
            </form>
        </div>
    </div>)
}
}

const mapDispatchToProps = (dispatch)=>({
    createToast: (toast)=>dispatch(CreateToast(toast))
})

export default connect(null, mapDispatchToProps)(FilterMultiTag)