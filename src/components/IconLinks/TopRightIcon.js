import React from "react"
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '../index'

const styles = {
  back: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: 'white',
    textDecoration: "none",
    padding: '18px 20px 22px',
  }
}

function TopRightIcon({ clicked, link, color, faicon, style }){
  let addtionalStyle = {}
  if (style) { addtionalStyle = style }
  return(
    <>
      {
        link ?
          <NavLink
            style={{ ...styles.back,  ...addtionalStyle}}
            to={link}>
            <FontAwesomeIcon faicon={faicon} color={color}/>
          </NavLink> :
          <div onClick={clicked} style={{ ...styles.back,  ...addtionalStyle}} >
            <FontAwesomeIcon faicon={faicon} color={color}/>
          </div>
      }
    </>
  )
}

export default TopRightIcon
