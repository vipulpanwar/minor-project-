import React, {useEffect, useRef, useState} from 'react';
import styles from './Dropdown.module.css'
import SearchIcon from '../../../../assets/icons/search.svg';
import ExpandMoreIcon from '../../../../assets/icons/expand_more.svg';
import { CSSTransition } from 'react-transition-group';
import { Fragment } from 'react';

const Dropdown =(props)=>{

    let DropdownRef = useRef(null);
    let [options, setOptions] = useState(props.options);
    let [search, setSearch] = useState("");
    let [show, setShow] = useState(false);

    const multiSelect = props.multi;
    const selected = props.value;
    const allSelected = selected.length== options.length?true:false;

    const setSelected=(val)=>{
        props.inputHandler({target:{value:val}})
    }

    useEffect(()=>{
        let query =search.toLowerCase();
        let filteredOptions = props.options.filter(option=> `${option}`.toLowerCase().includes(query));
        setOptions(filteredOptions);
    },[props.options])

    useEffect(()=>{
        const checkClickOutside= (e)=>{
            if(DropdownRef.current && !DropdownRef.current.contains(e.target))
                setShow(false);
        };
        document.addEventListener('mousedown', checkClickOutside);

        return ()=>{
            document.removeEventListener('mousedown', checkClickOutside)
        }
    },[DropdownRef]);

    const searchHandler = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        let query =e.target.value.toLowerCase();
        let filteredOptions = props.options.filter(option=> `${option}`.toLowerCase().includes(query));
        setOptions(filteredOptions);
        setSearch(e.target.value);
    }

    const toggleDropdown = (e)=>{
        e?.preventDefault();
        setShow(!show);
    }

    const inputHandler =(e,value)=>{
        e.preventDefault();
        e.stopPropagation();
        if(multiSelect){
            let newSelected= [...selected];
            let index = selected.findIndex(op=>op == value);

            if(index>=0)
                newSelected.splice(index, 1);
            else
                newSelected.push(value);

           setSelected(newSelected)
        }
        else{
            setSelected(value);
            toggleDropdown();
        }
    }

    const onKeyPressHandler = (e,value)=>{
        console.log(e)
        if(e.keyCode ==13){
            inputHandler(e, value);
        }
    }

    const selectAllHandler = (e)=>{
        let newSelected= [];
        e.preventDefault();
        e.stopPropagation();
        if(!allSelected){
            newSelected = [...props.options];
        }
        setSelected(newSelected)
    }
    let menu = (
        <CSSTransition timeout={250} unmountOnExit in={show} classNames={{
            enter:styles.DropdownMenuEnter,
            enterActive:styles.DropdownMenuEnterActive,
            exit:styles.DropdownMenuExit,
            exitActive:styles.DropdownMenuExitActive,
        }}>
        <div className={styles.DropdownMenu}>
            <div className={styles.DropdownMenuContent}>
                <label className={styles.SearchInputDiv}>
                    <input placeholder="Search" className={styles.SearchInput} type="text" name="" value={search} onClick={searchHandler} onInput={searchHandler}/>
                    <img src={SearchIcon} className={styles.SearchIcon}/>
                </label>

                <div className={styles.OptionList}>
                    {options.length     
                        ?   <Fragment>
                                { multiSelect && !search? <Option multi selected={allSelected} clicked={selectAllHandler} option={"Select All"}/>:null}
                                {options.map((option,i)=><Option multi={multiSelect} key={i} selected={(!multiSelect && selected==option) || (multiSelect && selected.includes(option))} option={option} onKeyHandler={onKeyPressHandler} clicked={inputHandler}/>)}
                            </Fragment>  
                        :   <span className={styles.NoOptions}>No Options Available</span>
                    }                
                </div>
            </div>

        </div>
        </CSSTransition>
    )
    return (
        <div ref={DropdownRef} className={[props.className, styles.Dropdown].join(" ")} onClick={toggleDropdown} >
            <img className={styles.MoreIcon} src={ExpandMoreIcon}/>
            {multiSelect ? `${selected.length} Selected`: `${selected}` || "Select"}
            {menu}
        </div>
    )}

const Option = (props)=>(
    <div tabIndex={0} 
        onKeyUp={(e)=>props.onKeyHandler(e, props.option)}
        className={[styles.Option, props.selected && !props.multi ? styles.Selected : null].join(" ")}
        onClick={(e)=>props.clicked(e,props.option)} >

        {props.multi?<input onChange={()=>{}} type="checkbox" checked={props.selected}/>:null}
        <span>{props.option}</span>
    </div>
)



export default Dropdown;