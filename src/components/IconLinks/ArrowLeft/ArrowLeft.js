import React, {useState} from "react"
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { themeColors } from '../../../constants/globalColors'
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid'

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

function ArrowLeft({ link, color }){
  return(
      <NavLink
        style={styles.back}
        to={link}>
        <FontAwesomeIcon icon={faArrowLeft} color={color}/>
      </NavLink>
    )
}

export default ArrowLeft
