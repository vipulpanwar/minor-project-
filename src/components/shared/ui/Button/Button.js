import React from "react";
import styles from "./Button.module.css";

const button = (props) => {
  let classes = [styles.Button];
  if (props.primary) classes.push(styles.Primary);
  if (props.loading) classes.push(styles.Loading);
  if (props.disabled) classes.push(styles.Disabled);
  
  return (
    <button
      onClick={props.clicked}
      className={classes.join(" ")}
      style={{ width: props.width, ...props.style }}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
