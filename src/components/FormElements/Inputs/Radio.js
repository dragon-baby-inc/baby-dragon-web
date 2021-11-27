import React from 'react';
import styles from './Radio.module.scss'

const Radio = (props) => {
  const handleChanged = (e) => {
    console.log(e)
  }
  return (
    <label className={styles.label}>
      <div>
        <input
          onChange={handleChanged}
          type="radio"
        />
        <span className={styles.checkmark}></span>
      </div>
      hello
    </label>

  )
};

export default Radio;
