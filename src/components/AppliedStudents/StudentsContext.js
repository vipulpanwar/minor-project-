import React , { createContext, useState, useEffect, useLayoutEffect} from 'react';
import {connect} from 'react-redux';
export const StudentsContext = createContext();

const StudentsProviderComponent = (props) =>{
    const [filters, setFilters] = useState({degree:'All', course:'All', branch:'All'});
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [courseOptions, setCoursesOptions] = useState([]);
    useLayoutEffect(()=>{
        let filtersActive = filters.degree !='All' || filters.course!='All' || filters.degree !='All'  ? true: false;
        let filteredStudents = [];

        props.appliedStudents.forEach((student, i)=>{
            let select = true;
            // if(filters.degree!='All' && student.degree != filters.degree )
            //     select = select && false;

            if(filters.degree!='All' && !courseOptions.reduce((prev, course)=>{
                    if(course=='All')
                        return prev;
                    return prev || student.appliedDocName.includes(course)
                }, false))
                select = select && false;

            if(filters.course!='All' && !student.appliedDocName.includes(filters.course) )
                select = select && false;
            if(filters.branch!='All' && !student.appliedDocName.includes(filters.branch) )
                select = select && false;
            if(search != "" && !student.name.toLowerCase().includes(search.toLowerCase()))
                select = select && false;
            if(select)
                filteredStudents.push(student);
        })

        setStudents(filteredStudents)
    }, [search, filters, props.appliedStudents]);


  
    let contextData = {
        setFilters: (filters, newCourseOptions)=>{setCoursesOptions(newCourseOptions); setFilters(filters); },
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