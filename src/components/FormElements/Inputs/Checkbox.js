import React from "react";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ changed, style, checked, value, disabled }) => {
  return (
    <div style={style ? style : {}} className={styles.label}>
      <input
        disabled={disabled}
        checked={checked}
        onChange={changed}
        value={value}
        type="checkbox"
      />
      <span className={styles.checkmark}></span>
    </div>
  );
};

export default Checkbox;
