import React, { useState } from "react"
import { FontAwesomeIcon } from '../../../components'
import styles from './CircleIcon.module.scss'

function CircleIcon({
  clicked,
  style,
  faColor,
  disabled,
  color,
  faicon,
  size,
}){

  const handleClicked = () => {
    if (disabled) { return }
    clicked()
  }

  if (!size) { size = '48px' }
  if (!color) { color = 'gray' }
  if (disabled) { color = 'gray' }
  if (!style) { style = {} }

  const colors = {
    gray: '#aaaaaa',
    green: 'linear-gradient(92.29deg, #103C2B 0%, #07694D 100%)'
  }

  const _styles = {
    container: {
      background: colors[color]
    },
    icon: {
      height: size,
      width: size,
    }
  }

  return(
    <div style={{ ..._styles.container, ...style }} className={styles.container} onClick={handleClicked}>
      <div style={_styles.icon} className={styles.Icon}>
        <FontAwesomeIcon faicon={faicon} color={'white'}/>
      </div>
    </div>
  )
}


export default CircleIcon;
