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
      {inputElement}
      <label
        // style={{ position: inputType === "radio" ? "static" : null }}
        className={styles.InputLabel}
      >
        {label}
      </label>
    </div>
  );
};
