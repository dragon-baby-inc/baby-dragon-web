import React, { useState, useEffect } from "react"
import styles from './Views.module.scss'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '../../index'

const Views = ({
  index,
  steps,
  setIndex
}) => {
  const handleClick = (e) => {
    setIndex(parseInt(e.target.id))
  }

  let i = -1
  let iconLinks = steps.map(step => {
    i++
    return (
      <div
        id={i}
        key={i}
        onClick={handleClick}
        className={[styles.icon, i === parseInt(index) ? styles.activeStyle : ''].join(' ')} >
        <span id={i}> {step.name} </span>
      </div>
    )
  })

  return(
    <div className={styles.bg}>
      <div className={styles.icons}>
        {iconLinks}
      </div>
      <div className={[styles.wiggle, parseInt(index) === 1 ? styles.active : ""].join(' ')}></div>
    </div>
  )
}

export default Views
