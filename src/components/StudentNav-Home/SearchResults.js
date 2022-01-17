import React from 'react'
import SearchInput from './SearchInput';
import StudentList from './StudentList';
import styles from './SearchResults.module.css';

function SearchResults() {
    return (
        <div>
            <SearchInput/>
            <StudentList/>
        </div>
    )
}

export default SearchResults
