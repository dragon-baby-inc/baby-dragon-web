import React from 'react'
import styles from './Warning.module.scss'

const Warning = ({ name }) => {
  return(
    <div className={styles.container}>
      {name}
    </div>
  )
}

export default Warning
