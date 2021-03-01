import React, { Component } from 'react';
import styles from './SearchBar.module.css';
import Button from '../shared/ui/Button/Button';
import filterIcon from '../../assets/icons/filter.svg';
import {StudentsContext} from './StudentsContext';
import { Search } from '../../store/actions/jobs';

class SearchBar extends Component{

    searchInputHandler=(e)=>{
        let search = e.target.value;
        this.context.setSearch(search);
    }

    render(){
        return(<div className={styles.SearchRow}>
            <input onInput={this.searchInputHandler} className={styles.SearchInput} type="Text" placeholder="Search by name"/>
            <Button clicked={this.props.filterToggle} width="unset" style={{marginLeft:20, padding:21, borderColor:'#D3D5DB'}}>
                <img className={styles.Icon} src={filterIcon}></img>
            </Button>
        </div>)
    }
}

SearchBar.contextType = StudentsContext;

export default SearchBar;