import React from 'react';
import styles from './CheckboxLabel.module.scss'
import { Checkbox } from '../index'

const CheckboxLabel = ({
  children,
  hideCheckbox,
  disabled,
  changed,
  checked,
  childrenRight,
  value
}) => {

  const checkbox = <Checkbox
    style={ childrenRight ? { paddingRight: '12px' } : {} }
    disabled={disabled}
    value={value}
    changed={changed}
    checked={checked}
  />

    return (
      <label className={[styles.label, childrenRight ? styles.right : ""].join(' ')}>
        {
          childrenRight ? checkbox : null
        }
        {children}
        {
          childrenRight ?
            null: checkbox
        }
      </label>
    )
};

export default CheckboxLabel
