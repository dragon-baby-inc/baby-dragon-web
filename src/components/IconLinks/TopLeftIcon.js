import React from "react"
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '../index'
import classStyles from './TopLeftIcon.module.scss'

const styles = {
  back: {
    position: 'absolute',
    left: 0,
    top: 0,
    color: 'white',
    textDecoration: "none",
    fontSize: '20px',
    height: '58px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

function TopLeftIcon({ children, clicked, link, color, faicon, style }){
  let addtionalStyle = {}
  if (style) { addtionalStyle = style }

  let icon = faicon ?  <FontAwesomeIcon faicon={faicon} color={color}/> : <div className={classStyles.container}> {children} </div>

  return(
    <>
      {
        link ?
          <NavLink
            style={{ ...styles.back,  ...addtionalStyle}}
            to={link}>
            {icon}
          </NavLink> :
            <div onClick={clicked} style={{ ...styles.back,  ...addtionalStyle}} >
              {icon}
            </div>
      }
    </>
  )
}

export default TopLeftIcon
