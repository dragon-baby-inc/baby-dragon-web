import React from "react";
import styles from "./RadioLabel.module.scss";
import { Radio } from "../index";

const CheckboxLabel = ({ children, changed, checked, value }) => {
  return (
    <label className={styles.label}>
      {children}
      <Radio value={value} changed={changed} checked={checked} />
    </label>
  );
};

export default CheckboxLabel;
