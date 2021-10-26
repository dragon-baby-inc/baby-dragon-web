import React, {useState} from "react"
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { themeColors } from '../../constants/globalColors'
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid'
import { faBars } from '@fortawesome/fontawesome-free-solid'
import { faCog } from '@fortawesome/fontawesome-free-solid'
import { faEdit } from '@fortawesome/fontawesome-free-solid'
import { faTrash, faPlus, faTimes } from '@fortawesome/fontawesome-free-solid'

const icons = {
  faArrowLeft: faArrowLeft,
  faBars: faBars,
  faCog: faCog,
  faPlus: faPlus,
  faEdit: faEdit,
  faTimes: faTimes,
  faTrash: faTrash
}

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

function ArrowLeft({ clicked, link, color, faIcon, style }){
  let addtionalStyle = {}
  if (style) { addtionalStyle = style }
  return(
    <>
      {
        link ?
          <NavLink
            style={{ ...styles.back,  ...addtionalStyle}}
            to={link}>
            <FontAwesomeIcon icon={icons[faIcon]} color={color}/>
          </NavLink> :
          <div onClick={clicked} style={{ ...styles.back,  ...addtionalStyle}} >
            <FontAwesomeIcon icon={icons[faIcon]} color={color}/>
          </div>
      }
    </>
  )
}

export default ArrowLeft
