import React from "react";
import styles from "./Input.module.css";
import Dropdown from '../DropDown/Dropdown';


export const FloatingInput = ({ inputType, value, label, elementConfig, ...props }) => {
  let inputElement = "";
  switch (inputType) {
    case "input":
      inputElement = (
        <input
          className={`${styles.InputElement} ${styles.FloatingInputElement}`}
          onChange={props.changed}
          value={value}
          {...elementConfig}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea value={value} onChange={props.changed} {...elementConfig} />
      );
      break;
    default:
      inputElement = (
        <input
          className={`${styles.InputElement} ${styles.FloatingInputElement}`}
          onChange={props.changed}
          value={value}
          {...elementConfig}
        />
      );
  }
  return (
    <label className={styles.InputDiv} style={props.style}>
      {inputElement}
      <div>
        
      </div>
      <span className={styles.FloatingInputLabel}>{label}</span>
    </label>
  );
};


export const Input = (props)=>{
  let inputElement;
  switch(props.elementType){
    case "input":
      inputElement = <input  className={styles.InputElement} value={props.value} onChange={props.inputHandler} {...props.elementConfig}/>
      break;
    case "textarea":
      inputElement = <textarea  className={styles.InputElement} value={props.value} onChange={props.inputHandler} {...props.elementConfig}></textarea>
      break;
    case "select":
      inputElement = <select className={styles.InputElement} value={props.value} onChange={props.inputHandler}>
        {props.elementConfig.options.map(option=><option key={option} value={option}>{option}</option>)}
      </select>
      break;
    case "dropdown":
      inputElement = <Dropdown className={styles.InputElement} value={props.value} inputHandler={props.inputHandler} {...props.elementConfig} />;
      break;
    case "radio":
      inputElement = <div className={styles.RadioBox}>
        {props.elementConfig.options.map(option=><label key={option} className={styles.Option}><input type="radio" onChange={props.inputHandler} name={props.elementConfig.name} checked={option==props.value} value={option}/> {option}</label>)}
      </div>
      break;
  }
  
  if(props.elementType=="radio")
    return <div style={props.style}>
        <InputLabel label={props.label} errors={props.errors} validation={props.validation}/>
        {inputElement}
    </div>

  return (
    <label className={styles.InputRow} style={props.style} > 
      <InputLabel label={props.label} errors={props.errors} validation={props.validation}/>
      <div className={`${styles.InputDiv} ${props?.errors?.length ? styles.ErrorInput: null}`}>
          {props.prefix?<span className={styles.Prefix}>{props.prefix}</span>:null}
          {inputElement}
          {props.postfix?<span className={styles.Postfix}>{props.postfix}</span>:null}
      </div>
      
    </label>
  )

}

export const InputLabel=(props)=>(
  <span className={styles.InputLabel} style={props.style}>
  <span>{props.label}
    {props?.validation?.includes('required')?<span style={{color:"#FF6565"}}>*</span>:null}
  </span>
  {props.errors?.length> 0?<span className={styles.Errors}>{props.errors}</span>:null}
</span>
)

