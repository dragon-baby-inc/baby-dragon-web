import React from 'react';
import styles from './CheckboxLabel.module.scss'
import { Checkbox } from '../index'

const CheckboxLabel = ({
  children,
  hideCheckbox,
  disabled,
  changed,
  checked,
  value
}) => {
  return (
    <label className={styles.label}>
      {children}
      {
      hideCheckbox ?
          null:
          <Checkbox
            disabled={disabled}
            value={value}
            changed={changed}
            checked={checked}
          />
      }
    </label>
  )
};

export default CheckboxLabel
