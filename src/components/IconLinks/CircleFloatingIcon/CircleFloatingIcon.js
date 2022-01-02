import React, { useState } from "react"
import { FontAwesomeIcon } from '../../../components'
import FloatingIcon from '../FloatingIcon/FloatingIcon'
import styles from './CircleFloatingIcon.module.scss'

function CircleFloatingIcon({
  clicked,
  scrollInfo,
  accountingBookDetails,
  containerInlineStyle,
  children,
  iconInlineStyle,
  faColor,
  disabled,
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

  const handleClicked = () => {
    if (disabled) { return }
    clicked()
  }

  return(
    <FloatingIcon
      containerInlineStyle={containerInlineStyle}
      containerStyle={styles.floatingIcon}
      avatarStyle={avatarClasses.join(' ')} >
      <div style={disabled ? _styles.disabled : iconInlineStyle} className={iconClasses.join(' ')} onClick={handleClicked} >
        {
          children ?
            children :
            <FontAwesomeIcon faicon={faicon} color={faColor}/>
        }
      </div>
    </FloatingIcon >
  )
}

const _styles = {
  disabled: {
    background: 'gray'
  }
}

export default CircleFloatingIcon;
