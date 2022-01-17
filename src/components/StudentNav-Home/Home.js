import React, {useState} from 'react';
import SearchPage from './SearchPage';
import SearchContext, {SearchContextConsumer} from './SearchContext';
import SearchResults from './SearchResults';


const Home = (props)=>{
    return(
        <div>
            <h2 className="StudentNavSectionTitle">Home</h2>
            <div className="StudentNavSectionContent">
                <SearchContext>
                    <SearchContextConsumer>
                        {({students})=>{
                            if(students.length==0) return <SearchPage/>
                            else return <SearchResults/>
                        }}
                    </SearchContextConsumer>
                </SearchContext>
            </div>
        </div>
    )
}

export default Home;
