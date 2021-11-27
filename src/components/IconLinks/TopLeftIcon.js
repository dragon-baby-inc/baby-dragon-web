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
    padding: '18px 20px 22px',
    alignItems: 'center',
    display: 'flex',
  }
}

function TopLeftIcon({ children, clicked, link, color, faicon, style }){
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
            {
              faicon ?
                <FontAwesomeIcon faicon={faicon} color={color}/>
                :
                <div className={classStyles.container}>
                  {children}
                </div>
            }
          </div>
      }
    </>
  )
}

export default TopLeftIcon
