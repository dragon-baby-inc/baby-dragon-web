import React from "react";
import styles from "./ToggleLabel.module.scss";
import { Toggle } from "../index";

const toggleLabel = ({ checked, changed, description, name }) => {
  return (
    <label className={styles.label}>
      {description}
      {checked === undefined ? (
        <div></div>
      ) : (
        <Toggle checked={checked} changed={changed} name={name} />
      )}
    </label>
  );
};

export default toggleLabel;
