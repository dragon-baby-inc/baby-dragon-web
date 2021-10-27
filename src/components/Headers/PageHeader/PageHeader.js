import React from "react"
import styles from './PageHeader.module.scss'
import { FontAwesomeIcon } from '../../index'

function PageHeader({
  children,
  faIcon,
  color,
  title
}){

  let classes = [styles.header]
  return(
    <div className={classes.join(' ')}>
      <div className={styles.innerBlock}>
        {
          faIcon ?
            <FontAwesomeIcon className={styles.icon} icon={faIcon} color={color}/> : null
        }
        <div>
          <div className={styles.name}>
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
