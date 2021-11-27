import React from 'react';
import styles from './CheckboxLabel.module.scss'
import { Image, Checkbox } from '../index'

const CheckboxLabel = ({
  children,
  changed,
  checked,
  value
}) => {

  return (
    <label className={styles.label}>
      {children}
      <Checkbox
        value={value}
        changed={changed}
        checked={checked}
      />
    </label>
  )
};

export default CheckboxLabel
