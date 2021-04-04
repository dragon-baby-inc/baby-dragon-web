import React from "react"
import styles from './Toggle.module.scss'

const Toggle = ({ changed, checked }) => {
  return(
    <label className={styles.switch}>
      <input type="checkbox" onChange={changed} checked={checked}/>
      <span className={styles.slider}></span>
      <h3 className={[styles.labelName, styles.auto].join(' ')}></h3>
      <h3 className={[styles.labelName, styles.self].join(' ')}></h3>
    </label>
  )
}

export default Toggle
