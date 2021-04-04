import React from "react"
import styles from './DotGroup.module.scss'

const DotGroup = ({ dotSize, index }) => {
  const dots = []
  for(let i = 0; i < dotSize; i ++) {
    let dot = index === i ?
      <li key={i} className={[styles.dot, styles.active].join(' ')}></li> :
      <li key={i} className={styles.dot}></li>
      dots.push(dot)
  }
  return(
    <ul className={styles.dotGroup}>
      {dots}
    </ul>
  )
}

export default DotGroup
