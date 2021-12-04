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
  style,
  deleted,
  deleteActive,
  invalidFeedbackStyle
}) => {

  let labelClasses = [styles.label]
  if (valid === false) { labelClasses.push(styles.invalid) }
  if (disabled) { labelClasses.push(styles.disabled) }

  let deleteIcon = null
  if (deleted) {
    if (deleteActive) {
      deleteIcon = <FontAwesomeIcon faicon="faTrash" onClick={deleted}/>
    } else {
      deleteIcon = null
    }
  }

  return(
    <div className={styles.container} style={style ? style : {}}>
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
        { deleteIcon }
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
