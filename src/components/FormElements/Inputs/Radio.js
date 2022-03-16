import React from "react";
import styles from "./Radio.module.scss";

const Radio = ({ checked, changed, value }) => {
  const handleChanged = (e) => {
    changed(e);
  };

  return (
    <label className={styles.label}>
      <div>
        <input
          onClick={handleChanged}
          onChange={handleChanged}
          value={value}
          type="radio"
          checked={checked}
        />
        <span className={styles.checkmark}></span>
      </div>
    </label>
  );
};

export default Radio;
