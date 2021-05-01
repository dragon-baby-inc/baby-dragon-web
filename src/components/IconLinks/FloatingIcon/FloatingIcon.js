import React, {useState} from "react"
import { NavLink } from 'react-router-dom';
import styles from './FloatingIcon.module.scss'

function FloatingIcon({ containerStyle, children, link, avatarStyle }){
  return(
    <div className={containerStyle}>
      <div className={[avatarStyle, styles.avatar].join(' ')}>
        <NavLink to={link}>
          {children}
        </NavLink>
      </div>
    </div>
  )
}

export default FloatingIcon
