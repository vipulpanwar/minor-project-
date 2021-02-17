import React, { Component } from 'react';
import styles from './SearchBar.module.css';
import Button from '../shared/ui/Button/Button';
import filterIcon from '../../assets/icons/filter.svg'

class SearchBar extends Component{
    render(){
        return(<div className={styles.SearchRow}>
            <input className={styles.SearchInput} type="Text" placeholder="Search by name"/>
            <Button width="unset" style={{marginLeft:20, padding:21}}>
                <img className={styles.Icon} src={filterIcon}></img>
            </Button>
        </div>)
    }
}

export default SearchBar;