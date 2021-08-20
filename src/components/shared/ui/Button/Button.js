import React from "react";
import styles from "./Button.module.css";

const button = (props) => {
  let classes = [styles.Button];
  if(props.className) classes.push(props.className);
  if (props.primary) classes.push(styles.Primary);
  if (props.loading) classes.push(styles.Loading);
  if (props.disabled) classes.push(styles.Disabled);
  if (props.looksDisabled) classes.push(styles.Disabled);
  
  
  let clicked = (e)=>{
    if(!props.disabled && props.clicked)
    props.clicked(e);
  }

  return (
    <button
      onClick={clicked}
      className={classes.join(" ")}
      style={{ width: props.width, ...props.style }}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
