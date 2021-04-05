import React, { useState, useEffect } from "react"
import styles from './DatePickerMenu.module.scss'
import './DatePickerStyle.css';

const DatePickerMenu = ({ objects, labelType, selected_object_id, changed }) => {
  const [mount, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [])

  const containerStyles = [styles.container]
  if (mount) { containerStyles.push(styles.mount) }

  return(
    <div className={containerStyles.join(' ')}>
    </div>
    )
}

export default DatePickerMenu
