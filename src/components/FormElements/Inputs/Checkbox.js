import React from 'react';
import styles from './Checkbox.module.scss'

const Checkbox = ({
  changed,
  checked,
  value
}) => {
  return (
    <div className={styles.label}>
      <input
        checked={checked}
        onChange={changed}
        value={value}
        type="checkbox"
      />
      <span className={styles.checkmark}></span>
    </div>
  )
};

export default Checkbox
