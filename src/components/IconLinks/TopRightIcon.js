import React, {useState} from "react"
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { themeColors } from '../../constants/globalColors'
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid'
import { faBars } from '@fortawesome/fontawesome-free-solid'

const icons = {
  faArrowLeft: faArrowLeft,
  faBars: faBars,
}

const styles = {
  back: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: 'white',
    textDecoration: "none",
    padding: '20px',
  }
}

function ArrowLeft({ link, color, faIcon }){
  return(
      <NavLink
        style={styles.back}
        to={link}>
        <FontAwesomeIcon icon={icons[faIcon]} color={color}/>
      </NavLink>
    )
}

export default ArrowLeft
