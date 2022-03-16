import React from "react";
import styles from "./TextInput.module.scss";

const TextInput = ({
  name,
  labelStyle,
  changed,
  value,
  placeholder,
  type,
  valid,
  invalidFeedback,
  disabled,
  hideLabel,
  invalidFeedbackStyle,
}) => {
  let labelClasses = [styles.label];
  if (valid === false) {
    labelClasses.push(styles.invalid);
  }
  if (disabled) {
    labelClasses.push(styles.disabled);
  }
  return (
    <div style={labelStyle} className={styles.container}>
      <label className={labelClasses.join(" ")}>
        {hideLabel ? null : <div className={styles.name}>{name}</div>}
        <input
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            changed(e.target.value);
          }}
          className={styles.input}
          type={type}
        />
      </label>
      {valid === false ? (
        <div style={invalidFeedbackStyle} className={styles.invalidFeedback}>
          {invalidFeedback}
        </div>
      ) : null}
    </div>
  );
};

export default TextInput;
