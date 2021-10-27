import React from "react"
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '../../index'

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
      <FontAwesomeIcon faicon="faArrowLeft" color={color}/>
    </NavLink>
  )
}

export default ArrowLeft
