import React from "react"
import styles from './TextInput.module.scss'

const TextInput = ({
  name,
  labelStyle,
  changed,
  value,
  placeholder,
  type
}) => {
  return(
    <label className={styles.label} style={labelStyle}>
      <div className={styles.name}>{name}</div>
      <input
        value={value}
        placeholder={placeholder}
        onChange={e => { changed(e.target.value) }}
        className={styles.input}
        type={type} />
    </label>
    )
}

export default TextInput
