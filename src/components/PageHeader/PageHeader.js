import React, { useState, useEffect} from "react"
import styles from './PageHeader.module.scss'

function PageHeader({
  children,
  scrollInfo,
  smallElement,
  bigElement
}){

  const [small, setSmall] = useState(false)

  if (scrollInfo) {
    if (scrollInfo.y.value > 50 && !small) {
      setSmall(true)
    } else if (scrollInfo.y.value <= 50 && small){
      setSmall(false)
    }
  }

  let classes = [styles.header]
  if (small) { classes.push(styles.small) }

  return(
    <div className={classes.join(' ')}>
    </div>
  )
}

export default PageHeader
