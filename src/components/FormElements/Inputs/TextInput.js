import React, { useEffect, useState } from "react"
import styles from './TextInput.module.scss'
import { FontAwesomeIcon } from '../../../components'

const TextInput = ({
  name,
  changed,
  value,
  placeholder,
  type,
  valid,
  faicon,
  invalidFeedback,
  disabled,
  invalidFeedbackStyle
}) => {

  let labelClasses = [styles.label]
  if (valid === false) { labelClasses.push(styles.invalid) }
  if (disabled) { labelClasses.push(styles.disabled) }

  return(
    <div className={styles.container}>
      <label className={labelClasses.join(' ')} >
        <div className={styles.labelName}>
          <FontAwesomeIcon faicon={faicon}/>
          <div className={styles.name}>{name}</div>
        </div>
        <input
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={e => { changed(e.target.value) }}
          className={styles.input}
          type={type} />
      </label>
      {
        (valid === false) ?
          <div style={invalidFeedbackStyle} className={styles.invalidFeedback}>{invalidFeedback}</div> :
          null
      }
    </div>
  )
}

export default TextInput
