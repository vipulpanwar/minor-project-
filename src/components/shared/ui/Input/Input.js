import React from "react";
import styles from "./Input.module.css";

export default ({ inputType, value, label, elementConfig, ...props }) => {
  let inputElement = "";
  switch (inputType) {
    case "input":
      inputElement = (
        <input
          className={styles.InputElement}
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
    case "radio":
      let options = props.options.map((option) => (
        <div key={option.label}>
          <input
            onChange={props.changed}
            value={option.value}
            checked={option.value === value}
            name={props.name}
            id={option.label}
            type="radio"
          />
          <label htmlFor={option.label}>{option.label}</label>
        </div>
      ));
      inputElement = <div>{options}</div>;
      break;

    default:
      inputElement = (
        <input
          className={styles.InputElement}
          onChange={props.changed}
          value={value}
          {...elementConfig}
        />
      );
  }

  if (inputType === "radio")
    return (
      <div className={styles.InputDiv}>
        <label
          style={{ position: inputType === "radio" ? "static" : null }}
          className={styles.InputLabel}
        >
          {label}
        </label>
        {inputElement}
      </div>
    );
  return (
    <div className={styles.InputDiv}>
      <div>
        {inputElement}
      </div>
      <label className={styles.InputLabel}>{label}</label>
    </div>
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
  <span className={styles.InputLabel}>
  <span>{props.label}
    {props?.validation?.includes('required')?<span style={{color:"#FF6565"}}>*</span>:null}
  </span>
  {props.errors?.length> 0?<span className={styles.Errors}>{props.errors}</span>:null}
</span>
)

