import React , { createContext, useState, useEffect} from 'react';
import {connect} from 'react-redux';
export const StudentsContext = createContext();

const StudentsProviderComponent = (props) =>{
    const [filters, setFilters] = useState({degree:'All', course:'All', branch:'All'});
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        let filtersActive = filters.degree !='All' || filters.course!='All' || filters.degree !='All'  ? true: false;
        let filteredStudents = [];

        props.appliedStudents.forEach((student, i)=>{
            let select = true;
            if(filters.degree!='All' && student.degree != filters.degree )
                select = select && false;
            if(filters.course!='All' && student[student.degree].course != filters.course)
                select = select && false;
            if(filters.branch!='All' && student[student.degree].branch != filters.branch)
                select = select && false;
            if(search != "" && !student.name.toLowerCase().includes(search.toLowerCase()))
                select = select && false;
            if(select)
                filteredStudents.push(student);
        })

        setStudents(filteredStudents)
    }, [search, filters, props.appliedStudents]);

  
    let contextData = {
        setFilters,
        filters,
        search,
        setSearch,
        students,
    }

    return (
        <StudentsContext.Provider value={contextData}>
            {props.children}
            {/* {console.log('Context render')} */}
        </StudentsContext.Provider>)
    
}


const mapDispatchToProps = (dispatch)=>({
    // getJob: (id)=> dispatch(fetchJobAction(id)),
    // search:(query)=> dispatch(SearchAction),
})

const mapStateToProps = (state)=> ({
    // job: state.jobs.job,
    // loading: state.jobs.jobLoading,
    appliedStudents: state.jobs.appliedStudents,
})

export const StudentsProvider = connect(mapStateToProps, mapDispatchToProps)(StudentsProviderComponent);