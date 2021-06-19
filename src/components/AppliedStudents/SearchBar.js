import React, { Component } from 'react';
import styles from './SearchBar.module.css';
import Button from '../shared/ui/Button/Button';
import filterIcon from '../../assets/icons/filter.svg';
import downloadIcon from '../../assets/icons/download-xls.svg';

import {StudentsContext} from './StudentsContext.js';
import { Search } from '../../store/actions/jobs';
import SearchByTag from './SearchByTag'

class SearchBar extends Component{

    searchInputHandler=(e)=>{
        let search = e.target.value;
        this.context.setSearch(search);
    }

    render(){
        return(<div className={styles.SearchRow}>
            <input onInput={this.searchInputHandler} className={styles.SearchInput} type="Text" placeholder="Search by Email"/>
            <SearchByTag />
            {!this.props.showHired && <Button clicked={this.props.filterToggle} width="unset" style={{marginLeft:20, padding:21, borderColor:'#D3D5DB'}}>
                <img className={styles.Icon} src={filterIcon}></img>
            </Button>}
            <Button clicked={this.props.downloadXls} width="unset" style={{marginLeft:10, padding:"0px 22px", borderColor:'#D3D5DB'}}>
                <img className={styles.Icon} src={downloadIcon}/>
            </Button>
        </div>)
    }
}

SearchBar.contextType = StudentsContext;

export default SearchBar;