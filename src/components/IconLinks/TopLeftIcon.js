import React from "react"
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '../index'

const styles = {
  back: {
    position: 'absolute',
    left: 0,
    top: 0,
    color: 'white',
    textDecoration: "none",
    fontSize: '20px',
    padding: '18px 20px 22px',
  }
}

function TopLeftIcon({ link, color, faicon, style }){
  let addtionalStyle = {}
  if (style) { addtionalStyle = style }
  return(
    <NavLink
      style={{ ...styles.back,  ...addtionalStyle}}
      to={link}>
      <FontAwesomeIcon faicon={faicon} color={color}/>
    </NavLink>
  )
}

export default TopLeftIcon
