import React, { useState } from "react"
import FontAwesomeIcon from '../../../utilities/FontAwesomeIcon'
import FloatingIcon from '../FloatingIcon/FloatingIcon'
import styles from './CircleFloatingIcon.module.scss'

function CircleFloatingIcon({
  clicked,
  scrollInfo,
  accountingBookDetails,
  containerInlineStyle,
  iconInlineStyle,
  faColor,
  faicon
}){
  const [active, setActive] = useState(true)

  if (scrollInfo) {
    if (scrollInfo.y.className === 'scroll-bottom' && active) {
      setActive(false)
    } else if (scrollInfo.y.className !== 'scroll-bottom' && !active) {
      setActive(true)
    }
  }

  let iconClasses = [styles.Icon]
  let avatarClasses = [styles.avatar]

  if (active) {
    iconClasses.push(styles.active)
    avatarClasses.push(styles.active)
  }

  return(
    <FloatingIcon
      containerInlineStyle={containerInlineStyle}
      containerStyle={styles.floatingIcon}
      avatarStyle={avatarClasses.join(' ')} >
      <div style={iconInlineStyle} className={iconClasses.join(' ')} onClick={clicked} >
        <FontAwesomeIcon faicon={faicon} color={faColor}/>
      </div>
    </FloatingIcon >
  )
}

export default CircleFloatingIcon;
