import React from "react"
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '../index'
import classStyles from './TopRightIcon.module.scss'

const styles = {
  back: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: 'white',
    textDecoration: "none",
    maxHeight: '58px',
    height: '58px',
    display: 'flex',
    alignItems: 'center'
  }
}

function TopRightIcon({ children, clicked, link, color, faicon, style }){
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

export default TopRightIcon
