import React from 'react'
import styles from './Warning.module.scss'

const Warning = ({ name, children, style }) => {
  return(
    <div className={styles.container} style={style ? style : {}}>
      {name ? name : children}
    </div>
  )
}

export default Warning
