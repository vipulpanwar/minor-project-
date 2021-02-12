import React from "react";
import styles from "./Button.module.css";

const button = (props) => {
  let classes = [styles.Button];
  if (props.primary) classes.push(styles.Primary);

  return (
    <button
      onClick={props.clicked}
      className={classes.join(" ")}
      style={{ width: props.width }}
    >
      {props.children}
    </button>
  );
};

export default button;
