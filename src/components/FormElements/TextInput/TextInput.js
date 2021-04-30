import React from "react"
import styles from './TextInput.module.scss'

const TextInput = ({
  name,
  labelStyle,
  changed,
  value,
  placeholder,
  type,
  valid,
  invalidFeedback,
  disabled
}) => {
  let labelClasses = [styles.label]
  if (valid === false) { labelClasses.push(styles.invalid) }
  return(
    <div style={labelStyle}>
      <label className={labelClasses.join(' ')} >
        <div className={styles.name}>{name}</div>
        <input
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={e => { changed(e.target.value) }}
          className={styles.input}
          type={type} />
      </label>
      {
        (valid === false) ?  <div className={styles.invalidFeedback}>{invalidFeedback}</div> : null
      }
    </div>
  )
}

export default TextInput
