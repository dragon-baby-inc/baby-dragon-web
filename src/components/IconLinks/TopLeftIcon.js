import React, {useState} from "react"
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { themeColors } from '../../constants/globalColors'
import { faArrowLeft, faHome } from '@fortawesome/fontawesome-free-solid'

const icons = {
  faArrowLeft: faArrowLeft,
  faHome: faHome
}

const styles = {
  back: {
    position: 'absolute',
    left: 0,
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
