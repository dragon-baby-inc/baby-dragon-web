import React from "react"
import styles from './Toggle.module.scss'

const Toggle = ({ changed, checked }) => {
  return(
    <label className={styles.switch}>
      <input type="checkbox" onChange={changed} checked={checked}/>
      <span className={styles.slider}></span>
      <p className={[styles.labelName, styles.auto].join(' ')}></p>
      <p className={[styles.labelName, styles.self].join(' ')}></p>
    </label>
  )
}

export default Toggle
